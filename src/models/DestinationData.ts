import { CustomMarkerType } from '../components/MarkerMap';

export type DestinationData = {
  formattedAddress: string;
  city: string | null;
  title: string | null;
  type: CustomMarkerType | null;
  lon: number;
  lat: number;
};
