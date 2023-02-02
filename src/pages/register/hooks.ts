import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl } from '../../helpers/getApiUrl';

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('');

  const resetState = (): void => {
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setIsLoading(false);
  };

  const onSuccess = (accessToken: string, userId: string): void => {
    resetState();

    localStorage.setItem('accessToken', accessToken || '');
    localStorage.setItem('userId', userId || '');

    navigate('/app/dashboard');
  };

  const handleRegistration: FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${getApiUrl('auth')}/register`, {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      });

      const { accessToken, userId } = response.data;

      if (accessToken && userId) {
        onSuccess(accessToken, userId);
      }
    } catch (error) {
      setIsLoading(false);

      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const onFirstnameChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }): void => setFirstname(value);

  const onLastnameChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }): void => setLastname(value);

  const onEmailChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }): void => setEmail(value);

  const onPasswordChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }): void => setPassword(value);

  const onConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }): void => {
    const nextValue = value;

    if (nextValue !== '' && nextValue !== password) {
      setError('Пароли должны совпадать');
    } else {
      setError('');
    }

    setConfirmPassword(nextValue);
  };

  return {
    isLoading,
    error,
    handleRegistration,
    onFirstnameChange,
    onLastnameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
  };
};
