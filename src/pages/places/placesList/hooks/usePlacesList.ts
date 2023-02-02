import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { getApiUrl } from '../../../../helpers/getApiUrl';
import { useDebounce } from '../../../../helpers/useDebounce';
import { PlaceResponseData } from '../../../../models/PlaceResponseData';

type LoadPlacesDataProps = {
  searchQuery?: string;
};

type UsePlacesListProps = {
  loadPopular?: boolean;
};

export const usePlacesList = ({ loadPopular }: UsePlacesListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const [placesData, setPlacesData] = useState<PlaceResponseData[]>([]);

  useEffect(() => {
    if (debouncedSearchQuery !== '') {
      loadPlacesData({ searchQuery: debouncedSearchQuery });
    } else {
      loadPlacesData({});
    }
  }, [debouncedSearchQuery]);

  const onSuccess = (data: PlaceResponseData[]) => {
    setPlacesData(data);

    setError('');
    setIsLoading(false);
  };

  const loadPlacesData = async ({ searchQuery }: LoadPlacesDataProps) => {
    setError('');
    setIsLoading(true);

    try {
      const url =
        loadPopular === true
          ? `${getApiUrl('app')}/place/list-popular`
          : `${getApiUrl('app')}/place/list`;

      const response = await axios.post<PlaceResponseData[]>(
        url,
        {
          userId: localStorage.getItem('userId') ?? '',
          searchQuery,
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

  const onSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setSearchQuery(newValue);
  };

  return {
    error,
    isLoading,
    placesData,
    searchQuery,
    debouncedSearchQuery,
    loadPlacesData,
    onSearchValueChange,
  };
};
