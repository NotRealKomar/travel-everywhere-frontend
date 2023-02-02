import { SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { LngLat } from 'maplibre-gl';
import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomMarkerType } from '../../../../components/MarkerMap';
import { getApiUrl } from '../../../../helpers/getApiUrl';
import { PlaceEditResponseData } from '../../../../models/PlaceEditResponseData';
import { Waypoint } from '../../../routes/newRoute/hooks/types';

export const useEditPlace = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [placeId, setPlaceId] = useState<string>('');
  const [selectedType, setSelectedType] = useState(CustomMarkerType.CAFE);
  const [coordinates, setCoordinates] = useState<LngLat | null>(null);
  const [title, setTitle] = useState<string>('');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const navigate = useNavigate();

  const resetState = (): void => {
    setSelectedType(CustomMarkerType.CAFE);
    setCoordinates(null);
    setPlaceId('');
    setTitle('');
    setDescription('');
    setActiveStep(0);
    setIsPublic(false);
    setError('');
    setIsLoading(false);
  };

  const onSuccess = (data: PlaceEditResponseData): void => {
    resetState();

    setPlaceId(data.id);
    setSelectedType(data.type as CustomMarkerType);
    setCoordinates(new LngLat(data.coordinates.lng, data.coordinates.lat));
    setTitle(data.title);
    setDescription(data.description);
    setIsPublic(data.isPublic);
  };

  const loadPlaceData = async () => {
    setError('');
    setIsLoading(true);

    const queryParameters = new URLSearchParams(window.location.search);

    try {
      const response = await axios.post<PlaceEditResponseData>(
        `${getApiUrl('app')}/place/edit-details`,
        {
          userId: localStorage.getItem('userId') ?? '',
          placeId: queryParameters.get('id') ?? '',
        },
        {
          headers: {
            authorization: localStorage.getItem('accessToken') ?? '',
            'Content-type': 'application/json',
          },
        },
      );

      if (response.data) {
        onSuccess(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error as string);
    }
  };

  const handleOnTypeChange = (
    event: SelectChangeEvent<CustomMarkerType>,
  ): void => {
    const newValue = event.target.value as CustomMarkerType;

    setSelectedType(newValue);
  };

  const handleOnTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleOnPublicFlagChange = () => {
    setIsPublic(!isPublic);
  };

  const handleOnDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handleSavePlace: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post<boolean>(
        `${getApiUrl('app')}/place/edit`,
        {
          title,
          description,
          type: selectedType,
          placeData: {
            lng: coordinates?.lng,
            lat: coordinates?.lat,
          },
          userId: localStorage.getItem('userId') ?? '',
          placeId,
        },
        {
          headers: {
            authorization: localStorage.getItem('accessToken') ?? '',
            'Content-type': 'application/json',
          },
        },
      );

      if (response.data === true) {
        onSaveRouteSuccess();
      } else {
        setError('Something wrong on saving place data');
      }
    } catch (error) {
      setIsLoading(false);

      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const onSaveRouteSuccess = (): void => {
    resetState();

    navigate('/app/places');
  };

  const setPoint = (waypoint: Waypoint | null): void => {
    if (waypoint !== null) {
      const newValue = new LngLat(waypoint.lon, waypoint.lat);

      setCoordinates(newValue);
    } else {
      setCoordinates(null);
    }
  };

  return {
    error,
    title,
    isLoading,
    isPublic,
    activeStep,
    coordinates,
    description,
    selectedType,
    setPoint,
    loadPlaceData,
    setActiveStep,
    setCoordinates,
    handleSavePlace,
    handleOnTypeChange,
    handleOnTitleChange,
    handleOnPublicFlagChange,
    handleOnDescriptionChange,
  };
};
