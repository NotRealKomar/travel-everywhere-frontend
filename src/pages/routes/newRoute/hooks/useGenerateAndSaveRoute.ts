import axios from "axios";
import { FormEventHandler, useState } from "react"
import { getApiUrl } from "../../../../helpers/getApiUrl";
import { AutocompleteResponseData } from "../../../../models/AutocompleteResponseData";
import { Waypoint, WaypointWithData } from "./types";
import { useNavigate } from 'react-router-dom';
import { addDays } from "date-fns";

export const useGenerateAndSaveRoute = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [points, setPoints] = useState(new Map<string, WaypointWithData>());
  const [routeData, setRouteData] = useState<unknown | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1));
  const [activeStep, setActiveStep] = useState<number>(0);
  
  const navigate = useNavigate();


  const resetState = (): void => {
    setPoints(new Map<string, WaypointWithData>());
    setRouteData(null);
    setStartDate(new Date());
    setEndDate(new Date());
    setActiveStep(0);
    setIsPublic(false);
    setError('');
    setIsLoading(false);
  }

  const handleGenerateRoute = async (waypoints: Waypoint[]) => {
    setError('');
    setIsLoading(true);

    try {
      const response = 
        await axios.post<AutocompleteResponseData[]>(`${getApiUrl('app')}/places/routing`, {
          waypoints
        }, {
          headers: {
            authorization: localStorage.getItem('accessToken') ?? '',
            'Content-type': 'application/json'
          },
        }
      );
  
      if (response) {
        setRouteData(response.data);

        setError('');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  const handleSaveRoute: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const response = 
        await axios.post<boolean>(`${getApiUrl('app')}/travel/save`, {
          title,
          startDate,
          endDate,
          waypoints: [...points.values()],
          userId: localStorage.getItem('userId') ?? '',
          isPublic,
        }, {
          headers: {
            authorization: localStorage.getItem('accessToken') ?? '',
            'Content-type': 'application/json'
          },
        }
      );

      if (response.data === true) {
        onSaveRouteSuccess();
      } else {
        setError('Something wrong on saving route data');
      }
    } catch (error) {
      setIsLoading(false);
      
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  const onSaveRouteSuccess = (): void => {
    resetState();

    navigate('/app/travels');
  }

  const handleOnPublicFlagChange = () => {
    setIsPublic(!isPublic);
  };

  const handleOnGenerateRouteStepClick = (): void => {
    const filteredPoints: Waypoint[] = [];

    points.forEach((point) => {
      if (point !== null) {
        filteredPoints.push({
          lat: point.lat,
          lon: point.lon,
        });
      }
    })

    if (filteredPoints.length < 2) {
      return;
    }

    handleGenerateRoute(filteredPoints);
  }

  const appendPoint = (waypoint: WaypointWithData | null): void => {
    if (waypoint !== null) {
      points.set(window.crypto.randomUUID(), waypoint);

      setPoints(new Map([...points.entries()]));
    }
  }

  const clearPoint = (id: string) => {
    const pointId = id;

    return () => {
      points.delete(pointId);

      setPoints(new Map([...points.entries()]));
    }
  }

  const handleOnTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return {
    error,
    title,
    points,
    endDate,
    isPublic,
    startDate,
    isLoading,
    routeData,
    activeStep,
    clearPoint,
    setEndDate,
    appendPoint,
    setStartDate,
    setActiveStep,
    handleSaveRoute,
    handleOnTitleChange,
    handleOnPublicFlagChange,
    handleOnGenerateRouteStepClick,
  }
}
