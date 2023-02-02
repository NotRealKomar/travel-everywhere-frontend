import { Box, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExploreIcon from '@mui/icons-material/Explore';
import { useNavigate } from "react-router-dom";
import { RoutesResponseData } from "../../models/RoutesResponseData";
import { LikeCounter } from "../LikeCounter";

type TravelProps = RoutesResponseData & {
  small?: boolean;
  disableLikes?: boolean;
};

const BoxWrapper = styled(Paper)`
  display: flex;
  flex-grow: 1;
  flex-basis: 100%;
  margin: 8px;

  &:hover {
    background-color: #EEEEEE;
  }
`;

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
  cursor: pointer;
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

const SmallBoxWrapper = styled(Paper)`
  display: flex;
  padding: 4px;
  margin: 4px;
  flex-direction: column;
  flex-basis: 100%;
`;

export const Travel: React.FC<TravelProps> = (props) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/app/travel?id=${props.id}`);
  }

  return !props.small
  ? (
    <BoxWrapper variant="outlined">
      <ContentWrapper>
        <TextWrapper onClick={handleOnClick}>
          <TitleWrapper>
            <Typography><b>{props.title}</b></Typography>
            <ExploreIcon />
          </TitleWrapper>
          <Typography variant="body2"> 
            {props.destinations[0]}<br/><SubdirectoryArrowRightIcon />
            {props.destinations.length > 2 && (<>...<br /><SubdirectoryArrowRightIcon /></>)}
            {props.destinations[props.destinations.length - 1]}
          </Typography>
        </TextWrapper>
        {props.isPublic && (
          <LikeCounter travelId={props.id} disabled={props.disableLikes} />
        )}
        <AdditionalInfoWrapper>
          <Typography variant="subtitle2">{props.startDate} — {props.endDate}</Typography>
        </AdditionalInfoWrapper>
      </ContentWrapper>
    </BoxWrapper>
  )
  : (
    <SmallBoxWrapper variant="outlined">
      <TitleWrapper>
        <Typography display="inline"><b>{props.title}</b></Typography>
        <ExploreIcon />
      </TitleWrapper>
      <Typography display="inline-flex" variant="subtitle2" style={{ color: 'gray' }}> 
        {props.destinations[0]}<ArrowForwardIcon />
        {props.destinations.length > 2 && (<>...<ArrowForwardIcon /></>)}
        {props.destinations[props.destinations.length - 1]}
      </Typography>
      {props.isPublic && (
        <LikeCounter travelId={props.id} disabled={props.disableLikes} />
      )}
    </SmallBoxWrapper>
  )
}
