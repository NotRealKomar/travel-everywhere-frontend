import { Button, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useProfile } from "./hooks/useProfile";
import { useEffect, useState } from "react";
import { ChangePassword } from "../../components/ChangePassword";
import { UpdateProfile } from "../../components/UpdateProfile";

const ProfileWrapper = styled(Paper)`
  padding: 8px;
`;

export const Profile: React.FC = () => {
  const {
    email,
    firstName,
    lastName,
    loadUserData
  } = useProfile();

  useEffect(() => {
    loadUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [isUpdateProfileVisible, setIsUpdateProfileVisible] = useState(false);

  const handleChangePasswordClick = () => {
    setIsChangePasswordVisible(!isChangePasswordVisible);

    if (isUpdateProfileVisible === true) {
      setIsUpdateProfileVisible(!isUpdateProfileVisible);
    }
  }

  const handleUpdateProfileClick = () => {
    setIsUpdateProfileVisible(!isUpdateProfileVisible);

    if (isChangePasswordVisible === true) {
      setIsChangePasswordVisible(!isChangePasswordVisible);
    }
  }

  return (
    <ProfileWrapper variant="outlined">
      <Typography variant="h3">{firstName} {lastName}</Typography>
      <Typography style={{fontSize: '14px', color: 'gray'}}>Почта:</Typography>
      <Typography>{email}</Typography>
      <Typography style={{fontSize: '14px', color: 'gray'}}>Пароль:</Typography>
      <Typography>***</Typography>
      <Button variant="outlined" onClick={handleUpdateProfileClick}>Редактировать профиль</Button>
      <Button style={{marginLeft: '8px'}} variant="outlined" onClick={handleChangePasswordClick}>Изменить пароль</Button>
      <ChangePassword hidden={!isChangePasswordVisible} />
      <UpdateProfile hidden={!isUpdateProfileVisible} email={email} firstName={firstName} lastName={lastName} />
    </ProfileWrapper>
  )
}