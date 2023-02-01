import React, {ChangeEvent} from "react";
import {Input} from "@mui/material";

export default function FileUpload({setFile}: { setFile: Function }) {

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <Input
            sx={{
                ':before': {borderBottom: 'none'},
                ':after': {borderBottomColor: 'none'}
            }}
            type="file"
            required
            onChange={handleFileChange}/>)
}