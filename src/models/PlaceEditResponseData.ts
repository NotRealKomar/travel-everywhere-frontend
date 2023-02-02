import { CustomMarkerType } from '../components/MarkerMap';

export type PlaceEditResponseData = {
  id: string;
  title: string;
  description: string;
  coordinates: {
    lng: number;
    lat: number;
  };
  type: CustomMarkerType;
  isPublic: boolean;
};
