import { useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { selectFavItems } from "./redux/favoriteSlice";
import FavoriteModel from "./FavoriteModel";
export default function FavoriteSummary() {
    const [isOpen, setIsOpen] = useState(false)
    const favItems = useSelector(selectFavItems);
    const count = (favItems.length > 0)
        ? favItems.reduce((sum, newItem) => {
            console.log('newItem.qty', newItem.qty);
            return sum + newItem.qty;
        }, 0)
        : 0;

    const toggleOpen = () => { setIsOpen(!isOpen); console.log(favItems); };
    return (
        <div style={{ margin: '1rem' }} onClick={toggleOpen}>
            <Badge count={count}>
                <ShoppingCartIcon />
            </Badge>
            <FavoriteModel
                isOpen={isOpen}
                toggleModal={toggleOpen}
            />
        </div>
    );
}