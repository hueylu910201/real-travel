import { useState } from "react";
import { Modal, DatePicker, Space, TimePicker, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectFavItems } from "./redux/favoriteSlice";
import { removeFavItems } from "./redux/favoriteSlice";
import { selectScheduleItems } from "./redux/scheduleSlice";
import { addScheduleItems } from "./redux/scheduleSlice";

export default function FavoriteModel({ isOpen, toggleModal, selectedCategory }) {
    const dispatch = useDispatch();
    const favItems = useSelector(selectFavItems);
    const handleCancel = () => { toggleModal(!isOpen); console.log(isOpen) };
    const [selectedTrip, setSelectedTrip] = useState(''); // 新增儲存選擇行程的狀態

    const [duringTime, setDuringTime] = useState(null);
    const [endtTime, setEndTime] = useState(null);

    const startTimeChange = (date, dateString) => {
        setDuringTime(dateString);
    };
    const endTimeChange = (date, dateString) => {
        setEndTime(dateString);
    };

    const changeDuringTime = () => {
        dispatch(addScheduleItems({
            duringTime: duringTime
        }));
    }

    const scheduleItem = useSelector(selectScheduleItems) || [];
    const handleCategoryChange = (event) => {
        const newTrip = event.target.value;
        setSelectedTrip(newTrip);
        console.log(scheduleItem);
    };

    const CheckName = (landmark) => {
        console.log(landmark);
    }

    const selectedSchedule = useSelector(state =>
        state.favorite.schedules.find(schedule => schedule.name === selectedTrip)
    );
    const landmarks = selectedSchedule ? selectedSchedule.landmarks : [];
    return (
        <Modal
            title="收藏景點"
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <select value={selectedTrip} onChange={handleCategoryChange}>
                <option value="">選擇類別</option>
                {scheduleItem.map((item, index) => (
                    <option key={index} value={item.scheduleName}>{item.scheduleName}</option>
                ))}
            </select>
            {favItems.length === 0 ? (<div>無收藏景點</div>) : (
                favItems.filter(item => item.scheduleName === selectedTrip).map((item, index) => (
                    <li key={index}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={item.landmark.img} alt={item.landmark.name} style={{ height: '15rem' }} />
                            <div>
                                <div style={{ display: 'flex' }}>
                                    <a style={{ fontSize: '1rem' }}>{item.landmark.name}</a>
                                    <div style={{ fontSize: '1rem' }} onClick={() => dispatch(removeFavItems(item.landmark.name))}>
                                        x
                                    </div>
                                </div>

                                <Space direction="vertical" size={12}>
                                    <DatePicker onChange={startTimeChange} picker="time" />
                                </Space>
                                <p>起始時間:{duringTime}</p>
                                <Button onClick={changeDuringTime}>儲存</Button>

                                {/* <Space direction="vertical" size={12}>
                                    <DatePicker onChange={endTimeChange} picker="time" />
                                </Space>
                                <p>結束時間:{endtTime}</p> */}
                            </div>

                        </div>

                    </li>
                ))
            )}
        </Modal>
    );
}