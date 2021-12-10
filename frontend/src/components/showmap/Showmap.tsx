
import { useState } from "react";

import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import mapboxgl from "mapbox-gl";

import IStore from "../../contexts/IStores";
import { useContext } from "react";
import { StoresContext } from "../../contexts/StoresContext";

import styles from './Showmap.module.css'
import {
  Card,
  CardContent,
  CardMedia
} from "@mui/material";

import { DEFAULT_STORE_URL } from "../../utils/variables";
import constants from "../../constants.json";

interface Props {
  stores: IStore[];
  selectStore: (id: string) => any;
}

const fullscreenControlStyle = {
  right: 10,
  top: 10,
};
const navControlStyle = {
  right: 10,
  top: 40,
};
const geolocateControlStyle = {
  right: 10,
  top: 130,
};

const Showmap: React.FC<Props> = ({ stores, selectStore }) => {

  const [viewport, setViewport] = useState({
    latitude: 65.0118734,
    longitude: 25.4716809,
    zoom: 12,
  });
  const { storeId, getRateColor, getAvgRate, getDeductedPrice } = useContext(StoresContext);
  const [selectedStore, setSelectedStore]: any = useState(null);

  const getActiveStoreStyle = (id: string) => {
    if (id === storeId) return styles.activeMarketPrice
    else return styles.marketPrice
  }

  return (
    <>
      <ReactMapGL
        height='100%'
        width='100%'
        {...viewport}
        mapboxApiAccessToken={constants.MAPBOX_TOKEN}
        onViewportChange={(viewport: any) => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navControlStyle} />
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          auto
        />
        {stores.map((store: any) => {
          return (
            <Marker
              key={store.id}
              latitude={store.location.coordinates[1]}
              longitude={store.location.coordinates[0]}
            >
              <button className={getActiveStoreStyle(store.id)} onClick={(event) => {
                event.preventDefault();
                setSelectedStore(store);
              }}>
                {store.price} €
              </button>
            </Marker>
          );
        })}
        {selectedStore ? (
          <Popup
            latitude={selectedStore.location.coordinates[1]}
            longitude={selectedStore.location.coordinates[0]}
            onClose={() => {
              setSelectedStore(null);
            }}
          >
            <Card style={{ boxShadow: 'none', maxHeight: 345 }} onClick={() => selectStore(selectedStore?.id)}>
              <CardMedia
                component="img"
                height="140"
                image={DEFAULT_STORE_URL}
                alt="green iguana"
              />
              <CardContent>
                <h2>{selectedStore?.name}</h2>
                <h3>{selectedStore?.address}</h3>
                <h3 style={{ color: getRateColor(getAvgRate(selectedStore?.rate)) } || 'green'}>{getAvgRate(selectedStore?.rate) || 0} ★ {` (${selectedStore?.rate.length || 0})`}</h3>
                <h3>{
                  selectedStore?.discount_rate > 0 ?
                    `Original ${selectedStore?.price}€  => ${getDeductedPrice(selectedStore?.price, selectedStore?.discount_rate)}€` :
                    `${selectedStore?.price}€`
                }
                </h3>
                <h3>Open from: 10:00 AM
                </h3>
              </CardContent>
            </Card>
          </Popup>
        ) : null}
      </ReactMapGL>
    </>
  );
};

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default Showmap;
