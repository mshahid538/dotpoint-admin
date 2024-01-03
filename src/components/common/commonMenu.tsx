import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { makeStyles } from "tss-react/mui";
import TextLabel from './commonTextLabel';

const useStyles = makeStyles()((theme) => {
  return {
    MenuTitle: {
      textTransform: "capitalize",
      fontSize: "14px",
      fontWeight: "600",
      transition: "0.3s ease",
      color: "white",
      '&:hover': {
        color: 'blue',
      },
    },
    MenuItemsTitle: {
      fontSize: "12px",
      padding: "8px 16px 8px 0px"
    },
    MenuBox: {
      display: "flex",
      alignItems: "center",
      cursor: 'pointer',
      gap: "20px",
    },
    menuPaper: {
      backgroundColor: "#111",
      color: '#FFFFFF',
      '& .MuiMenu-list li:hover': {
        backgroundColor: '#FFFFFF0D',
        borderRight: '3px solid blue',

      }
    }
  };
});

interface CommonMenuProps {
  menuItems: Array<{ label: string; linkTo: string; items?: Array<{ itemText: string }> }>;
  menuTitle: string;
}

const CommonMenu: React.FC<CommonMenuProps> = ({ menuItems, menuTitle }) => {
  const [anchorEl, setAnchorEl] = useState<any | HTMLElement[]>(Array(menuItems.length).fill(null));
  const { classes } = useStyles();

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleMouseLeave = (index: number) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  };

  const handleClose = (index: number) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  };

  return (
    <Box className={classes.MenuBox}  >
      {menuItems.map((item, index) => (
        <>
          {item.items && item.items.length > 0 ?
            <Box key={index} onMouseEnter={(e) => handleMouseEnter(e, index)} onMouseLeave={() => handleMouseLeave(index)}>

              <Button
                className={classes.MenuTitle}
                color="primary"
                endIcon={<KeyboardArrowDownIcon />}
              >
                {item.label}
              </Button>
              <Menu
                anchorEl={anchorEl[index]}
                open={Boolean(anchorEl[index])}
                onClose={() => handleClose(index)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                classes={{ paper: classes.menuPaper }}
              >
                {item.items && item.items.map((subItem, subIndex) => (
                  <MenuItem key={subIndex} onClick={() => handleClose(index)}>
                    <TextLabel className={classes.MenuItemsTitle} title={subItem.itemText} />
                  </MenuItem>
                ))}
              </Menu>
            </Box> :
            <TextLabel className={classes.MenuTitle} title={item.label} />
          }
        </>
      ))}
    </Box>
  );
};

export default CommonMenu;
