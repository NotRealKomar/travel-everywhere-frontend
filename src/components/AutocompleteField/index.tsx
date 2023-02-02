import { Autocomplete, TextField } from '@mui/material';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import {
  AutocompleteOption,
  WaypointWithData,
} from '../../pages/routes/newRoute/hooks/types';
import { useAutocompleteField } from './hooks/useAutocompleteField';

type AutocompleteFieldsProps = {
  value?: AutocompleteOption | null;
  appendPoint: (value: WaypointWithData | null) => void;
  onFieldClear?: () => void;
};

const AutocompleteWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AutocompleteField: React.FC<AutocompleteFieldsProps> = ({
  value,
  appendPoint,
}) => {
  const {
    // error,
    options,
    // isLoading,
    debouncedValue,
    onValueChange,
  } = useAutocompleteField();

  const [selectedValue, setSelectedValue] = useState<AutocompleteOption | null>(
    value ?? null,
  );

  const handleOnChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: AutocompleteOption | null,
  ): void => {
    appendPoint(
      value
        ? {
            lat: value.coordinates.lat,
            lon: value.coordinates.lon,
            label: value.label,
          }
        : null,
    );

    setSelectedValue(null);
  };

  return (
    <AutocompleteWrapper>
      <Autocomplete
        disablePortal
        id="autocomplete-field"
        sx={{ width: 300 }}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={onValueChange}
            value={debouncedValue}
          />
        )}
        value={selectedValue}
        onChange={handleOnChange}
      />
    </AutocompleteWrapper>
  );
};
