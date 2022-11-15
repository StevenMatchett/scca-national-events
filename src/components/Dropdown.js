import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export const Dropdown = ({clazzes, onChange, view}) => {

  return (
      <FormControl style={{width:"400px", margin:"2em"}} >
        {/* <Select value={dropdown}> */}
        <Select value={view} onChange={(e)=>{

            onChange(e.target.value)
        }}>
            {clazzes.map(cl => {
                return <MenuItem value={cl}>{cl.toUpperCase()}</MenuItem>
            })}
        </Select>
      </FormControl>
  );
};