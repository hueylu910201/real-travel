import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '30%' }}>
                <Link to="/MapView/city/Taipei">
                    <button style={{ fontSize: '2rem', margin: '0 10px' }}>台北</button>
                </Link>
                <Link to="/MapView/city/NewTaipei">
                    <button style={{ fontSize: '2rem', margin: '0 10px' }}>新北</button>
                </Link>
            </div>
        </div>

    );
}