import React from 'react';
import { Collapse } from '@mui/material';

const CustomCollapse = ({ in: inProp, children }: any) => {
    return (
        <Collapse in={inProp}>{children}</Collapse>

    );
};

export default CustomCollapse;