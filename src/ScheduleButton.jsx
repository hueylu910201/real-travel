import { FloatButton } from "antd";
import { useState } from "react";
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import ScheduleModal from "./ScheduleModal";
export default function ScheduleButton() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => { setIsOpen(!isOpen); };
    return (
        <div>
            <nav onClick={toggleOpen}>
                <FloatButton.Group>
                    <FloatButton icon={<CommentOutlined />} />
                </FloatButton.Group>
            </nav>
            <ScheduleModal
                isOpen={isOpen}
                toggleModal={toggleOpen}
            />
        </div>
    );
}