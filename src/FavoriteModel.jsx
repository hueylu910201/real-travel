import { useState } from "react";
import { Modal, DatePicker, Space, TimePicker, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectFavItems } from "./redux/favoriteSlice";
import { removeFavItems } from "./redux/favoriteSlice";
import { selectScheduleItems } from "./redux/scheduleSlice";
import { addScheduleItems } from "./redux/scheduleSlice";

export default function FavoriteModel({ isOpen, toggleModal, selectedCategory }) {
    const dispatch = useDispatch();
    const favItems = useSelector(selectFavItems);
    const handleCancel = () => { toggleModal(!isOpen); console.log(isOpen) };
    const [selectedTrip, setSelectedTrip] = useState(''); // 儲存選擇行程的狀態

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
        state.favorite.schedules.find(schedule => schedule.scheduleName === selectedTrip)
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
                landmarks.map((item, index) => (
                    <li key={index}>
                        <div style={{ display: 'flex', alignItems: 'center' ,margin:'1rem'}}>
                            <img src={item.img} alt={item.name} style={{ height: '7rem' }} />
                            <div style={{marginLeft:'0.5rem'}}>
                                <div style={{ display: 'flex' }}>
                                    <a style={{ fontSize: '1rem' }}>{item.name}</a>
                                    <div style={{ fontSize: '1rem' }} onClick={() => dispatch(removeFavItems({ scheduleName: selectedTrip, landmarkName: item.name }))}>
                                        x
                                    </div>
                                </div>

                                <Space direction="vertical" size={12}>
                                    <DatePicker onChange={startTimeChange} picker="time" />
                                    <Input/>
                                </Space>
                            </div>

                        </div>

                    </li>
                ))
            )}
            <Button onClick={changeDuringTime} style={{display:'flex',justifyContent:'flex-end'}}>儲存</Button>
        </Modal>
    );
}