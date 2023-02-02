import { useEffect, useRef, useState } from 'react';
import { Map as DisplayMap, Marker, NavigationControl } from 'maplibre-gl';
import styled from "@emotion/styled";
import './styles.css';
import { getRouteMapStylesUrl } from '../../helpers/getRouteMapStyleUrl';
import { Typography } from '@mui/material';
import { Waypoint } from '../../pages/routes/newRoute/hooks/types';
import React from 'react';

export const MapWrapper = styled.div`
  position: relative;
  height: 500px;
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

interface IRouteMapProps {
  waypoints?: Map<string, Waypoint>;
  routeData?: any; // TODO: add type
  isRouteDetails?: boolean;
  disabled?: boolean;
};

export const RouteMap: React.FC<IRouteMapProps> = ({
  routeData,
  disabled,
  isRouteDetails,
  waypoints,
}) => {
  const mapContainer = useRef<any>();
  const map = useRef<DisplayMap | null>(null);

  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    if (map.current === null && !disabled) {
      map.current = new DisplayMap({
        container: mapContainer.current,
        style: getRouteMapStylesUrl(),
        center: [27.9534, 27.9534],
        maxBounds: [
          [23.092740, 51.340723],
          [32.9918293, 56.0770866]
        ],
        zoom: 0,
      });
      map.current.addControl(new NavigationControl({showCompass: false}), 'top-right');
    }
  }, [disabled]);

  useEffect(() => {
    markers.forEach((marker) => {
      marker.remove();
    });
  
    const newValue = [...(waypoints || new Map()).values()].map((waypoint) => {
      return new Marker()
        .setLngLat([waypoint.lon, waypoint.lat]);
    });

    setMarkers(newValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waypoints]);

  useEffect(() => {
    markers.forEach((marker) => {
      if(map.current !== null) {
        marker.addTo(map.current)
      }
    });
  }, [markers])

  const applyRouteDataToMap = () => {
    if (routeData && map && map.current) {
      const source = map.current.getSource('route');
      const layer = map.current.getLayer('layer');

      if (layer) {
        map.current.removeLayer('layer');
      }

      if (source) {
        map.current.removeSource('route');
      }

      map.current.addSource('route', {
        type: 'geojson',
        data: routeData,
      });

      // map.current.fitBounds(routeData.boundary);

      map.current.addLayer({
        id: 'layer',
        type: 'line',
        source: 'route',
      });
    }
  }

  useEffect(() => {
    if (isRouteDetails) {
      if(map && map.current)
      map.current.on('load', () => {
        applyRouteDataToMap();
      })
    } else {
      applyRouteDataToMap();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, routeData]);

  return (
    <MapWrapper className="map-wrap">
      {!disabled 
          ? (
            <MapElement ref={mapContainer} className="map" />
          )
          : (
            <DisabledMapElement>
              <Typography variant='h4'>Map placeholder</Typography>
            </DisabledMapElement>
          )
      }
    </MapWrapper>
  );
};
