import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Map from "../Map";
import SearchBar from "../SearchBar";
import data from "../Data.json";


export default function MapView() {
    const { city } = useParams();
    const [center, setCenter] = useState([25.023109556766478, 121.54478523211158]);
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

    useEffect(() => {
        if (city === 'NewTaipei') {
            setCenter([25.054605149037315, 121.48990351850277]);
        }
        else if (city === 'Taipei') {
            setCenter([25.023109556766478, 121.54478523211158]);
        }
    }, [city, mapRef])

    return (
        <div>
            <SearchBar placeholder="尋找店家" data={data} onSearchResult={onSearchResult} />
            <Map mapRef={mapRef} data={filteredData} center={center} city={city}/>
            <Link to="/"><button>返回</button></Link>
        </div>
    );
}