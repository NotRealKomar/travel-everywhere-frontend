import { DestinationData } from "./DestinationData";

export type RouteDetailsResponseData = {
  id: string;
  title: string;
  destinations: DestinationData[];
  startDate: string;
  endDate: string;
  isPublic: boolean;
  routeData: unknown;
  userId: string;
};