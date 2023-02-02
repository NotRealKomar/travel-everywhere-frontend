import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl } from "../../helpers/getApiUrl";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const resetState = (): void => {
    setUsername('');
    setPassword('');
    setError('');
    setIsLoading(false);
  }

  const onSuccess = (accessToken: string, userId: string): void => {
    resetState();

    localStorage.setItem('accessToken', accessToken || '');
    localStorage.setItem('userId', userId || '');

    navigate('/app/dashboard');
  };

  const handleLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const response = 
        await axios.post(`${getApiUrl('auth')}/sign-in`, {
          username,
          password
        }
      );

      const { accessToken, userId } = response.data;

      if (accessToken && userId) {
        onSuccess(accessToken, userId);
      }
    } catch (error) {
      setIsLoading(false);
      setError('Неверный логин или пароль');
    }
  }

  const onUsernameChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value: usernameValue } }): void =>
    setUsername(usernameValue);

  const onPasswordChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value: passwordValue } }): void =>
    setPassword(passwordValue);

  return {
    isLoading,
    username,
    password,
    error,
    setIsLoading,
    onUsernameChange,
    onPasswordChange,
    handleLogin,
  }
}