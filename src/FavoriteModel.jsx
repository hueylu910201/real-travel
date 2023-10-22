import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectFavItems } from "./redux/favoriteSlice";
import { removeFavItems } from "./redux/favoriteSlice";

export default function FavoriteModel({ isOpen, toggleModal }) {
    const dispatch = useDispatch();
    const favItems = useSelector(selectFavItems);
    const handleCancel = () => toggleModal(!isOpen);
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
                            <a style={{ fontSize: '1.5rem' }}>{item.name}</a>
                            <div onClick={() => dispatch(removeFavItems(item.name))}>
                                x
                            </div>
                        </div>

                    </li>
                ))
            )}

        </Modal>
    );
}