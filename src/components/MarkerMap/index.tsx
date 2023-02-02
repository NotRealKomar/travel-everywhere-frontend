import { useCallback, useEffect, useRef } from 'react';
import {
  LngLat,
  Map as DisplayMap,
  MapMouseEvent,
  Marker,
  NavigationControl,
} from 'maplibre-gl';
import styled from '@emotion/styled';
import './styles.css';
import { getRouteMapStylesUrl } from '../../helpers/getRouteMapStyleUrl';
import { Typography } from '@mui/material';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import {
  DinnerDining,
  LocalBar,
  LocalCafe,
  LocalHotel,
  Visibility,
} from '@mui/icons-material';

export const MapWrapper = styled.div`
  position: relative;
  height: 900px;
`;

export const MapElement = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const DisabledMapElement = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: darkgray;
  color: white;
`;

export enum CustomMarkerType {
  CAFE = 'cafe',
  RESTAURANT = 'restaurant',
  PERFECT_VIEW = 'perfect_view',
  HOTEL = 'hotel',
  BAR = 'bar',
}

export const ICONS_MAP = {
  [CustomMarkerType.CAFE]: <LocalCafe />,
  [CustomMarkerType.RESTAURANT]: <DinnerDining />,
  [CustomMarkerType.PERFECT_VIEW]: <Visibility />,
  [CustomMarkerType.HOTEL]: <LocalHotel />,
  [CustomMarkerType.BAR]: <LocalBar />,
};

interface IRouteMapProps {
  markerType: CustomMarkerType;
  coordinates: LngLat | null;
  setCoordinates: (value: LngLat | null) => void;
  disabled?: boolean;
}

export const MarkerMap: React.FC<IRouteMapProps> = ({
  markerType,
  coordinates,
  setCoordinates,
  disabled,
}) => {
  const mapContainer = useRef<HTMLDivElement>(new HTMLDivElement());
  const map = useRef<DisplayMap | null>(null);

  const customMarker = useRef<Marker | null>(null);

  const addMarker = useCallback(
    (event: MapMouseEvent): void => {
      const { lngLat } = event;

      setCoordinates(lngLat);
    },
    [setCoordinates],
  );

  useEffect(() => {
    if (customMarker.current !== null) {
      customMarker.current.remove();
    }

    const customIcon = document.createElement('div');
    customIcon.innerHTML = renderToStaticMarkup(ICONS_MAP[markerType]);

    if (map.current !== null && coordinates !== null) {
      customMarker.current = new Marker({ element: customIcon })
        .setLngLat(coordinates)
        .addTo(map.current);

      return;
    }
  }, [coordinates, markerType]);

  useEffect(() => {
    if (map.current === null && !disabled) {
      map.current = new DisplayMap({
        container: mapContainer.current,
        style: getRouteMapStylesUrl(),
        center: [27.9534, 27.9534],
        maxBounds: [
          [23.09274, 51.340723],
          [32.9918293, 56.0770866],
        ],
        zoom: 0,
      });
      map.current.addControl(
        new NavigationControl({ showCompass: false }),
        'top-right',
      );

      map.current.on('click', addMarker);
    }
  }, [addMarker, disabled]);

  return (
    <MapWrapper className="map-wrap">
      {!disabled ? (
        <MapElement ref={mapContainer} className="map" />
      ) : (
        <DisabledMapElement>
          <Typography variant="h4">Map placeholder</Typography>
        </DisabledMapElement>
      )}
    </MapWrapper>
  );
};
