import axios from "axios";
import { AutocompleteResponseData } from "../models/AutocompleteResponseData";
import { AutocompleteOption } from "../pages/routes/newRoute/hooks/types";
import { getApiUrl } from "./getApiUrl";

type AutocompleteOutput = {
  items: AutocompleteOption[];
  error?: Error;
};

export const getAutocompleteOptions = async (value: string): Promise<AutocompleteOutput> => {
  try {
    const response = 
      await axios.get<AutocompleteResponseData[]>(`${getApiUrl('app')}/places/autocomplete`, {
        headers: {
          authorization: localStorage.getItem('accessToken') ?? '',
        },
        params: {
          value,
        }
      }
    );

    const items = response.data.map((data): AutocompleteOption => ({
      id: data.place_id,
      label: data.formatted,
      coordinates: {
        lat: data.lat,
        lon: data.lon,
      }
    }));

    return {
      items,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        items: [],
        error,
      }
    }

    throw error;
  }
}
