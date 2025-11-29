import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

const PageLoader = ({ open, message = "" }) => {
  return (
    <Backdrop
      sx={{ backgroundColor: "#fff",  zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <div style={{ textAlign: "center" }}>
        <CircularProgress sx={{color:"#12257c"}} size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>

        </Typography>
      </div>
    </Backdrop>
  );
};

export default PageLoader;
