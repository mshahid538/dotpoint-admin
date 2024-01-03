import React from 'react'
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const CommonModal = ({ onClose, open, title, content }: any) => {
    return (
        <Dialog
            fullWidth
            onClose={onClose}
            open={open}
            sx={{ borderRadius: "26px" }}
        >
            <DialogTitle
                fontWeight={700}
                fontSize={16}
                sx={{ borderBottom: "1px solid #cdcdcd" }}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={1}
            >
                {title}
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={30}
                    height={30}
                    borderRadius={2}
                    sx={{ backgroundColor: "#F14336", cursor: "pointer" }}
                    onClick={() => onClose()}
                >
                    <CloseOutlinedIcon sx={{ color: "#fff", fontSize: "18px" }} />
                </Box>
            </DialogTitle>
            {content}
        </Dialog>
    )
}

export default CommonModal