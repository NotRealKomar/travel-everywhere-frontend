import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Place } from "../../../components/Place";
import { usePlacesList } from "./hooks/usePlacesList"
import RoomIcon from '@mui/icons-material/Room';
import { WaypointWithData } from "../../routes/newRoute/hooks/types";
import { useNavigate } from "react-router-dom";

type PlacesListProps = {
  small?: boolean;
  loadPopular?: boolean;
  disableLikes?: boolean;
  clickable?: boolean;
  showTitle?: boolean;
  showSearch?: boolean;
  onClick?: (value: WaypointWithData | null) => void;
};

const EmptyListWrapper = styled(Box)`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled(Box)`
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  padding: 8px;
  justify-content: space-between;
  align-items: center;
`;

const SearchWrapper = styled(Box)`
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  padding: 8px 8px 8px 0;
  align-items: center;
`;

  const ListWrapper = styled(Box)`
    display: flex;
    flex-basis: 100%;
    flex-wrap: wrap;
    padding: 0;

  `;

export const PlacesList: React.FC<PlacesListProps> = ({
    disableLikes,
    loadPopular,
    small,
    clickable,
    showSearch,
    showTitle,
    onClick,
  }) => {


  const {
    placesData,
    searchQuery,
    loadPlacesData,
    onSearchValueChange,
  } = usePlacesList({ loadPopular });

  useEffect(() => {
    loadPlacesData({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/app/new-place');
  }

  return placesData.length > 0
  ? (
    <ListWrapper
      style={{flexBasis: small ? "120px" : "100%"}}
    >
      {showTitle && (
        <TitleWrapper>
          <Typography variant="h4">Места</Typography>
          <Button onClick={handleOnClick} variant="contained">Новый маркер</Button>
        </TitleWrapper>
      )}
      {showSearch && (
        <SearchWrapper>
          <TextField value={searchQuery} onChange={onSearchValueChange} fullWidth label="Поиск" />
        </SearchWrapper>
      )}
      {placesData.map((value) => (
          <Place
            small={small}
            disableLikes={disableLikes}
            onClick={onClick}
            clickable={clickable}
            {...value}
          />
        )
      )}
    </ListWrapper>
  )
  : (
    <Box>
      {showTitle && (
        <TitleWrapper>
          <Typography variant="h4">Места</Typography>
          <Button onClick={handleOnClick} variant="contained">Новый маркер</Button>
        </TitleWrapper>
      )}
      {showSearch && (
        <SearchWrapper>
          <TextField value={searchQuery} onChange={onSearchValueChange} fullWidth label="Поиск" />
        </SearchWrapper>
      )}
      <EmptyListWrapper>
        <RoomIcon style={{fontSize: '80px', color: 'lightgray'}}/>
        <Typography variant="h4">
          Нет созданных маркеров
        </Typography>
        <Typography variant="subtitle2" style={{color: 'gray', margin: "24px"}}>
          Создайте новое место на карте через меню "Места" или по <u>ссылке</u>
        </Typography>
      </EmptyListWrapper>
    </Box>
  );
}