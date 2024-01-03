import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
    return {
        main: {
            // background: "#36373B",
            // minWidth: "50px",
            // border: 'none !important',
            "& .MuiInputBase-input": {
                height: "22px",
                fontSize:'14px'
            },
            "& .MuiInputBase-fullWidth": {
                fontSize: "14px",
                fontFamily: "Poppins",
            },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#EEEEEE ",
                borderRadius: "10px",
            },
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "#EEEEEE",
                    borderRadius: "10px",
                },
                "&:hover fieldset": {
                    borderColor: "#EEEEEE",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "#EEEEEE",
                },
            },
            "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#EEEEEE", // Set the border color for hover
                },
            },
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#EEEEEE", // Set the border color for focus
                },
            },
        },
        error: {
            // border: "1px solid green",
        },
        noBorder: {
            // border: "none",
        },

        inputLight: {
            color: "#FFFFFF",
        },
        label: {
            // color: '#FFFFFF',
        },
    };
});
export default function SearchInput({
    placeholder,
    variant,
    size,
    inputProps = {},
    autoFocus,
    startAdornment,
    endAdornment,
    fullWidth,
    className,
    ...props
}: any) {
    const router = useRouter();
    const { query }: any = router;
    const { classes } = useStyles();

    const [searchTerm, setSearchTerm] = React.useState("");
    const [timer, setTimer] = React.useState<any>(0);
    const WAIT_INTERVAL = 500;
    const ENTER_KEY = 13;
    const handleClear = (e: any) => {
        setSearchTerm("");
        props.handleSearch && props.handleSearch("");
    };

    return (
        <Box display="flex" alignItems="center">
            <TextField
                color="primary"
                onChange={(ev) => {
                    setSearchTerm(ev.target.value);
                    let val = (ev.target.value || "").trim();
                    clearTimeout(timer);
                    setTimer(
                        setTimeout(() => {
                            props.handleSearch && props.handleSearch(val);
                        }, WAIT_INTERVAL)
                    );
                }}
                autoFocus={autoFocus}
                value={searchTerm}
                size={size || "medium"}
                className={`${classes?.main} ${className}`}
                type="text"
                inputProps={{ maxLength: 50, ...inputProps }}
                placeholder={placeholder || "Search"}
                InputProps={{
                    startAdornment: null,
                    endAdornment: endAdornment ? (
                        endAdornment
                    ) : (
                        <InputAdornment position="end" sx={{ opacity: searchTerm ? 1 : 0 }}>
                            <IconButton style={{ padding: 0 }} onClick={handleClear}>
                                <ClearIcon fontSize="small" color="disabled" />
                            </IconButton>
                        </InputAdornment>
                    ),
                    // sx: { bgcolor: "#fff" },
                    classes: {
                        notchedOutline: classes.noBorder,
                    },
                }}
                variant={variant || "standard"}
                fullWidth={fullWidth}

            />
        </Box>
    );
}
