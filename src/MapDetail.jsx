import { Link, useParams } from "react-router-dom";


export default function MapDetail({data}) {
    return (
        <div style={{width:'100%'}}>
            <div style={{display:'flex'}}>
                <h2>{data.name}詳細資訊</h2>
            </div>
            <Link to={`/MapView/city/${data.city}`}>
                <button>返回</button>
            </Link>
        </div>
    );
}