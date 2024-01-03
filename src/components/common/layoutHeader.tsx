import React from 'react'
import { Box, Divider, Tooltip, Typography, } from "@mui/material";
import MUIButton from './commonButton';
import TextLabel from './commonTextLabel';
import SearchInput from './searchInput';
import CustomTooltip from './customeTooltip';

const LayoutHeader = ({ type, onClick, handleSearch, searchBy }: any) => {
    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} padding={"12px 16px 4px 16px "}>
                {type && <TextLabel fontSize={'16px'} fontWeight={"600"} lineHeight={'24px'} title={type} />}
                <Box display={'flex'} gap={2}>
                    {handleSearch &&
                        <CustomTooltip title={<>
                            <Typography variant="caption">
                                You can search by{" "}
                            </Typography>
                            <Box
                                component="ul"
                                sx={{
                                    marginBlock: 0,
                                    marginInline: 0,
                                    paddingInline: 2,
                                }}
                            >
                                {searchBy?.map((val: any, index: any) => {
                                    return <li key={index}>{val}</li>
                                })}
                            </Box>
                        </>}>
                            <Box>
                                <SearchInput
                                    size="small"
                                    variant="outlined"
                                    placeholder="Search.."
                                    handleSearch={handleSearch}
                                />
                            </Box>
                        </CustomTooltip>
                    }
                    {onClick && <MUIButton
                        fullWidth={true}
                        height="40px"
                        text={`Add ${type}`}
                        onClick={onClick}
                    />}
                </Box>

            </Box>
            <Divider sx={{ marginTop: 1 }} />
        </>
    )
}

export default LayoutHeader