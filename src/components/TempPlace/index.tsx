import { Box, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";
import { WaypointWithData } from "../../pages/routes/newRoute/hooks/types";
import { Clear } from "@mui/icons-material";

type TempPlaceProps = WaypointWithData & {
  id: string;
  onClearButtonClick: () => void,
};

const BoxWrapper = styled(Paper)`
  display: flex;
  flex-grow: 0;
  margin-right: 8px;
  flex-basis: 100px;
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

const ClearIcon = styled(Clear)`
  margin-left: 8px;
  color: grey;
  cursor: pointer;
`;

export const TempPlace: React.FC<TempPlaceProps> = (props) => {
  return (
    <BoxWrapper
      variant="outlined"
      id={props.id}
      key={props.id}
    >
      <ContentWrapper>
        <TextWrapper>
          <TitleWrapper>
            <Typography><b>{props.label ?? 'NO_LABEL'}</b></Typography>
            <ClearIcon onClick={props.onClearButtonClick} />
          </TitleWrapper>
        </TextWrapper>
        <AdditionalInfoWrapper>
          <Typography variant="subtitle2">{props.placeId ?? ''}</Typography>
          <Typography variant="subtitle2">{props.lon} {props.lat}</Typography>
        </AdditionalInfoWrapper>
      </ContentWrapper>
    </BoxWrapper>
  )
}
