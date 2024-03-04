import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MapForSelected from "../MapForSelected";


export default function ScheduleMap() {
    const { scheduleName } = useParams();
    const [center, setCenter] = useState([25.023109556766478, 121.54478523211158]);

    //點擊圖片使該marker置中
    const mapRef = useRef(null);

    const selectedSchedule = useSelector(state =>
        state.favorite.schedules.find(schedule => schedule.scheduleName === scheduleName)
    );


    useEffect(() => {
        // 在城市改變時設定中心點
        // setCenter(cityCenters[city] || cityCenters.Taipei);
        console.log('mapRef',mapRef);
        console.log('center',center);
        // 检查行程中是否有地标，并取出第一个地标的坐标
        if (selectedSchedule.landmarks.length > 0) {
            const firstLandmark = selectedSchedule.landmarks[0];
            // 假设每个地标的坐标存储在 coords 属性中
            const firstLandmarkCoords = firstLandmark.position;
            // 更新地图中心点为第一个地标的坐标
            setCenter(firstLandmarkCoords);
            console.log('firstLandmarkCoords',firstLandmarkCoords);
        }
    }, [scheduleName])

    return (
        <div>
            <MapForSelected mapRef={mapRef} center={center} scheduleName={scheduleName}/>
            <Link to="/"><button>返回</button></Link>
        </div>
    );
}