import { CustomMarkerType } from "../components/MarkerMap";

export type PlaceResponseData = {
  id: string;
  title: string;
  description: string;
  type: CustomMarkerType;
  createdAt: string;
  details: {
    address_line1: string;
    address_line2: string;
    formatted: string;
    city: string; 
  }
  coordinates: {
    lng: number;
    lat: number;
  };
  isPublic: boolean;
}
