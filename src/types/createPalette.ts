import {
    PaletteOptions,
    SimplePaletteColorOptions,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
    export interface PaletteOptions extends customColorPalette { }
    export interface Palette extends customColorPalette { }
}

interface customColorPalette {
    bgLightBlue: SimplePaletteColorOptions;
    bgLightBlue2: SimplePaletteColorOptions;
    bgLightGray: SimplePaletteColorOptions;
    bgLightExtraGray: SimplePaletteColorOptions;
    bgWhite: SimplePaletteColorOptions;
    bgGray: SimplePaletteColorOptions;
    bgBlue: SimplePaletteColorOptions;
    bgSuccess: SimplePaletteColorOptions;
    bgBlack: SimplePaletteColorOptions;
    bgDarkBlack: SimplePaletteColorOptions;
    bgLightBlack: SimplePaletteColorOptions;
    bgLightGreen: SimplePaletteColorOptions;
    backgroundDefaultColor: SimplePaletteColorOptions;
    bgCyan: SimplePaletteColorOptions;
    bgPurple: SimplePaletteColorOptions;
    bgTrendGreen: SimplePaletteColorOptions;
    bgTrendRed: SimplePaletteColorOptions;
    bgTrendOrange: SimplePaletteColorOptions;
    bgDefultDark: SimplePaletteColorOptions;
    bgDefultLightSky: SimplePaletteColorOptions;
    bgdefultBlue: SimplePaletteColorOptions;
    lightWarning: SimplePaletteColorOptions;
    bgDefultLight: SimplePaletteColorOptions;
    bgDefultGreen: SimplePaletteColorOptions;
}
