import styled from "@emotion/styled";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useUpdateProfile } from "./useUpdateProfile";

type UpdateProfileProps = {
  firstName: string;
  lastName: string;
  email: string;
  hidden?: boolean;
};

const UpdateProfileWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;

  width: 60%;

  margin-top: 8px;
  padding: 8px;

  & div:not(:last-child) {
    padding-bottom: 8px;
  }
`;

export const UpdateProfile: React.FC<UpdateProfileProps> = (props) => {
  const {
    email,
    lastName,
    firstName,
    setEmail,
    setLastName,
    setFirstName,
    handleUpdateProfile,
  } = useUpdateProfile(props);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  }

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  }

  return !props.hidden 
  ? (
    <UpdateProfileWrapper>
      <Typography variant="h5" marginBottom="8px">Редактировать профиль</Typography>
      <TextField
        id="first-name"
        label="Имя"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <TextField
        id="last-name"
        label="Фамилия"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <TextField
        id="email"
        label="Почта"
        value={email}
        onChange={handleEmailChange}
      />
      <Box>
        <Button variant="contained" onClick={handleUpdateProfile}>Обновить профиль</Button>
      </Box>
    </UpdateProfileWrapper>
  )
  : (<></>);
}