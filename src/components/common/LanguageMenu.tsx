import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Paper,
  Theme,
  createStyles,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Image from 'next/image';
import cs from '../../Assets/Images/Language_Logo/cs.png';
import de from '../../Assets/Images/Language_Logo/de.png';
import en from '../../Assets/Images/Language_Logo/en.png';
import es from '../../Assets/Images/Language_Logo/es.png';
import france from '../../Assets/Images/Language_Logo/france flag.png';
import it from '../../Assets/Images/Language_Logo/it.png';
import pt from '../../Assets/Images/Language_Logo/pt.png';
import vi from '../../Assets/Images/Language_Logo/vi.png';
import TextLabel from './commonTextLabel';

const countries = [
  { value: 'EN', flag: en },
  { value: 'DE', flag: de },
  { value: 'CZ', flag: cs },
  { value: 'VN', flag: vi },
  { value: 'FR', flag: france },
  { value: 'ES', flag: es },
  { value: 'IT', flag: it },
  { value: 'PT', flag: pt },
];

const useStyles = makeStyles()((theme) => {
  return {
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      position: 'relative',
    },
    flagIcon: {
      marginRight: theme.spacing(1),
    },

    hiddenLabel: {
      display: 'none',
    },
    languSelect: {
      backgroundColor: "red"
    }
  };
});

const LanguageMenu: React.FC = () => {
  const classes:any = useStyles();
  const [selectedCountry, setSelectedCountry] = useState('EN'); // Set default to 'United States'
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu open/close

  const handleCountryChange = (event: any) => {
    setSelectedCountry(event.target.value as string);
  };

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  return (
    <Paper
      className={classes.paper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FormControl fullWidth>
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          style={{ background: 'none', border: 'none', outline: 'none' }}
          open={isMenuOpen} // Set the open state based on hover
          className={classes.languSelect}
        >
          {countries.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              <Image
                src={country.flag}
                width={12}
                height={12}
                alt="flag icon"
              />
              <TextLabel title={country.value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default LanguageMenu;
