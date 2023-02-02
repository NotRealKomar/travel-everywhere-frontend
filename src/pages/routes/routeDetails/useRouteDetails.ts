import axios from "axios";
import { useState } from "react";
import { getApiUrl } from "../../../helpers/getApiUrl";
import { RouteDetailsResponseData } from "../../../models/RouteDetailsResponseData";
import { Waypoint } from "../newRoute/hooks/types";

export const useRouteDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [waypoints, setWaypoints] = useState(new Map<string, Waypoint>());
  const [routeDetailsData, setRouteDetailsData] = useState<RouteDetailsResponseData>();

  const onSuccess = (data: RouteDetailsResponseData) => {
    setRouteDetailsData(data);

    const points = new Map<string, Waypoint>();
    data.destinations.forEach((destination) => {
      points.set(window.crypto.randomUUID(), {
        lat: destination.lat,
        lon: destination.lon,
      })
    });

    setWaypoints(points);

    setError('');
    setIsLoading(false);
  }

  const loadRouteDetailsData = async () => {
    setError('');
    setIsLoading(true);

    const queryParameters = new URLSearchParams(window.location.search);

    try {
      const response = 
        await axios.post<RouteDetailsResponseData>(`${getApiUrl('app')}/travel/details`, {
          userId: localStorage.getItem('userId') ?? '',
          travelId: queryParameters.get('id') ?? '',
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

  return {
    error,
    waypoints,
    isLoading,
    routeDetailsData,
    loadRouteDetailsData,
  }
}
