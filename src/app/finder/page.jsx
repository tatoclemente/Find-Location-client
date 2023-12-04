'use client'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import { useMemo, useState } from 'react';



const containerStyle = {
  width: '400px',
  height: '400px'
};

const centerLatLng = {
  lat: -31.859856,
  lng: -62.721137
};

const Finder = () => {

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  const [places, setPlaces] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"]
  })

  if (!isLoaded) return <div>Loading...</div>
  return <Map />
}


const Map = () => {
  const center = useMemo(() => (centerLatLng), [])
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className='places-container'>
        <PacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap
        zoom={10}
        center={centerLatLng}
        mapContainerClassName='map-container'
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PacesAutocomplete = ({ setSelected }) => {

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  return (
    <Combobox>
      <ComboboxInput 
      value={value} 
      onChange={e => setValue(e.target.value)} 
      disabled={!ready}
      className='combobox-input'
      placeholder='Buscar lugar' />

    </Combobox>
  )
}

export default Finder