import React from 'react';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polygon, WMSTileLayer } from 'react-leaflet'
import { useSelector } from 'react-redux';
import { selectFavItems } from "./redux/favoriteSlice";
import { Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './App.css'
import L from 'leaflet';
// import data from "./Data.json"
import MapItemList from './MapItemList';
import locationPin from '../public/img/location-pin.png';
import restaurant from '../public/img/fork.png';
import hotel from '../public/img/hotel.png';
import landscape from '../public/img/trees.png';


export default function MapForSelected({ mapRef, center, city, scheduleName }) {

    //多選filter
    // const [filteredItem, setFilteredItem] = useState(data);
    //多邊形範圍
    // const purpleOptions = { color: 'purple' };
    // const polygon = filteredItem.map(marker => marker.position);


    //讀取第一個景點的座標
    const selectedSchedule = useSelector(state =>
        state.favorite.schedules.find(schedule => schedule.scheduleName === scheduleName)
    );
    const landmarks = selectedSchedule ? selectedSchedule.landmarks : [];//行程內的景點
    const firstLandmark = landmarks.length > 0 ? landmarks[0] : null;
    const changeCenter = firstLandmark && firstLandmark.position && firstLandmark.position.lat && firstLandmark.position.lng ? [firstLandmark.position.lat, firstLandmark.position.lng] : center;


    const limeOptions = { color: '#525966' };

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


    //更新多選狀態
    // useEffect(() => {
    //     if (sort.length > 0 && selected.length > 0) {
    //         const selectedSorts = selected.map(index => sort[index]);
    //         const sortedAndFilteredData = data.filter(item => selectedSorts.includes(item.sort));
    //         setFilteredItem(sortedAndFilteredData);
    //     }
    // }, [selected, sort]);


    useEffect(() => {
        // const sortValues = Array.from(new Set(data.map(item => item.sort)));
        // setSort(sortValues);
        // const defaultActiveIndex = sortValues.indexOf('住宿');
        // setSelected([defaultActiveIndex]);
        if (mapRef.current) {
            const map = mapRef.current;
            // 监听mapRef的变化，执行map.flyTo操作
            map.flyTo(center, 16); // 设置默认的中心位置和缩放级别
        }
    }, [mapRef, center]);
    return (
        <div style={{ marginTop: '3rem' }}>

            <MapContainer center={changeCenter} zoom={16} scrollWheelZoom={true} ref={mapRef} style={{ height: '60vh', width: '50vw' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <WMSTileLayer url={wmsURL} {...wmsLayerParams} />

                {landmarks.map((marker, index) => (
                    <Marker key={index} position={marker.position} icon={markerIcon} >
                        <Popup >
                            <div>
                                <p>{marker.name}</p>
                                <img src={marker.img} alt={marker.name} style={{ width: '10rem', cursor: 'pointer' }} />
                            </div>
                        </Popup>
                    </Marker>

                ))}
                <Polyline pathOptions={limeOptions} positions={landmarks.map(landmark => landmark.position)} />
            </MapContainer>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {landmarks.map((landmark, index) => (
                    <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', margin: '10px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={landmark.img} alt={landmark.name} style={{ height: '5rem' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
                            <p style={{ backgroundColor: '#f2f9fa' }}>{landmark.name}</p>
                            <p style={{ backgroundColor: '#f2f9fa', fontSize: '0.8rem' }}>抵達時間:{landmark.arrivalTime}</p>
                            <p style={{ backgroundColor: '#f2f9fa', fontSize: '0.8rem' }}>備註:{landmark.note}</p>
                        </div>

                    </div>

                ))}
            </div>

        </div>

    );
}