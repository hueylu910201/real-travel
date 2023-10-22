import { useState } from "react";
import { Modal, DatePicker, Space, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectFavItems } from "./redux/favoriteSlice";
import { removeFavItems } from "./redux/favoriteSlice";

export default function FavoriteModel({ isOpen, toggleModal }) {
    const dispatch = useDispatch();
    const favItems = useSelector(selectFavItems);
    const handleCancel = () => { toggleModal(!isOpen); console.log(isOpen) };

    const [startTime, setStartTime] = useState(null);
    const [endtTime, setEndTime] = useState(null);

    const startTimeChange = (date, dateString) => {
        setStartTime(dateString);
    };
    const endTimeChange = (date, dateString) => {
        setEndTime(dateString);
    };
    return (
        <Modal
            title="收藏景點"
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
        >
            {favItems.length === 0 ? (<div>無收藏景點</div>) : (
                favItems.map(item => (
                    <li key={item.name}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={item.img} alt={item.name} style={{ height: '7rem' }} />
                            <div>
                                <div style={{ display: 'flex' }}>
                                    <a style={{ fontSize: '1rem' }}>{item.name}</a>
                                    <div style={{ fontSize: '1rem' }} onClick={() => dispatch(removeFavItems(item.name))}>
                                        x
                                    </div>
                                </div>

                                <Space direction="vertical" size={12}>
                                    <DatePicker onChange={startTimeChange} picker="time" />
                                </Space>
                                <p>起始時間:{startTime}</p>

                                <Space direction="vertical" size={12}>
                                    <DatePicker onChange={endTimeChange} picker="time" />
                                </Space>
                                <p>結束時間:{endtTime}</p>
                            </div>

                        </div>

                    </li>
                ))
            )}

        </Modal>
    );
}