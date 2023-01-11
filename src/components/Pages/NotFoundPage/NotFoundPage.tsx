import { useNavigate } from "react-router-dom";

import { Link, Typography } from "@mui/material";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/movies-react-redux-app");
  };

  return (
    <>
      <Typography variant="h4" component="h1">
        Whoops!
      </Typography>
      <Typography>The page you requested does not exist.</Typography>
      <Link href="/movies-react-redux-app" onClick={handleNavigate}>
        To Popular Movies Page
      </Link>
    </>
  );
};
