import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Information} from "../../customer-form";

export default function BasicTable({information}: { information?: Information[]}) {
    return (
        <TableContainer component={Paper} sx={{ boxShadow: 4, mt: 1, mb: 3}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Datum</TableCell>
                        <TableCell align="left">Inhalt</TableCell>
                        <TableCell align="left">Wer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {information && information.map((row) => (
                        <TableRow
                            key={row.dateTime + row.content}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell width="20%" align="left">{row.dateTime}</TableCell>
                            <TableCell width="60%" align="left" sx={{ wordWrap: 'break-word'}}>{row.content}</TableCell>
                            <TableCell width="20%" align="left">{row.username}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}