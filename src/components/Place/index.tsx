import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";
import { CustomMarkerType, ICONS_MAP } from "../MarkerMap";
import { PlaceResponseData } from "../../models/PlaceResponseData";
import { format } from "date-fns";
import { WaypointWithData } from "../../pages/routes/newRoute/hooks/types";
import { useNavigate } from "react-router-dom";
import { LikeCounter } from "../LikeCounter";

type PlaceProps = PlaceResponseData & {
  small?: boolean;
  clickable?: boolean;
  disableLikes?: boolean;
  onClick?: (value: WaypointWithData | null) => void;
};

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 100%;
  padding: 8px;
`;

const TextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const AdditionalInfoWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  color: lightgray;
`;

const ButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;

  & button:not(:last-child) {
    margin-right: 8px;
  }
`;

const InfoDivider = styled(Divider)`
  margin-top: 20px;
  margin-bottom: 4px;
`;

const PLACE_COLOR_TYPE = {
  [CustomMarkerType.BAR]: '#D3CEFC',
  [CustomMarkerType.CAFE]: '#FFE4E1',
  [CustomMarkerType.HOTEL]: '#E6F91D',
  [CustomMarkerType.PERFECT_VIEW]: '#03C03C',
  [CustomMarkerType.RESTAURANT]: '#DF9FB7',
}

export const Place: React.FC<PlaceProps> = (props) => {
  const BoxWrapper = styled(Paper)`
    display: flex;
    flex-grow: 1;
    margin-right: 8px;
    flex-basis: 50%;
    margin-bottom: 4px;

    ${props.clickable && 'cursor: pointer;'}
  `;


  const navigate = useNavigate();

  const handleOnClick = () => {
    if (props.onClick !== undefined) {
      props.onClick({
        lat: props.coordinates.lat,
        lon: props.coordinates.lng,
        label: props.title,
        placeId: props.id,
      })
    } 
  }

  const handleOnEditClick = () => {
    if (props && props.id) {
      navigate(`/app/edit-place?id=${props.id}`);
    }
  }
  
  return (
    <BoxWrapper variant="outlined" onClick={handleOnClick}>
      <div style={{width: "32px", height: "100%", backgroundColor: PLACE_COLOR_TYPE[props.type]}} />
      <ContentWrapper>
        <TextWrapper>
          <TitleWrapper>
            <Typography><b>{props.title}</b></Typography>
            {ICONS_MAP[props.type]}
          </TitleWrapper>
          <Typography variant="caption">{props.details.formatted}</Typography>
          {!props.small && <Typography>{props.description}</Typography>}
        </TextWrapper>
        {!props.small && (
          <>
            <InfoDivider />
            <ButtonsWrapper>
              <Button variant="contained" onClick={handleOnEditClick}>Редактировать</Button>
              <Button variant="contained">Удалить</Button>
            </ButtonsWrapper>
          </>
        )}
        {props.isPublic && (
          <LikeCounter placeId={props.id} disabled={props.disableLikes} />
        )}
        <AdditionalInfoWrapper>
          <Typography variant="subtitle2">{props.coordinates.lng} {props.coordinates.lat}</Typography>
          <Typography variant="subtitle2">{format(new Date(props.createdAt), 'dd/MM/yyyy')}</Typography>
        </AdditionalInfoWrapper>
      </ContentWrapper>
    </BoxWrapper>
  )
}
