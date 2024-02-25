import { useState } from "react";
import { Modal, Button, Input, Space, DatePicker, Form } from "antd";
import { useDispatch ,useSelector} from "react-redux";
import { addScheduleItems } from "./redux/scheduleSlice";
import { addFavItems } from "./redux/favoriteSlice";
import { Schedule } from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid';
export default function ScheduleModal({ isOpen, toggleModal }) {
    const { RangePicker } = DatePicker;
    const handleCancel = () => { toggleModal(!isOpen); console.log(isOpen) };
    const [time, setTime] = useState('');
    const landmarks=[];
    const timeChange = (date, dateString) => {
        setTime(dateString);
    };
    const [scheduleName, setScheduleName] = useState('');
    const nameChange = (name) => {
        setScheduleName(name);
    }
    const existingSchedules = useSelector(state => state.schedule.schedules);

    const dispatch = useDispatch();
    const addToSchedule = () => {
        dispatch(addScheduleItems({
            scheduleName: scheduleName,
            time: time,
        }));
        console.log('Action dispatched');
    }

    const onFinish = (values) => {
        console.log('success:', values);
            // If not a duplicate, dispatch the action
            dispatch(addFavItems({
                scheduleId: uuidv4(),
                scheduleName: scheduleName,
                time: time,
                landmarks
            }));
            dispatch(addScheduleItems({
                scheduleName: scheduleName,
                time: time,
            }));
        console.log('Action dispatched');
        handleCancel();
    };
    // const onFinish = (values) => {
    //     console.log('Success:', values);
    //   };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        console.log(time);
    };
    return (
        <Modal
            title="新增行程"
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
        >
            {/* <Space.Compact
                direction="vertical"
                style={{
                    width: '80%',
                }}
            >
                <Input placeholder="輸入名稱" onChange={(e) => nameChange(e.target.value)}/>
                <RangePicker onChange={timeChange}/>
                <Button type="primary" style={{ width: '40%' }}onClick={addToSchedule}>建立行程</Button>
            </Space.Compact> */}

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="scheduleName"
                    label="行程"
                    tooltip="幫行程命名吧!"
                    rules={[
                        {
                            required: true,
                            message: "請為他取個名字!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input onChange={(e) => nameChange(e.target.value)} />
                </Form.Item>
                <Form.Item
                    name="scheduleDate"
                    label="日期"
                    tooltip="訂個日期!"
                    
                >
                    <RangePicker onChange={timeChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{ width: '40%' }} htmlType="submit">建立行程</Button>
                </Form.Item>


            </Form>

        </Modal>
    );
}