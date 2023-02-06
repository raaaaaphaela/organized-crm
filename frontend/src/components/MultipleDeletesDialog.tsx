import React, {useState} from "react";
import DeleteModal from "./DeleteModal";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteCustomer} from "../api-service/customer-service";

export default function MultipleDeletesDialog({selected}: {
    selected: readonly string[],
}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

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
        <div>
            <IconButton onClick={handleOpen}>
                <DeleteIcon/>
            </IconButton>
            <DeleteModal handleDelete={handleDelete} open={open} setOpen={setOpen}/>
        </div>
    )
}