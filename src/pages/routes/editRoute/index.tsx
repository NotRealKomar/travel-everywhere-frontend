import Box from '@mui/material/Box';
import { Button, Checkbox, Paper, Step, StepContent, StepLabel, Stepper, styled, Tab, Tabs, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { RouteMap } from '../../../components/RouteMap';
import { AutocompleteField } from '../../../components/AutocompleteField';
import { useEffect, useState } from 'react';
import { PlacesList } from '../../places/placesList';
import { TempPlace } from '../../../components/TempPlace';
import { useEditAndSaveRoute } from './hooks/useEditAndSaveRoute';
import { TabPanel } from '../../../components/TabPanel';

const STEPS = [
  {
    label: 'Выберите название и даты поездки',
    description: 'Путешествие будет отображаться на странице "Календарь"',
  },
  {
    label: 'Выберите точки маршрута',
  },
  {
    label: 'Почти готово!',
  },
];

const StepWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const CheckBoxWrapper = styled(Box)`
  display: flex;
  align-items: center;
  margin: 16px 0;
`;

const PlaceListWrapper = styled(Paper)`
  display: flex;
  flex-basis: 48%;
  flex-direction: column;
  padding: 8px;
`;

const ScrollablePlaceListWrapper = styled(Paper)`
  display: flex;
  flex-basis: 48%;
  flex-direction: column;
  padding: 8px;
  overflow: hidden,
  overflowY: scroll,
`;

const SecondStepWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const EditRoute: React.FC = () => {
  const {
    // error,
    // isLoading,
    routeData,
    points,
    startDate,
    endDate,
    activeStep,
    title,
    isPublic,
    appendPoint,
    clearPoint,
    setEndDate,
    setStartDate,
    loadRouteData,
    setActiveStep,
    handleSaveRoute,
    handleOnTitleChange,
    handleOnPublicFlagChange,
    handleOnGenerateRouteStepClick,
  } = useEditAndSaveRoute();

  const [tab, setTab] = useState(0);

  useEffect(() => {
    loadRouteData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStartDateChange = (value: Date | null) => {
    if (value !== null) {
      setStartDate(value);
    }
  };

  const handleEndDateChange = (value: Date | null) => {
    if (value !== null) {
      setEndDate(value);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (activeStep === 2) {
      handleOnGenerateRouteStepClick();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  const stepsElements: JSX.Element[] = [
    (
      <>
        <TextField 
          id="title" 
          label="Title" 
          variant="outlined"
          value={title}
          onChange={handleOnTitleChange}
        />
        <DesktopDatePicker
          label="Start date"
          inputFormat="dd/MM/yyyy"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="End date"
          inputFormat="dd/MM/yyyy"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </>
    ),
    (
      <SecondStepWrapper>
        <PlaceListWrapper elevation={3}>
          <Typography padding="4px">Выберите из существующих мест:</Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Популярное" value={0} />
              <Tab label="Личное" value={1} />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <PlacesList
              disableLikes
              small
              clickable
              loadPopular
              onClick={appendPoint}
            />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <PlacesList
              disableLikes
              small
              clickable
              onClick={appendPoint}
            />
          </TabPanel>
          <Typography padding="4px">ИЛИ введите адрес в поле поиска:</Typography>
          <AutocompleteField
            appendPoint={appendPoint}
          />
        </PlaceListWrapper>
        <ScrollablePlaceListWrapper elevation={3}>
          {[...points.entries()].map(([id, point]) => <TempPlace {...point} id={id} onClearButtonClick={clearPoint(id)} />)}
        </ScrollablePlaceListWrapper>
      </SecondStepWrapper>
    ),
    (
      <>
        <Typography variant='caption'>
          Впоследствии вы можете редактировать маркер на странице "Места". Нажмите кнопку "Создать маркер" чтобы продолжить
        </Typography>
        <CheckBoxWrapper>
          <Typography display="inline">Сделать публичным</Typography>
          <Checkbox checked={isPublic} onClick={handleOnPublicFlagChange} />
        </CheckBoxWrapper>
        <RouteMap routeData={routeData} waypoints={points} />
      </>
    ),
  ];

  return (
    <Box component="form" noValidate onSubmit={handleSaveRoute}>
      <Typography variant='h4'>Редактировать маршрут</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {STEPS.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              {step.label}
            </StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <Typography>{step.description}</Typography>
              <StepWrapper>
                {stepsElements[index]}
                {index !== STEPS.length - 1
                  ? (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                    >
                      Продолжить
                    </Button>
                  )
                  : (
                    <Button type="submit" variant="contained">
                      Редактировать маршрут
                    </Button>
                  ) 
                }
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                  >
                    Назад
                  </Button>
              </StepWrapper>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
