import StaticMap from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { DeckGL } from '@deck.gl/react';
import { PathLayer } from '@deck.gl/layers';

import aRoute from '../data/aRoute.json';

/** Generate a map of Atlanta
 */
export function MyMap() {
  // transform data
  // {
  //     path: [[-122.4, 37.7], [-122.5, 37.8], [-122.6, 37.85]],
  //     name: 'Richmond - Millbrae',
  //     color: [255, 0, 0]
  // }

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

  const onHover = (info) => {
    info && {
      html: `${info.object.properties.NAME}`
    };
  };

  // LAYERS
  const pathLayer = new PathLayer({
    id: 'path-layer',
    aRoute,
    pickable: true,
    widthScale: 20,
    widthMinPixels: 2,
    getPath: (d) => d.path,
    getColor: (d) => colorToRGBArray(d.color),
    getWidth: (d) => 5
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
              html: `${object.properties.NAME}`
            }
          }
        >
          <StaticMap
            reuseMaps
            mapStyle={BASEMAP.DARK_MATTER}
            //mapboxAccessToken={process.env.mapboxAccessToken}
          ></StaticMap>
        </DeckGL>
      </div>
    </>
  );
}
