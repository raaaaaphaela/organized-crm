import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Information} from "../../customer-form";
import {useEffect, useState} from "react";

export default function InformationTable({information}: { information?: Information[]}) {
    const [sortedInformation, setSortedInformation] = useState<Information[]>([]);

    useEffect(() => {
        if(information) {
            setSortedInformation(sortInformation(information));
        }
    }, [sortedInformation, information] )

    const sortInformation = (information: Information[]) => {
        return information.sort((a, b) => {
            let dateA = new Date(a.dateTime);
            let dateB = new Date(b.dateTime);
            return dateB.getTime() - dateA.getTime();
        });
    };

    const formatDateTime = (dateTime: string) => {
        if(!dateTime) {
            return "";
        }

        const date = new Date(dateTime);
        let formattedDate = date.toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        return formattedDate.toString();
    }

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
                    {sortedInformation && sortedInformation.map((row) => (
                        <TableRow
                            key={row.dateTime + row.content}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell width="20%" align="left">{formatDateTime(row.dateTime)}</TableCell>
                            <TableCell width="60%" align="left" sx={{ wordWrap: 'break-word'}}>{row.content}</TableCell>
                            <TableCell width="20%" align="left">{row.username}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}