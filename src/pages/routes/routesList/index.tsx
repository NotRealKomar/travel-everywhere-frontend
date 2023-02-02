import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Travel } from "../../../components/Travel";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useRoutesList } from "./hooks/useRoutesList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type RoutesListProps = {
  small?: boolean;
  loadActive?: boolean;
  loadPopular?: boolean;
  showTitle?: boolean;
  showSearch?: boolean;
};

const ListWrapper = styled(Box)`
  display: flex;
  padding: 0;
  flex-wrap: wrap;
`;

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
  padding: 8px;
  align-items: center;
`;

export const RoutesList: React.FC<RoutesListProps> = ({ small, loadActive, loadPopular, showTitle, showSearch }) => {
  const {
    routesData,
    searchQuery,
    loadRoutesData,
    onSearchValueChange,
  } = useRoutesList({loadActive, loadPopular});

  useEffect(() => {
    loadRoutesData({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/app/new-route');
  }

  return routesData.length > 0
  ? (
    <ListWrapper>
      {showTitle && (
        <TitleWrapper>
          <Typography variant="h4">Путешествия</Typography>
          <Button onClick={handleOnClick} variant="contained">Новое путешествие</Button>
        </TitleWrapper>
      )}
      {showSearch && (
        <SearchWrapper>
          <TextField value={searchQuery} onChange={onSearchValueChange} fullWidth label="Поиск" />
        </SearchWrapper>
      )}
      {routesData.map((value) => (
          <Travel small={small} {...value} />
        )
      )}
    </ListWrapper>
  )
  : (
    <Box>
      {showTitle && (
        <TitleWrapper>
          <Typography variant="h4">Путешествия</Typography>
          <Button onClick={handleOnClick} variant="contained">Новое путешествие</Button>
        </TitleWrapper>
      )}
      {showSearch && (
        <SearchWrapper>
          <TextField value={searchQuery} onChange={onSearchValueChange} fullWidth label="Поиск" />
        </SearchWrapper>
      )}
      <EmptyListWrapper>
        <TravelExploreIcon style={{fontSize: '80px', color: 'lightgray'}}/>
        <Typography variant="h4">
          Нет созданных маршрутов
        </Typography>
        <Typography variant="subtitle2" style={{color: 'gray', margin: "24px"}}>
          Создайте новый маршрут через меню "Путешествия" или по <u>ссылке</u>
        </Typography>
      </EmptyListWrapper>
    </Box>
  );
}