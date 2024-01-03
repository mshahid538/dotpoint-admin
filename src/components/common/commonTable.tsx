import React from 'react'
import PaperContainer from './PaperContainer'
import { Box, Button, Divider, Grid, IconButton, Paper, Typography, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from "tss-react/mui";
import Assets from './image_container';

const useStyles = makeStyles()((theme) => {
    return {
        maritBox: {
            color: 'red'
        },
    };
});

function CustomTableHeader({ headerLabels }: any) {
    return (
        <TableHead>
            <TableRow>
                {headerLabels.map((label: any) => (
                    <TableCell key={label} align="left" style={{ color: "#0099CB", fontSize: "16px", fontWeight: 600 }}>
                        {label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const CommonTable = ({ content, headerLabels }: any) => {
    const { classes } = useStyles();
    return (
        <>
            <PaperContainer style={{ padding: '15px' }} title={"Billing"} >
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <CustomTableHeader headerLabels={headerLabels} />
                        <TableBody>
                            {content?.map((row: any) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.pay}
                                    </TableCell>
                                    <TableCell align="left" >
                                        <Box>{row.challenge}</Box>
                                        <Box>{row.challeng1}</Box>
                                    </TableCell>
                                    <TableCell align="left">{row.dates}</TableCell>
                                    <TableCell align="left">{row.amount}</TableCell>
                                    <TableCell align="left">{row.amout1}</TableCell>
                                    <TableCell align="left">
                                        <Button variant="contained" style={{ backgroundColor: "#91D14F" }}>Paid</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Assets src={"/assets/icons/invoice.svg"} absolutePath={true} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PaperContainer>
        </>
    )
}

export default CommonTable