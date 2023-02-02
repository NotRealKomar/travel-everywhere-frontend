import axios from "axios";
import { useState } from "react";
import { getApiUrl } from "../../../helpers/getApiUrl";
import { CalendarResponseData } from "../../../models/CalendarResponseData";

export const useCalendar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [calendarData, setCalendarData] = useState<CalendarResponseData[]>([]);

  const onSuccess = (data: CalendarResponseData[]) => {
    setCalendarData(data);

    setError('');
    setIsLoading(false);
  }

  const loadCalendarData = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = 
        await axios.post<CalendarResponseData[]>(`${getApiUrl('app')}/calendar/data`, {
          userId: localStorage.getItem('userId') ?? ''
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
    isLoading,
    calendarData,
    loadCalendarData,
  }
}
