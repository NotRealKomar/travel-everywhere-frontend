import { WaypointWithData } from '../pages/routes/newRoute/hooks/types';

export type RouteEditResponseData = {
  id: string;
  title: string;
  waypoints: WaypointWithData[];
  startDate: string;
  endDate: string;
  isPublic: boolean;
};
