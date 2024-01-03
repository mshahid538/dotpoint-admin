import { Box, Checkbox, FormControlLabel, Typography, useTheme } from "@mui/material";
import TextLabel from "./commonTextLabel";

const OutlinedCheckbox = ({
    label,
    selected,
    handleSelect,
    value,
    name,
    defaultChecked,
    color,
    error
}: any) => {
    const theme = useTheme();
    return (
        <Box display="flex" mb={0.4} borderRadius="5px" color={selected ? theme.palette.primary.main : 'gray'}>
            <FormControlLabel
                control={
                    <Checkbox
                        sx={{
                            mr: 0,
                            margin: "0 !important",
                            marginLeft: 1,
                            "& .MuiSvgIcon-root": {
                                fontSize: 25,
                                color: error ? "#EF627A" : "#cdcdcd",
                                margin: '0px'
                            },
                            "& .MuiFormControlLabel-root": {
                                margin: '0px'
                            },
                            "&.Mui-checked .MuiSvgIcon-root": {
                                color: "#0099CB",
                            },
                        }}
                    
                        onChange={handleSelect}
                        value={value}
                        name={name}
                        checked={selected}
                        defaultChecked={defaultChecked}
                    />
                }
                label={ <TextLabel variant="body1" color={color||'white'} title={label} />}
            />
        </Box>
    );
};

export default OutlinedCheckbox;
