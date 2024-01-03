// import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { lightTheme } from '@redux/theme';
import { useRouter } from 'next/router';
import React from 'react';
import { makeStyles } from "tss-react/mui";
import TextLabel from './commonTextLabel';


const useStyles = makeStyles()((theme) => {
  return {
    breadcrumbMain: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      fontSize: "14px",
      fontWeight: "600"
    },
    lastLabel: {
      color: lightTheme.palette.bgGray.main
    }
  };
});


interface BreadcrumbItem {
  path: string;
  label: React.ReactNode;
  title?:any
}

interface BreadcrumbProps {
  breadcrumb: BreadcrumbItem[];
  description?: string;
  title?:any
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumb, description }) => {
  const router = useRouter();
  const { classes } = useStyles();

  return (
    <>
      <Box sx={{ margin: "0px  0 20px 0" }}>
        {breadcrumb && (
          <Box className={classes.breadcrumbMain} >
            {breadcrumb?.map(({ path, label }, i) => (
              <React.Fragment key={i}>
                <TextLabel color={lightTheme.palette.bgGray.main} title={i > 0 && '/'} />
                {path === router.asPath ? (
                  <TextLabel title={label} />
                ) : i === breadcrumb.length - 1 ? (
                  <Box className={classes.lastLabel}>{label}</Box>
                ) : (
                  <Box >
                    {label}
                  </Box>
                )}
              </React.Fragment>
            ))}
          </Box>
        )}
      </Box>
      {description &&  <TextLabel title={description} /> }
    </>
  );
};

export default Breadcrumb;

