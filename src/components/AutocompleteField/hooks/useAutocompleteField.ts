import { ChangeEvent, useEffect, useState } from "react";
import { getAutocompleteOptions } from "../../../helpers/getAutocompleteOptions";
import { useDebounce } from "../../../helpers/useDebounce";
import { AutocompleteOption } from "../../../pages/routes/newRoute/hooks/types";

export const useAutocompleteField = () => {
  const [options, setOptions] = useState<AutocompleteOption[]>([]);

  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (debouncedValue !== '' && debouncedValue.length >= 3) {  
      handleAutocompleteSearch(debouncedValue);
    } else {
      setOptions([]);
    }
  }, [debouncedValue]);

  const handleAutocompleteSearch = async (value: string) => {
    setError('');
    setIsLoading(true);

    const response = await getAutocompleteOptions(value);

    if (response.items.length !== 0 && response.error === undefined) {
      setOptions(response.items);
    } else if (response.error !== undefined) {
      setError(response.error.message);
    }

    setIsLoading(false);
  }

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setValue(newValue);
  }

  return {
    error,
    options,
    isLoading,
    debouncedValue,
    onValueChange,
  }
}
