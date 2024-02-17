import { useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addFavItems } from "./redux/favoriteSlice";
import { addScheduleItems } from "./redux/scheduleSlice";
import { selectScheduleItems } from "./redux/scheduleSlice";
export default function AddToFavorite({ data }) {
    // console.log(data);
    const dispatch = useDispatch();
    const scheduleItem = useSelector(selectScheduleItems) || [];
    const [selectedSchedule, setSelectedSchedule] = useState('');

    const handleScheduleChange = (event) => {
        const newSchedule = event.target.value;
        setSelectedSchedule(newSchedule);
        console.log(selectedSchedule);
    };

    const addToFav = () => {
        dispatch(addFavItems({
            // id:selectedSchedule,
            // scheduleName:selectedSchedule,
            scheduleName: selectedSchedule,
            landmark: {
                city: data.city,
                name: data.name,
                img: data.img,
                qty: 1,
            },


            // city: data.city,
            // name: data.name,
            // img: data.img,
            // category: selectedSchedule,
            // qty: 1,
        }));
        console.log('Action dispatched');
        const landmarkData = {
            landmarkName: data.name,
            landmarkImg: data.img,
            duringTime: '',
        }
        // dispatch(addScheduleItems({
        //     landmark: [landmarkData],
        // }))
        const isLandmarkInSchedule = scheduleItem.some(item => item.landmark && item.landmark.some(landmark => landmark.name === data.name));

        // 如果该地标不存在于日程中，则添加到日程中
        if (!isLandmarkInSchedule) {
            dispatch(addScheduleItems({
                scheduleName: selectedSchedule,
                landmark: [landmarkData],
            }))
        }
    }
    return (
        <div>
            <select key={selectedSchedule} value={selectedSchedule} onChange={handleScheduleChange}>
                <option value="">選擇類別</option>
                {scheduleItem.map((item, index) => (
                    <option key={index} value={item.scheduleName}>{item.scheduleName || '未命名'}</option>
                ))}
            </select>

            <Button onClick={addToFav}>
                加入收藏
            </Button>
        </div>

    );
}