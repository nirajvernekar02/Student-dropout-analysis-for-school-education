import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import indiaData from './india.topo.json'; // Import the GeoJSON data for India

const IndiaMap = () => {
  const handleStateClick = (stateAbbr) => {
    // Handle state click event
    console.log(`Clicked on ${stateAbbr}`);
    // You can add your logic here to navigate to the state page or perform any other action
  };

  const geoUrl = `https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json`;

  return (
    <ComposableMap projection="geoMercator" width={800} height={600}>
      <Geographies geography={indiaData}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onClick={() => handleStateClick(geo.properties.state_code)}
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