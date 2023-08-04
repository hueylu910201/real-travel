import React from 'react';
import { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polygon, WMSTileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import SearchBar from './SearchBar';
import './App.css'
import L from 'leaflet';
import data from "./Data.json"
import locationPin from '../public/img/location-pin.png';


function App() {


  //多邊形範圍
  const purpleOptions = { color: 'purple' };
  const polygon = data.map(marker => marker.position);


  //點擊圖片使該marker置中
  const mapRef = useRef(null);
  const markerClick = (marker) => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.flyTo(marker.position, 16); // You can adjust the zoom level (12) as needed
    }
  };
  const onSearchResult = (searchItem) => {
    const marker = data.find(item => item.name.toLowerCase() === searchItem.toLowerCase());
    if (marker && mapRef.current) {
      const map = mapRef.current;
      map.flyTo(marker.position, 16);
    }
  }

  //縣市wms圖層
  const wmsURL = "http://wms.nlsc.gov.tw/wms";
  const wmsLayerParams = {
    layers: "CITY",
    styles: "default",
    bgcolor: "0xFFFFFF",
    transparent: true,
    format: "image/png",
    version: "1.1.1",
    uppercase: true, //  WMS request parameter keys will be uppercase.
    crs: L.CRS.EPSG3857,
    opacity: 1,
  };

  const markerIcon = new L.Icon({
    iconUrl: locationPin,
    iconSize:[45,45],
  });


  return (
    <div>
      <SearchBar placeholder="尋找店家" data={data} onSearchResult={onSearchResult} />
      <div style={{ marginTop: '3rem' }}>
        <MapContainer center={[25.02308934789089, 121.54513940000001]} zoom={16} scrollWheelZoom={true} ref={mapRef} style={{ height: '60vh', width: '50vw' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <WMSTileLayer url={wmsURL} {...wmsLayerParams} />
          <Marker position={[25.02308934789089, 121.54513940000001]}>
            <Popup>
              國立臺灣大學 <br /> 教育學院
            </Popup>
          </Marker>

          {data.map((marker, index) => (
            <Marker key={index} position={marker.position} icon={markerIcon}>
              <Popup>
                <div>
                  <p>{marker.name}</p>
                  <img src={marker.img} alt={marker.name} style={{ width: '10rem', cursor: 'pointer' }} />
                </div>
              </Popup>
            </Marker>

          ))}
          <Polygon pathOptions={purpleOptions} positions={polygon} />
        </MapContainer>
      </div>
      <div style={{ width: '50vw', height: '25vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        {data.map((marker, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={marker.img} alt={marker.name} style={{ width: '10rem' }} onClick={() => markerClick(marker)} />
            <a>{marker.name}</a>
          </div>
        ))}
      </div>
    </div>

  )
}

export default App
