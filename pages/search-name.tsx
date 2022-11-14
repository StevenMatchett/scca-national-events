import { useEffect, useState } from "react";
import { SearchByName } from "../src/components/searchByName";

const SearchName = () => {
    const [driverData, setDriverData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/driversEvents.json');
            const data = await response.json();
            setDriverData(data);
        }
        fetchData();
        
    }, [])
    
    return <SearchByName driverData={driverData} />
}


export default SearchName;