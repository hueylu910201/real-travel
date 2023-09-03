import { useParams } from "react-router-dom";
import MapDetail from "../MapDetail";
import location from "../Data.json";

export default function Location(){
    const { name } = useParams();
    const data = location.find((x)=>x.name ===name);
    return(
        <MapDetail data={data}/>
    );
}