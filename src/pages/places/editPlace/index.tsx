import Box from '@mui/material/Box';
import { 
  Button, 
  Checkbox, 
  FormControl, 
  FormHelperText, 
  InputLabel,
  MenuItem, 
  Select, 
  Step, 
  StepContent, 
  StepLabel, 
  Stepper, 
  TextField, 
  Typography
} from '@mui/material';
import { CustomMarkerType, MarkerMap } from '../../../components/MarkerMap';
import { AutocompleteField } from '../../../components/AutocompleteField';
import { useEditPlace } from './hooks/useEditPlace';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const STEPS = [
  {
    label: 'Введите описание места',
  },
  {
    label: 'Выберите место',
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

export const EditPlace: React.FC = () => {
  const {
    title,
    isPublic,
    activeStep,
    coordinates,
    description,
    selectedType,
    setPoint,
    setActiveStep,
    loadPlaceData,
    setCoordinates,
    handleSavePlace,
    handleOnTypeChange,
    handleOnTitleChange,
    handleOnPublicFlagChange,
    handleOnDescriptionChange,
  } = useEditPlace();

  useEffect(() => {
    loadPlaceData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
        <TextField 
          id="description" 
          label="Description" 
          variant="outlined" 
          multiline
          minRows={4}
          value={description}
          onChange={handleOnDescriptionChange}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="type-input-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            value={selectedType}
            label="Type"
            onChange={handleOnTypeChange}
          >
            <MenuItem value={CustomMarkerType.CAFE}>Cafe</MenuItem>
            <MenuItem value={CustomMarkerType.RESTAURANT}>Restaurant</MenuItem>
            <MenuItem value={CustomMarkerType.PERFECT_VIEW}>Perfect view</MenuItem>
            <MenuItem value={CustomMarkerType.HOTEL}>Hotel</MenuItem>
            <MenuItem value={CustomMarkerType.BAR}>Bar</MenuItem>
          </Select>
          <FormHelperText>With label + helper text</FormHelperText>
        </FormControl>
      </>
    ),
    (
      <>
        <Typography>Введите адрес</Typography>
        <AutocompleteField
          appendPoint={setPoint}
        />
        <Typography>ИЛИ</Typography>
        <Typography>Выберите точку на карте</Typography>
        <MarkerMap 
          markerType={selectedType}
          coordinates={coordinates} 
          setCoordinates={setCoordinates}
        />
      </>
    ), (
      <>
        <Typography variant='caption'>
          Впоследствии вы можете редактировать маркер на странице "Места". Нажмите кнопку "Создать маркер" чтобы продолжить
        </Typography>
        <CheckBoxWrapper>
          <Typography display="inline">Сделать публичным</Typography>
          <Checkbox checked={isPublic} onClick={handleOnPublicFlagChange} />
        </CheckBoxWrapper>
      </>
    )
  ]

  return (
    <Box component="form" noValidate onSubmit={handleSavePlace}>
      <Typography variant='h4'>Редактировать маркер</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {STEPS.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              {step.label}
            </StepLabel>
            <StepContent>
              <StepWrapper>
                {stepsElements[index]}
                {index !== STEPS.length - 1
                  ? (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Продолжить
                    </Button>
                  )
                  : (
                    <Button type="submit" variant="contained">
                      Редактировать маркер
                    </Button>
                  ) 
                }
                
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
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
