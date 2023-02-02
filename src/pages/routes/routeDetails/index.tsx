import styled from "@emotion/styled";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouteDetails } from "./useRouteDetails";
import RoomIcon from '@mui/icons-material/Room';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import { ICONS_MAP } from "../../../components/MarkerMap";
import { useNavigate } from "react-router-dom";
import { RouteMap } from "../../../components/RouteMap";

const ContentWrapper = styled(Box)`
  display: flex;
  padding: 0;
  flex-direction: column;
`;

const DestinationWrapper = styled(Box)`
  padding: 8px 0;
`;

const DestinationContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

const DestinationFirstLine = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const RouteDataWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonsWrapper = styled(Box)`
  & button:not(:last-child) {
    margin-right: 8px;
  }
`;

export const RouteDetails: React.FC = () => {
  const navigate = useNavigate();

  const {
    waypoints,
    routeDetailsData,
    loadRouteDetailsData,
  } = useRouteDetails();

  useEffect(() => {
    loadRouteDetailsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnEditClick = () => {
    if (routeDetailsData && routeDetailsData.id) {
      navigate(`/app/edit-route?id=${routeDetailsData.id}`);
    }
  }

  const [userId] = useState(localStorage.getItem('userId') ?? '');

  return routeDetailsData ? (
    <ContentWrapper>
      <RouteDataWrapper>
        <Typography variant="h4">{routeDetailsData.title}</Typography>
        {userId === routeDetailsData.userId && (
          <ButtonsWrapper>
            <Button variant="contained" onClick={handleOnEditClick}>Редактировать</Button>
            <Button variant="contained">Удалить</Button>
          </ButtonsWrapper>
        )}
      </RouteDataWrapper>
      <Typography variant="subtitle2">{routeDetailsData.startDate} - {routeDetailsData.endDate}</Typography>
      {routeDetailsData.destinations.map((destination) => (
        <DestinationWrapper>
          <Divider />
          <DestinationContentWrapper>
            {destination.title !== null && destination.city !== null
            ? (
              <>
                <DestinationFirstLine>
                  <Box display="inline-flex">
                    <RoomIcon fontSize="large" />
                    <Typography paddingLeft={"8px"} variant="h5">{destination.title}</Typography>
                  </Box>
                  {destination.type && ICONS_MAP[destination.type]}
                </DestinationFirstLine>
                <Typography marginLeft="45px" variant="body1">{destination.title}</Typography>
                <Typography marginLeft="45px" variant="subtitle2">{destination.formattedAddress}</Typography>
              </>
            )
            : (
              <DestinationFirstLine>
                  <Box display="inline-flex">
                    <RoomIcon fontSize="large" />
                    <Typography paddingLeft={"8px"} variant="h5">{destination.formattedAddress}</Typography>
                  </Box>
                <GpsNotFixedIcon />
              </DestinationFirstLine>
            )}
          </DestinationContentWrapper>
        </DestinationWrapper>
      ))}
      <RouteMap isRouteDetails routeData={routeDetailsData.routeData} waypoints={waypoints} />
    </ContentWrapper>
  ) : (
    <div>No data</div>
  )
}
