import { useEffect, useMemo, useState } from "react";
import { AutoXTable } from "./Table";

export const Event = () => {
    const [eventData, setEventData] = useState(null);
    const [event, setEvent] = useState(null);
    useEffect(() =>{
        const {eventName} = document.location.search
            .slice(1)
            .split('&')
            .map(p => p.split('='))
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
        setEvent(eventName)
        const url = '/scca-national-events/' + eventName.replace('-', '/') + '.json'
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setEventData(data);
        }
        fetchData()
    }, [])

    if (!eventData) return null;

    return <AutoXTable eventData={eventData} event={event} />;
}