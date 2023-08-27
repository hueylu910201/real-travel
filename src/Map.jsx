import React from 'react';
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polygon, WMSTileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'
import L from 'leaflet';
import data from "./Data.json"
import locationPin from '../public/img/location-pin.png';


export default function Map({ mapRef }) {

    //多選filter
    const [selected, setSelected] = useState([]);
    const [filteredItem, setFilteredItem] = useState(data);
    let [sort, setSort] = useState([]);
    console.log(sort);
    const handleSortClick = (index) => {
        console.log(selected);
        if (selected.includes(index)) {
          setSelected(selected.filter(item => item !== index));
        } else {
          setSelected([...selected, index]);
        }
      };




    //多邊形範圍
    const purpleOptions = { color: 'purple' };
    const polygon = data.map(marker => marker.position);

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
        iconSize: [45, 45],
    });


    const markerClick = (marker) => {
        if (mapRef.current) {
            const map = mapRef.current;
            map.flyTo(marker.position, 16); // You can adjust the zoom level (12) as needed
        }
    };


    //更新多選狀態
    useEffect(() => {
        if (sort.length > 0 && selected.length > 0) {
          const selectedSorts = selected.map(index => sort[index]);
          const sortedAndFilteredData = data.filter(item => selectedSorts.includes(item.sort));
          setFilteredItem(sortedAndFilteredData);
        }
      }, [selected, sort]);

    useEffect(() => {
        const sortValues = Array.from(new Set(data.map(item => item.sort)));
        setSort(sortValues);
        if (mapRef.current) {
            const map = mapRef.current;
            // 监听mapRef的变化，执行map.flyTo操作
            map.flyTo([25.02308934789089, 121.54513940000001], 16); // 设置默认的中心位置和缩放级别
        }
    }, [mapRef]);
    return (
        <div style={{ marginTop: '3rem' }}>
            <MapContainer center={[25.02308934789089, 121.54513940000001]} zoom={16} scrollWheelZoom={true} ref={mapRef} style={{ height: '60vh', width: '50vw' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <WMSTileLayer url={wmsURL} {...wmsLayerParams} />
                <Marker position={[25.02308934789089, 121.54513940000001]} icon={markerIcon}>
                    <Popup>
                        國立臺灣大學 <br /> 教育學院
                    </Popup>
                </Marker>

                {filteredItem.map((marker, index) => (
                    <Marker key={index} position={marker.position} icon={markerIcon}>
                        <Popup>
                            <div>
                                <p>{marker.name}</p>
                                <img src={marker.img} alt={marker.name} style={{ width: '10rem', cursor: 'pointer' }} />
                            </div>
                        </Popup>
                    </Marker>

                ))}
                {/* <Polygon pathOptions={purpleOptions} positions={polygon} /> */}
            </MapContainer>

            <div style={{ width: '50vw', height: '6vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                {sort.map((sort, index) => (
                    <button key={index} className={selected.includes(index) ? 'active sort-button' : 'sort-button'} onClick={() => handleSortClick(index)}>
                        {sort}
                    </button>
                ))}
            </div>

            <div style={{ width: '50vw', height: '25vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                {filteredItem.map((marker, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={marker.img} alt={marker.name} style={{ width: '10rem' }} onClick={() => markerClick(marker)} />
                        <a>{marker.name}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}