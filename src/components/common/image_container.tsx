import React, { ImgHTMLAttributes } from "react";
import getConfig from "next/config";
import { Box } from "@mui/material";
const { publicRuntimeConfig } = getConfig();

type assetsProps = ImgHTMLAttributes<HTMLImageElement> & {
    absolutePath?: boolean | null;
};

export const convertAssetsPath = (
    src: any,
    absolutePath?: boolean | null
) => {
    return `${absolutePath ? "" : publicRuntimeConfig.basePath}${src}`;
};
export default function Assets({ absolutePath, ...props }: assetsProps) {
    // console.log(props.src, "props.src")
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            {...props}
            src={convertAssetsPath(props.src, absolutePath)}
            alt="img"

        />
    );
}