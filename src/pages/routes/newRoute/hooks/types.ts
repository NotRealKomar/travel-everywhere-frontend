export type Waypoint = {
  lat: number;
  lon: number;
};

export type WaypointWithData = Waypoint & {
  label?: string;
  placeId?: string;
};

export type AutocompleteOption = {
  id: string;
  label: string;
  coordinates: Waypoint;
};
