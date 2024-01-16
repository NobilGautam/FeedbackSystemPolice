// MapComponent.js
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';

const MapComponent = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  const markerOverlay = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: ([parseFloat(longitude), parseFloat(latitude)]),
        zoom: 10,
        projection: 'EPSG:4326',
      }),
    });

    // Create a marker overlay
    markerOverlay.current = new Overlay({
      element: document.createElement('div'),
      positioning: 'center-center',
      stopEvent: false,
    });

    map.addOverlay(markerOverlay.current);

    // Initialize marker position
    const initialCoordinate = fromLonLat([parseFloat(longitude), parseFloat(latitude)]);
    markerOverlay.current.setPosition(initialCoordinate);

    // Event listener for map click
    map.on('click', (event) => {
      const clickedCoordinate = event.coordinate;
      const lonLat = toLonLat(clickedCoordinate);
      console.log('Clicked Coordinate:', lonLat);

      // Set marker position
      markerOverlay.current.setPosition(clickedCoordinate);
    });

    // Save the map reference for disposal
    mapRef.current = map;

    return () => {
      map.dispose();
    };
  }, [latitude, longitude]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default MapComponent;
