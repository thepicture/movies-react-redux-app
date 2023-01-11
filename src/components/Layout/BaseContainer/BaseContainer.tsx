import React from "react";

import { Grid } from "@mui/material";

export interface BaseContainerProps {
  children: React.ReactNode;
}

export const BaseContainer: React.FC<BaseContainerProps> = ({ children }) => {
  return (
    <Grid container gridTemplateRows={"auto 1fr"}>
      {children}
    </Grid>
  );
};
