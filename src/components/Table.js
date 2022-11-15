import React, { useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Dropdown} from './Dropdown';



function createData(name, number, time, clazz, pax) {
  return { name, clazz, number, time, pax};
}

export function AutoXTable({eventData, event}) {

    const [view, setView] = React.useState('PAX');
    const [rows, setRows] = React.useState(eventData.results.map(row => {
        return createData(row.name, row.number, row.time*1, row.class, row.pax);
    }));

    useEffect(() =>{
        if (view === 'PAX'){
            setRows(eventData.results.map(row => {
                return createData(row.name, row.number, row.time*1, row.class, row.pax);
            }));
        } else if (view === 'RAW'){
            
            setRows(eventData.results.map(row => {
                return createData(row.name, row.number, row.time/row.pax, row.class, row.pax);
            }).sort((a, b) => a.time - b.time));
        } else {
            console.log(view,'view')
            setRows(eventData.results.map(row => {
                return createData(row.name, row.number, row.time/row.pax, row.class, row.pax);
            }).sort((a, b) => a.time - b.time).filter(row => row.clazz === view));
        }
    }, [view])


    let position = 0;
    return (
        <React.Fragment>
            <h1>{event}</h1>
            <Dropdown clazzes={eventData.views} onChange={setView} view={view}/>  
            <TableContainer component={Paper}>
                <div>
                    <Table className aria-label="simple table" >
                        <TableHead >
                            <TableRow style={{ background : "gray"}}>
                                <TableCell style={{ width: 25, color:"white" }} align="left">Position</TableCell>
                                <TableCell style={{ color : "white"}} >Name</TableCell>
                                <TableCell style={{ color : "white"}} align="left">Class</TableCell>
                                <TableCell style={{ color : "white"}} align="left">Number</TableCell>
                                <TableCell style={{ color : "white"}} align="left">Time</TableCell>
                                <TableCell style={{ color : "white"}} align="left">PAX</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row,index) => {
                                position++;
                                return (
                                <TableRow style ={ index % 2 ? { background : "#f2f2f2" }: {}    }>
                                    <TableCell align="left">{position}</TableCell>
                                    <TableCell onClick component="th" scope="row">
                                        <a style={{color:"blue"}}href={`/?driver=${row.name}`}>{row.name}</a>
                                    </TableCell>
                                    <TableCell onClick={()=>{setView(row.clazz)}}style={{color:"blue", cursor:"pointer"}} align="left">{row.clazz}</TableCell>
                                    <TableCell align="left">{row.number}</TableCell>
                                    <TableCell align="left">{row.time.toFixed(3)}</TableCell>
                                    <TableCell align="left">{row.pax}</TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
        </React.Fragment>
    );
}