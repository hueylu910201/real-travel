import { Link } from "react-router-dom";

export default function MapItemList({ data, mapRef }) {
    //點擊圖片置中
    const markerClick = (marker) => {
        if (mapRef.current) {
            const map = mapRef.current;
            map.flyTo(marker.position, 16); // You can adjust the zoom level (12) as needed
        }
    };
    return (
        <div style={{ width: '50vw', height: '25vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            {data.map((marker, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={marker.img} alt={marker.name} style={{ width: '10rem' }} onClick={() => markerClick(marker)} />
                    <a>{marker.name}</a>
                    <Link to={ `/MapView/name/${marker.name}`}>
                        <div>查看詳情</div>
                    </Link>
                </div>
            ))}
        </div>
    );
}