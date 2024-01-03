import { Breakpoint } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";

type FullPageLayoutProps = React.PropsWithChildren<{}> & {
    maxWidth?: false | Breakpoint | undefined;
};
export default function FullPageLayout({
    children,
    maxWidth = "xl",
}: FullPageLayoutProps) {
    return (
        <Container
            maxWidth={maxWidth}
        // sx={{ paddingInline: "40px"  }}
        >
            {children}
        </Container>
    );
}
