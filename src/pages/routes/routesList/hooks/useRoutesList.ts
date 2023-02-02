import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { getApiUrl } from "../../../../helpers/getApiUrl";
import { useDebounce } from "../../../../helpers/useDebounce";
import { RoutesResponseData } from "../../../../models/RoutesResponseData";

type LoadRoutesDataProps = {
  searchQuery?: string;
}

type UseRoutesListProps = {
  loadActive?: boolean;
  loadPopular?: boolean;
}

export const useRoutesList = ({loadActive, loadPopular}: UseRoutesListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const [routesData, setRoutesData] = useState<RoutesResponseData[]>([]);

  const resetState = () => {
    setError('');
    setIsLoading(false);
    setRoutesData([]);
  }

  useEffect(() => {
    if (debouncedSearchQuery !== '') {  
      loadRoutesData({searchQuery: debouncedSearchQuery});
    } else {
      loadRoutesData({});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  const onSuccess = (data: RoutesResponseData[]) => {
    resetState();

    setRoutesData(data);
  }

  const loadRoutesData = async ({
    searchQuery,
  }: LoadRoutesDataProps) => {
    setError('');
    setIsLoading(true);

    try {
      let url = `${getApiUrl('app')}/travel/list`;

      if (loadActive) {
        url = `${getApiUrl('app')}/travel/list-active`;
      }

      if (loadPopular) {
        url = `${getApiUrl('app')}/travel/list-popular`;
      }

      const response = 
        await axios.post<RoutesResponseData[]>(url, {
          userId: localStorage.getItem('userId') ?? '',
          searchQuery,
        }, {
          headers: {
            authorization: localStorage.getItem('accessToken') ?? '',
            'Content-type': 'application/json'
          },
        }
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
  }

  return {
    error,
    isLoading,
    routesData,
    searchQuery,
    debouncedSearchQuery,
    loadRoutesData,
    onSearchValueChange,
  }
}
