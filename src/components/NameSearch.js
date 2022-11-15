import { useEffect, useMemo, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import {Link} from 'react-router-dom';

export const SearchByName = () => {
    const [selected, setSelected] = useState(null);
    const [driverData, setDriverData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/scca-national-events/driversEvents.json');
            const data = await response.json();
            setDriverData(data);
            const {driver} = document.location.search
                .slice(1)
                .split('&')
                .map(p => p.split('='))
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
                console.log(driver)
            if (driver){

                setSelected(data[decodeURI(driver)]);
            }
        }
        fetchData();
        
    }, [])
    const items = useMemo(() => {
        if (!driverData) return [];
        return Object.keys(driverData).map((driver, index) => {
            return { id: index, name: driver }
        })
    }, [driverData.length]);

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item.name)
        setSelected(driverData[item.name]);
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }
    return (
        <>
            <ReactSearchAutocomplete
                items={items}
                onSelect={handleOnSelect}
                autoFocus
                formatResult={formatResult}
            />
            {selected && (
                <div>
                  <h2>Events</h2>
                  <ul>
                    {selected.map((event) => (
                        <li><Link to={`/scca-national-events/event?eventName=${event}`}>{event}</Link></li>
                    ) )}
        
                  </ul>
                </div>
            )}
        </>
    )

}