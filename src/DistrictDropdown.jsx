import { useState, useEffect } from "react";
import center from '../src/center.json';

export default function DistrictDropdown({ city ,onDistrictChange}) {
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');

    useEffect(() => {
        if (city in center) {
            setDistricts(Object.keys(center[city].districts));
        }
    }, [city]);

    const handleDistrictChange = (event) => {
        const selected = event.target.value;
        setSelectedDistrict(selected);
        if (onDistrictChange) {
            const districtCoords = center[city].districts[selected];
            onDistrictChange(districtCoords);
        }
    };

    return (
        <div>
            {city}
            <select value={selectedDistrict} onChange={handleDistrictChange}>
                {districts.map((district, index) => (
                    <option key={index} value={district}>
                        {district}
                    </option>
                ))}
            </select>
        </div>
    );
}