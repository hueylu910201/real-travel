import React from 'react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, Polygon, WMSTileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'
import styles from "./styles.module.css"
import L from 'leaflet';
import SearchIcon from '@mui/icons-material/Search';


function App() {

  //多邊形範圍
  const purpleOptions = { color: 'purple' };
  const polygon = [
    [25.024973524288985, 121.54413342481826],
    [25.024831345073277, 121.54643207789951],
    [25.02285732931282, 121.54752050047698],
    [25.0220289657309, 121.54320382037442],
  ]

  //JSON資料
  const markerPos = [
    {
      name: '烏弄',
      position: [25.024973524288985, 121.54413342481826],
      img: 'public/烏弄.jpg',
    },
    {
      name: '可不可熟成紅茶',
      position: [25.024831345073277, 121.54643207789951],
      img: 'public/可不可.jpg',
    },
    {
      name: '不知道',
      position: [25.02285732931282, 121.54752050047698],
      img: 'public/不知道.jpg',
    },
    {
      name: '米堤銀行',
      position: [25.0220289657309, 121.54320382037442],
      img: 'public/米堤.jpg',
    },
  ]

  //點擊圖片使該marker置中
  const mapRef = useRef(null);
  const markerClick = (marker) => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.flyTo(marker.position, 16); // You can adjust the zoom level (12) as needed
    }
  };

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

  //搜尋filter
  const [value, setValue] = useState('');
  const [filterData, setFilterData] = useState([]);
  const onChange = (event) => {
    const searchItem = event.target.value;
    setValue(searchItem);
    if (searchItem === '') {
      setFilterData([]); // Clear the suggestions
    } else {
      const newFilter = markerPos.filter((item) => {
        return item.name.toLowerCase().includes(searchItem.toLowerCase());
      }).slice(0,10);
      setFilterData(newFilter);
    }
  }

  const onSearch = (searchItem) => {
    setValue(searchItem);
    console.log("內容:", searchItem);
    const marker = markerPos.find(item => item.name.toLowerCase() === searchItem.toLowerCase());
    if (marker && mapRef.current) {
      const map = mapRef.current;
      map.flyTo(marker.position, 16);
    }
    setFilterData([]);
  }

  return (
    <div>
      <div className={styles.searchBar}>
        <div className={styles.searchInput}>
          <input id="searchbar" type="text" placeholder='尋找店家' value={value} onChange={onChange}
            style={{ width: '30vw', height: '4vh' ,borderStyle:'solid',borderRight:'none'}} />
          <button className={styles.searchButton}onClick={() => onSearch(value)}>搜尋</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {filterData.length !== 0 && (
            <div className={styles.suggestion}>
              {filterData.map((item, index) => (
                <div onClick={() => { onSearch(item.name) }} key={index} style={{ display: 'flex' }}>{item.name}</div>
              ))}
            </div>
          )}
        </div>

      </div>
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

          {markerPos.map((marker, index) => (
            <Marker key={index} position={marker.position} >
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
        {markerPos.map((marker, index) => (
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
