import {
  AppBar,
  Container,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../Context";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    cursor: "pointer",
    color: "rgb(18,32,108)",
    fontWeight: "bold",
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();
  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography
            onClick={() => {
              navigate("/");
            }}
            className={classes.title}
            variant="h4"
          >
            Crypto Tracker
          </Typography>
          <Select
            variant="outlined"
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
            style={{
              width: 100,
              height: 40,
              marginRight: 15,
              color: "rgb(18,32,108)",
            }}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
