import React from 'react';
import { ComposableMap, Geographies, Geography,useGeographies, ZoomableGroup,
  useZoomPanContext,Line } from 'react-simple-maps';
import indiaData from './india.topo.json';

import './map.css';

const IndiaMap = () => {
  const handleStateClick = (properties) => {
    console.log(properties);
  };

  return (
   
      <ComposableMap projection="geoMercator">
        <Geographies geography={indiaData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleStateClick(geo.properties)}
                style={{
                  default: {
                    fill: '#D6D6DA',
                    outline: 'none',
                  },
                  hover: {
                    fill: '#F53',
                    outline: 'none',
                  },
                  pressed: {
                    fill: '#E42',
                    outline: 'none',
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>

  );
};

export default IndiaMap;