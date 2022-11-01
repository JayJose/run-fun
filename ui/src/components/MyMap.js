import { useState } from 'react';

import StaticMap from 'react-map-gl';
import { DeckGL } from '@deck.gl/react';
import { PathLayer } from '@deck.gl/layers';

import data from '../data/routes.json';

/** Generate a map of Atlanta
 */
export function MyMap() {
  // create path attribute
  data.forEach((run) => {
    run.path = [];
    run.record.forEach((c, i) => {
      if (i % 5 === 0) {
        if ((c.position_long !== null) & (c.position_lat !== null)) {
          run.path.push([c.position_long, c.position_lat]);
        }
      }
    });
  });

  const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoiamF5am9zZSIsImEiOiJjbDhzczVoeW4wMGdlM3BuemU0aTh1cXF6In0.P6rxnD9XAxmufeHZRMwGOw';

  const indexViewState = {
    latitude: 33.73,
    longitude: -84.42,
    zoom: 10,
    bearing: 0,
    pitch: 35
  };

  const [viewState, setViewState] = useState(indexViewState);

  const updateViewState = ({ viewState }) => {
    setViewState(viewState);
  };

  // LAYERS
  const pathLayer = new PathLayer({
    id: 'path-layer',
    data: data,
    widthScale: 1,
    widthMinPixels: 3,
    getPath: (d) => d.path,
    getColor: [255, 0, 0, 40],
    getWidth: (d) => 5,
    pickable: true,
    autoHighlight: true,
    highlightColor: [111, 255, 176]
  });

  return (
    <>
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          margin: 'large',
          pad: 'small'
        }}
      >
        <DeckGL
          layers={[pathLayer]}
          controller={true}
          initialViewState={viewState}
          onViewStateChange={updateViewState}
          getTooltip={({ object }) =>
            object && {
              html: `<h1>${object.local_timestamp}</h1>`
            }
          }
        >
          <StaticMap
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle={'mapbox://styles/mapbox/light-v10'}
          ></StaticMap>
        </DeckGL>
      </div>
    </>
  );
}
