import axios from 'axios';
import { useState } from 'react';
import { getApiUrl } from '../../helpers/getApiUrl';

type UseProfileHookProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export const useUpdateProfile = (props: UseProfileHookProps) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState<string>(props.firstName);
  const [lastName, setLastName] = useState<string>(props.lastName);
  const [email, setEmail] = useState<string>(props.email);

  const resetState = (): void => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setError('');
    setIsLoading(false);
  };

  const onSuccess = () => {
    resetState();

    window.location.reload();
  };

  const handleUpdateProfile = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${getApiUrl('app')}/users/update-profile`,
        {
          userId: localStorage.getItem('userId') ?? '',
          firstName,
          lastName,
          email,
        },
        {
          headers: {
            authorization: localStorage.getItem('accessToken') ?? '',
            'Content-type': 'application/json',
          },
        },
      );

      if (response.data) {
        onSuccess();
      }
    } catch (error) {
      setIsLoading(false);
      setError(error as string);
    }
  };

  return {
    error,
    email,
    firstName,
    lastName,
    isLoading,
    setEmail,
    setFirstName,
    setLastName,
    handleUpdateProfile,
  };
};
