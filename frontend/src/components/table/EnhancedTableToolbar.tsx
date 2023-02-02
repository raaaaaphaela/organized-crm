import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import * as React from "react";
import {deleteCustomer} from "../../api-service/customer-service";
import {TextField} from "@mui/material";
import {ChangeEventHandler} from "react";

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

    const handleDelete = () => {
        selected.forEach(customerId => {
            deleteCustomer(customerId)
                .then(r => console.log(r.status))
                .then(() => {
                    window.location.reload();
                });
        });
    }

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pt: 2,
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
                    {numSelected} selected
                </Typography>
            ) : (
                <>
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Kundenübersicht
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Suchen"
                        variant="outlined"
                        sx={{mr: 3}}
                        onChange={handleInput}/>
                </>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}