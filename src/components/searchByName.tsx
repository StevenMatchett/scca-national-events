import { useMemo, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

type Item = {
    id: number;
    name: string;
}

export const SearchByName = ({ driverData }: any) => {
    const [selected, setSelected] = useState<any>(null);
    const items = useMemo(() => {
        if (!driverData) return [];
        return Object.keys(driverData).map((driver: any, index: number) => {
            return { id: index, name: driver }
        })
    }, [driverData.length]);

    const handleOnSelect = (item: Item) => {
        // the item selected
        setSelected(driverData[item.name]);
    }

    const formatResult = (item: Item) => {
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
            {selected && JSON.stringify(selected)}
        </>
    )

}