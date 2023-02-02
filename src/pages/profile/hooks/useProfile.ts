import axios from "axios";
import { useState } from "react";
import { getApiUrl } from "../../../helpers/getApiUrl";
import { UserResponseData } from "../../../models/UserResponseData";

export const useProfile = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const resetState = (): void => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setError('');
    setIsLoading(false);
  }

  const onSuccess = (data: UserResponseData) => {
    resetState();

    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
  }

  const loadUserData = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = 
        await axios.post<UserResponseData>(`${getApiUrl('app')}/users/info`, {
          userId: localStorage.getItem('userId') ?? '',
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
  }

  return {
    error,
    email,
    firstName,
    lastName,
    isLoading,
    loadUserData
  }
}
