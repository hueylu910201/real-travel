import React from 'react';
import { useState, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

export default function SearchBar() {
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


  //搜尋filter
  const mapRef = useRef(null);
  const [value, setValue] = useState('');
  const onChange = (event) => {
    setValue(event.target.value);
  }
  const onSearch = (searchItem) => {
    setValue(searchItem);
    console.log("內容:", searchItem);
    const marker = markerPos.find((item) => item.name.toLowerCase() === searchItem.toLowerCase());
    if (marker && mapRef.current) {
      const map = mapRef.current;
      map.flyTo(marker.position, 16);
    }
  }
  return (
    <div style={{ width: '50wh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginLeft: '4.5rem' }}>
        <input id="searchbar" type="text" placeholder='尋找店家' value={value} onChange={onChange}
          style={{ width: '30vw', height: '4vh' }} />
        <button onClick={() => onSearch(value)}>搜尋</button>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', borderStyle: 'solid',
        borderTopStyle: 'none', borderBottomStyle: 'none', borderColor: 'black', borderWidth: '1px',
        width: '30vw', height: '10vh',cursor:'pointer'
      }}>
        {markerPos.filter(item => {
          const searchItem = value.toLowerCase();
          const name = item.name.toLowerCase();
          return searchItem && name.startsWith(searchItem) && name !== searchItem
        }).slice(0, 10)
          .map((item, index) => (
            <div onClick={() => { onSearch(item.name) }} key={index} style={{ display: 'flex' }}>{item.name}</div>
          ))}
      </div>
    </div>
  );
}
