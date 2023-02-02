import styled from '@emotion/styled';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useChangePassword } from './useChangePassword';

type ChangePasswordProps = {
  hidden?: boolean;
};

const ChangePasswordWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;

  width: 60%;

  margin-top: 8px;
  padding: 8px;

  & div:not(:last-child) {
    padding-bottom: 8px;
  }
`;

export const ChangePassword: React.FC<ChangePasswordProps> = ({ hidden }) => {
  const {
    password,
    newPassword,
    confirmPassword,
    setPassword,
    setNewPassword,
    setConfirmPassword,
    handleChangePassword,
  } = useChangePassword();

  useEffect(() => {
    if (hidden === true) {
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [hidden]);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  return !hidden ? (
    <ChangePasswordWrapper>
      <Typography variant="h5" marginBottom="8px">
        Изменить пароль
      </Typography>
      <TextField
        id="password"
        label="Старый пароль"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <TextField
        id="new-password"
        label="Новый пароль"
        type="password"
        value={newPassword}
        onChange={handleNewPasswordChange}
      />
      <TextField
        id="confirm-password"
        label="Повторите пароль"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <Box>
        <Button variant="contained" onClick={handleChangePassword}>
          Сменить пароль
        </Button>
      </Box>
    </ChangePasswordWrapper>
  ) : (
    <></>
  );
};
