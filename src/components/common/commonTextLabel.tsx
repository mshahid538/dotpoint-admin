import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function TextLabel({
  title,
  variant,
  style,
  noWrap = false,
  color = "#000",
  fontSize,
  fontWeight,
  fontColor,
  secondText,
  secondTextColor,
  marginTop,
  margin,
  textAlign,
  fontStyle,
  className,
  isIconStart,
  icon,
  textDecoration,
  isIconEnd,
  subText,
  subTextStyle,
  textColor,
  secondTextDecoration,
  cursor,
  padding,
  width,
  lineHeight,
  marginBottom,
  onClick
}: any) {
  const variantToFontSize: any = {
    h1: "40px",
    h2: "32px",
    h3: "30px",
    h4: "26px",
    h5: "24px",
    h6: "20px",
    subtitle1: "18px",
    subtitle2: "16px",
    body1: "14px",
    body2: "12px",
  };
  // if (window.innerWidth <= 600) {
  //   variantToFontSize.h1 = "28px";
  //   variantToFontSize.h2 = "25px";
  //   variantToFontSize.h3 = "24px";
  //   variantToFontSize.h4 = "22px";
  //   variantToFontSize.h5 = "20px";
  //   variantToFontSize.h6 = "18px";
  //   variantToFontSize.subtitle1 = "16px";
  //   variantToFontSize.subtitle2 = "14px";
  //   variantToFontSize.body1 = "13px";
  //   variantToFontSize.body2 = "12px";
  // }

  // const responsiveFontSize = fontSize || variantToFontSize[variant];
  const [responsiveFontSize, setResponsiveFontSize] = useState(
    fontSize || variantToFontSize[variant]
  );
  useEffect(() => {
    const updateFontSizes = () => {
      const newVariantToFontSize = { ...variantToFontSize };
      if (window.innerWidth <= 600) {
        newVariantToFontSize.h1 = "28px";
        newVariantToFontSize.h2 = "20px";
        newVariantToFontSize.h3 = "24px";
        newVariantToFontSize.h4 = "22px";
        newVariantToFontSize.h5 = "20px";
        newVariantToFontSize.h6 = "18px";
        newVariantToFontSize.subtitle1 = "16px";
        newVariantToFontSize.subtitle2 = "14px";
        newVariantToFontSize.body1 = "13px";
        newVariantToFontSize.body2 = "12px";
      }

      setResponsiveFontSize(fontSize || newVariantToFontSize[variant]);
    };
    window.addEventListener("resize", updateFontSizes);
    updateFontSizes();
    return () => {
      window.removeEventListener("resize", updateFontSizes);
    };
  }, [fontSize, variant]);
  
  return (
    <Box fontWeight={fontWeight || "fontWeightBold"} width={width}>
      <Typography
        noWrap={noWrap}
        variant={variant || "subtitle2"}
        sx={{ lineHeight: lineHeight }}
        style={{
          fontWeight: fontWeight || 400,
          fontSize: responsiveFontSize || "16px",
          color: fontColor || color,
          fontFamily: "Poppins",
          margin: margin || "0px",
          marginTop: marginTop || "0px",
          marginBottom: marginBottom || "0px",
          textAlign: textAlign || "left",
          fontStyle: fontStyle || "normal",
          textDecoration: textDecoration || null,
          cursor: cursor,
          padding: padding,
          ...style,
        }}
        className={className}
        color={color}
        onClick={onClick}
      >
        {isIconStart && (
          icon
        )}
        {title}{" "}
        {isIconEnd && (
          icon
        )}
        {secondText ? (
          <span style={{ color: secondTextColor ? secondTextColor : "#333", textDecoration: secondTextDecoration }}>
            {secondText}
          </span>
        ) : null}
      </Typography>
      {subText ? (
        <Typography className={subTextStyle} color={textColor} >
          {subText}
        </Typography>
      ) : null}
    </Box>
  );
}
