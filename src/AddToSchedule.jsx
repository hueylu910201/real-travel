import { useDispatch } from "react-redux";
import { addScheduleItems } from "./redux/scheduleSlice";
export default function AddToSchedule(){
    const dispatch=useDispatch();
    const addToSchedule =() =>{
        dispatch(addScheduleItems({
            
        }))
    }
    return(
        <div>
            
        </div>
    );
}