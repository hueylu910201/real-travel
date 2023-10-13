import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Map from "../Map";
import SearchBar from "../SearchBar";
import DistrictDropdown from "../DistrictDropdown";
import data from "../Data.json";


export default function MapView() {
    const { city } = useParams();
    const [center, setCenter] = useState([25.023109556766478, 121.54478523211158]);
    const cityCenters = {
        NewTaipei: [25.054605149037315, 121.48990351850277],
        Taipei: [25.023109556766478, 121.54478523211158],
    };
    const filteredData = data.filter(item => item.city === city);
    // console.log(city);

    //點擊圖片使該marker置中
    const mapRef = useRef(null);
    const onSearchResult = (searchItem) => {
        const marker = data.find(item => item.name.toLowerCase() === searchItem.toLowerCase());
        if (marker && mapRef.current) {
            const map = mapRef.current;
            map.flyTo(marker.position, 16);
        }
    }

    //下拉選單district
    const handleDistrictChange = (districtCoords) => {
        if (mapRef.current) {
            const map = mapRef.current;
            map.flyTo(districtCoords, 16);
        }
    }

    useEffect(() => {
        // 在城市改變時設定中心點
        setCenter(cityCenters[city] || cityCenters.Taipei);
    }, [city, mapRef])

    return (
        <div>
            <SearchBar placeholder="尋找店家" data={data} onSearchResult={onSearchResult} />
            <Map mapRef={mapRef} data={filteredData} center={center} city={city} />
            <DistrictDropdown city={city} onDistrictChange={handleDistrictChange}/>
            <Link to="/"><button>返回</button></Link>
        </div>
    );
}