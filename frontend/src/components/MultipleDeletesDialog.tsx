import React, {useState} from "react";
import DeleteModal from "./DeleteModal";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteCustomer} from "../api-service/customer-service";

export const MultipleDeletesDialog = React.forwardRef((props: { selected: readonly string[] }, ref) => {
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);

        const handleDelete = () => {
            props.selected.forEach(customerId => {
                deleteCustomer(customerId)
                    .then(r => console.log(r.status))
                    .then(() => {
                        window.location.reload();
                    });
            });
        }

        return (
            <>
                <IconButton onClick={handleOpen}>
                    <DeleteIcon/>
                </IconButton>
                <DeleteModal handleDelete={handleDelete} open={open} setOpen={setOpen}/>
            </>
        )

    }
)