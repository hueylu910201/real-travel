import React from 'react';
import {  useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import SearchBar from './SearchBar';
import './App.css'
import data from "./Data.json"
import Map from './Map';


function App() {

  //點擊圖片使該marker置中
  const mapRef = useRef(null);
  const onSearchResult = (searchItem) => {
    const marker = data.find(item => item.name.toLowerCase() === searchItem.toLowerCase());
    if (marker && mapRef.current) {
      const map = mapRef.current;
      map.flyTo(marker.position, 16);
    }
  }

  return (
    <div>
      <SearchBar placeholder="尋找店家" data={data} onSearchResult={onSearchResult} />
      <Map mapRef={mapRef} />
    </div>
  )
}

export default App
