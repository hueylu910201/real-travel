import React from 'react';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polygon, WMSTileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'
import L from 'leaflet';
// import data from "./Data.json"
import MapItemList from './MapItemList';
import locationPin from '../public/img/location-pin.png';
import restaurant from '../public/img/fork.png';
import hotel from '../public/img/hotel.png';
import landscape from '../public/img/trees.png';


export default function Map({ mapRef, data, center, city }) {

    //多選filter
    const [filteredItem, setFilteredItem] = useState(data);
    let [sort, setSort] = useState([]);
    const [selected, setSelected] = useState([]);
    console.log(sort);
    const handleSortClick = (index) => {
        if (selected.length === 1 && selected[0] === index) {
            return; // 不执行状态更新
        }
        console.log(selected);
        if (selected.includes(index)) {
            setSelected(selected.filter(item => item !== index));

        } else {
            setSelected([...selected, index]);
        }
    };



    //多邊形範圍
    // const purpleOptions = { color: 'purple' };
    // const polygon = filteredItem.map(marker => marker.position);

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

    // Create icons for different categories
    const markerIcon = new L.Icon({
        iconUrl: locationPin,
        iconSize: [40, 40],
    });
    const createMarkerIcon = (category) => {
        const icons = {
            '餐廳': restaurant,
            '住宿': hotel,
            '景點': landscape,
            // Add icons for other categories
        };
        return L.icon({
            iconUrl: icons[category] || locationPin,
            iconSize: [40, 40],
        });
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
        const defaultActiveIndex = sortValues.indexOf('住宿');
        setSelected([defaultActiveIndex]);
        if (mapRef.current) {
            const map = mapRef.current;
            // 监听mapRef的变化，执行map.flyTo操作
            map.flyTo(center, 16); // 设置默认的中心位置和缩放级别
        }
    }, [mapRef, center]);
    return (
        <div style={{ marginTop: '3rem' }}>

            <MapContainer center={center} zoom={16} scrollWheelZoom={true} ref={mapRef} style={{ height: '60vh', width: '50vw' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <WMSTileLayer url={wmsURL} {...wmsLayerParams} />
                <Marker position={center} icon={markerIcon}>
                    <Popup>
                        {city} <br />
                    </Popup>
                </Marker>

                {filteredItem.map((marker, index) => (
                    <Marker key={index} position={marker.position} icon={createMarkerIcon(marker.sort)}>
                        <Popup >
                            <div>
                                <p>{marker.name}</p>
                                <img src={marker.img} alt={marker.name} style={{ width: '10rem', cursor: 'pointer' }} />
                                <Link to={`/MapView/name/${marker.name}`}>
                                    <div>查看詳情</div>
                                </Link>
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

            {/* <MapItemList data={filteredItem} mapRef={mapRef}/> */}
        </div>

    );
}