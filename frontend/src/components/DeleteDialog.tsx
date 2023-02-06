import React, {useState} from "react";
import axios from "axios";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import DeleteModal from "./DeleteModal";

export default function DeleteDialog({id}: {
    id: string,
}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete("/api/customers/" + id);
        } catch (e) {
            console.log(e)
        } finally {
            navigate("/")
        }
    }

    return (
        <div>
            <Button onClick={handleOpen}
                    sx={{
                        mt: 3,
                        ml: 3,
                        color: 'info.main',
                        border: 1,
                        borderColor: 'info.main',
                        "&:hover": {
                            backgroundColor: 'info.main',
                            color: 'white',
                            borderColor: 'info.main'
                        },
                    }}>Löschen</Button>
            <DeleteModal handleDelete={handleDelete} open={open} setOpen={setOpen}/>
        </div>
    )
}