import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, DatePicker, Space, TimePicker, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectFavItems } from "./redux/favoriteSlice";
import { removeFavItems } from "./redux/favoriteSlice";
import { selectScheduleItems } from "./redux/scheduleSlice";
import { updateLandmarks } from "./redux/favoriteSlice";
import { updateLandmarkOrder } from "./redux/favoriteSlice";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import dayjs from "dayjs";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function FavoriteModel({ isOpen, toggleModal, selectedCategory }) {
    const dispatch = useDispatch();
    const favItems = useSelector(selectFavItems);
    const handleCancel = () => { toggleModal(!isOpen); console.log(isOpen) };
    const [selectedTrip, setSelectedTrip] = useState(''); // 儲存選擇行程的狀態
    const [localLandmarks, setLocalLandmarks] = useState([]);
    const [arriveTime, setArriveTime] = useState(moment());
    const [note, setNote] = useState(null);
    const [landmarkId, setLandmarkId] = useState('');
    const droppableId = uuidv4();

    const scheduleItem = useSelector(selectScheduleItems) || [];
    const handleCategoryChange = (event) => {
        const newTrip = event.target.value;
        setSelectedTrip(newTrip);
        console.log(scheduleItem);
    };

    // const CheckName = (landmark) => {
    //     console.log(landmark);
    // }

    const selectedSchedule = useSelector(state =>
        state.favorite.schedules.find(schedule => schedule.scheduleName === selectedTrip)
    );
    const landmarks = selectedSchedule ? selectedSchedule.landmarks : [];//行程內的景點

    // useEffect(() => {
    //     // 初始化本地地標數據
    //     if (favItems && favItems.length > 0) {
    //         setLocalLandmarks(favItems.map(landmark => ({
    //             ...landmark,
    //             localArrivalTime: landmark.arrivalTime,
    //             localNote: landmark.note
    //         })));
    //     }
    //     console.log("landmarks", landmarks);
    // }, [favItems]);

    const handleLocalTimeChange = (time, timeString, id) => {
        // 更新本地地標的抵達時間
        setArriveTime(timeString);
        setLandmarkId(id);
    };

    const handleLocalNoteChange = (event) => {
        // 更新本地地標的備註
        setNote(event.target.value);
    };

    const handleSave = () => {
        // 批量更新地標的抵達時間和備註
        dispatch(updateLandmarks({ landmarkId: landmarkId, arriveTime: arriveTime, note: note }));
        setArriveTime('');
        setLandmarkId('');
        setNote('');
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const items = Array.from(landmarks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        // items.forEach(item => {
        //     // 確保 arrivalTime 存在並且是有效的日期字符串
        //     if (item.arriveTime && moment(item.arriveTime, moment.ISO_8601, true).isValid()) {
        //         console.log('Valid date:', item.arriveTime);
        //     } else {
        //         console.error('Invalid date found:', item);
        //         // 處理無效日期，例如設置為默認值或提示錯誤
        //     }
        // });
        dispatch(updateLandmarkOrder({ scheduleName: selectedTrip, newLandmarks: items }));
        // setLandmarks(items);
        // 这里你可能还需要更新你的全局状态或后端，以反映更改
    };

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
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={droppableId}>
                    {(provided) => (
                        <div  {...provided.droppableProps} ref={provided.innerRef}>
                            {favItems.length === 0 ? (<div>無收藏景點</div>) : (
                                landmarks.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <li key={index}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', margin: '1rem', backgroundColor: '#e6edf7' }}>
                                                    <img src={item.img} alt={item.name} style={{ height: '8rem', margin: '0.5rem' }} />
                                                    <div style={{ marginLeft: '0.5rem' }}>
                                                        <div style={{ display: 'flex' }}>
                                                            <a style={{ fontSize: '1rem' }}>{item.name}</a>
                                                            <div style={{ fontSize: '1rem' }} onClick={() => dispatch(removeFavItems({ scheduleName: selectedTrip, landmarkName: item.name }))}>
                                                                x
                                                            </div>
                                                        </div>

                                                        <Space direction="vertical" size={12}>
                                                            <TimePicker
                                                                defaultValue={item.arrivalTime ? dayjs(item.arrivalTime, "HH:mm") : undefined}
                                                                onChange={(time, timeString) => handleLocalTimeChange(time, timeString, item.id)}
                                                                format="HH:mm"
                                                            />
                                                            <Input
                                                                defaultValue={item.note}
                                                                onChange={(event) => handleLocalNoteChange(event, item.id)}
                                                            />
                                                        </Space>
                                                        <Button onClick={handleSave} style={{ display: 'flex', justifyContent: 'flex-end' }}>儲存</Button>
                                                    </div>

                                                </div>

                                            </li>
                                        )}

                                    </Draggable>

                                ))
                            )}
                            <Link to={`/MapView/schedule/${selectedTrip}`}>
                                <div>查看行程座標</div>
                            </Link>
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>
            </DragDropContext>


        </Modal>



        // <Modal
        //     title="收藏景點"
        //     open={isOpen}
        //     onCancel={handleCancel}
        //     footer={null}
        // >
        //     <select value={selectedTrip} onChange={handleCategoryChange}>
        //         <option value="">選擇類別</option>
        //         {scheduleItem.map((item, index) => (
        //             <option key={index} value={item.scheduleName}>{item.scheduleName}</option>
        //         ))}
        //     </select>
        //     {favItems.length === 0 ? (<div>無收藏景點</div>) : (
        //         landmarks.map((item, index) => (
        //             <li key={index}>
        //                 <div style={{ display: 'flex', alignItems: 'center', margin: '1rem', backgroundColor: '#e6edf7' }}>
        //                     <img src={item.img} alt={item.name} style={{ height: '8rem', margin: '0.5rem' }} />
        //                     <div style={{ marginLeft: '0.5rem' }}>
        //                         <div style={{ display: 'flex' }}>
        //                             <a style={{ fontSize: '1rem' }}>{item.name}</a>
        //                             <div style={{ fontSize: '1rem' }} onClick={() => dispatch(removeFavItems({ scheduleName: selectedTrip, landmarkName: item.name }))}>
        //                                 x
        //                             </div>
        //                         </div>

        //                         <Space direction="vertical" size={12}>
        //                             <TimePicker
        //                                 defaultValue={item.arrivalTime}
        //                                 onChange={(time, timeString) => handleLocalTimeChange(time, timeString, item.id)}
        //                             />
        //                             <Input
        //                                 defaultValue={item.note}
        //                                 onChange={(event) => handleLocalNoteChange(event)}
        //                             />
        //                         </Space>
        //                         <Button onClick={handleSave} style={{ display: 'flex', justifyContent: 'flex-end' }}>儲存</Button>
        //                     </div>

        //                 </div>

        //             </li>

        //         ))
        //     )}
        // </Modal>
    );
}