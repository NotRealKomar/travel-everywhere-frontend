import axios from 'axios';
import { useState } from 'react';
import { getApiUrl } from '../../helpers/getApiUrl';

export const useChangePassword = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const resetState = () => {
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setIsLoading(false);
  };

  const onSuccess = () => {
    resetState();

    window.location.reload();
  };

  const handleChangePassword = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${getApiUrl('auth')}/change-password`,
        {
          userId: localStorage.getItem('userId') ?? '',
          password,
          newPassword,
          confirmPassword,
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
    password,
    isLoading,
    newPassword,
    confirmPassword,
    setPassword,
    setNewPassword,
    setConfirmPassword,
    handleChangePassword,
  };
};
