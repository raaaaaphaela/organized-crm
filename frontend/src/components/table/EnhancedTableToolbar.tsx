import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import {ChangeEventHandler} from "react";
import {TextField} from "@mui/material";
import {MultipleDeletesDialog} from "../MultipleDeletesDialog";

interface EnhancedTableToolbarProps {
    numSelected: number,
    selected: readonly string[],
    handleInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const {
        numSelected,
        selected,
        handleInput
    } = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                py: 2,
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} ausgewählt
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Alle Kunden
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <MultipleDeletesDialog selected={selected}/>
                </Tooltip>
            ) : (
                <TextField
                    id="outlined-basic"
                    label="Suchen"
                    variant="outlined"
                    sx={{mr: 3}}
                    onChange={handleInput}/>
            )}
        </Toolbar>
    );
}