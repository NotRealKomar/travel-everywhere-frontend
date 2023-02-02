import styled from '@emotion/styled';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { PlacesList } from '../places/placesList';
import { RoutesList } from '../routes/routesList';
import React from 'react';

const ContentWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

const BlockWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  margin: 8px;
  flex-basis: 48%;
`;

export const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" padding="8px">
        Главная страница
      </Typography>
      <Typography variant="h5" padding="8px">
        Популярное
      </Typography>
      <ContentWrapper>
        <BlockWrapper variant="outlined">
          <Typography variant="h5" padding="8px">
            Маршруты
          </Typography>
          <RoutesList loadPopular />
        </BlockWrapper>
        <BlockWrapper variant="outlined">
          <Typography variant="h5" padding="8px">
            Места
          </Typography>
          <PlacesList small loadPopular />
        </BlockWrapper>
      </ContentWrapper>
      <Divider />
      <ContentWrapper>
        <BlockWrapper variant="outlined">
          <Typography variant="h5" padding="8px">
            Активные маршруты
          </Typography>
          <RoutesList small loadActive />
        </BlockWrapper>
      </ContentWrapper>
    </Box>
  );
};
