import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/Api";
import { CryptoState } from "../Context";
// import ReactHtmlParser from "react-html-parser";
import {
  Container,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CoinInfo from "./CoinInfo";

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  let percentage = 0;
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(id);
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);
  // console.log(coin);
  const useStyles = makeStyles((theme) => ({
    heading: {
      fontWeight: "bold",
      fontFamily: "Nunito Sans",
      marginBottom: 7,
      [theme.breakpoints.down("md")]: {
        fontSize: "2rem",
      },
    },
    coinImg: {
      height: "120px",
      [theme.breakpoints.down("md")]: {
        height: "80px",
      },
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    subHead: {
      [theme.breakpoints.down("md")]: {
        fontSize: "1rem",
      },
    },
    mainHeader: {
      display: "flex",
      alignItems: "center",
      marginBlock: 20,
      backgroundColor: "white",
      width: "fit-content",
      padding: "2rem",
      border: "1px solid rgb(224,224,224)",
      borderRadius: "16px",
      boxShadow:
        "0px 1px 24px rgba(46, 46, 46, 0.06),  0px 2px 10px rgba(46, 46, 46, 0.04), 0px 8px 100px rgba(46, 46, 46, 0.08)",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        // marginTop: 0,
        padding: 20,
        paddingTop: 10,
      },
    },
  }));
  const classes = useStyles();
  {
    currency === "INR"
      ? (percentage =
          coin?.market_data.price_change_percentage_1h_in_currency.inr)
      : (percentage =
          coin?.market_data.price_change_percentage_1h_in_currency.usd);
  }

  if (!coin) return <LinearProgress />;
  return (
    <div className={classes.container}>
      <Container className={classes.sidebar}>
        <div className={classes.mainHeader}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            className={classes.coinImg}
            style={{ marginBottom: 0, marginRight: 10 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h3" className={classes.heading}>
              {coin?.name}
            </Typography>
            <span
              style={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "900",
                }}
                className={classes.subHead}
              >
                {symbol}{" "}
                {coin?.market_data.current_price[currency.toLowerCase()]}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  lineHeight: "1.4",
                  marginLeft: "5px",
                  fontFamily: "Nunito Sans",
                }}
                className={classes.subHead}
              >
                {coin?.symbol}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  color: percentage > 0 ? "rgb(14, 203, 129)" : "red",
                  fontWeight: 500,
                  lineHeight: "1.4",
                  marginLeft: "5px",
                }}
                className={classes.subHead}
              >
                {percentage}
              </Typography>
            </span>
          </div>
        </div>
      </Container>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coin;
