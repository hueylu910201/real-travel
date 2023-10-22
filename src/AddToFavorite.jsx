import { Button } from "antd";
import { useDispatch } from "react-redux";
import { addFavItems } from "./redux/favoriteSlice";
export default function AddToFavorite({ data }) {
    console.log(data);
    const dispatch = useDispatch();

    const addToFav = () => {
        dispatch(addFavItems({
            city: data.city,
            name: data.name,
            img: data.img,
            qty:1,
        }));
        console.log('Action dispatched');
    }
    return (
        <Button onClick={addToFav}>
            加入收藏
        </Button>
    );
}