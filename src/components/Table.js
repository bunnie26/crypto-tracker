import React, { useState, useEffect } from "react";
import axios from "axios";
import { CoinList } from "../config/Api";
import { CryptoState } from "../Context";
import { useNavigate } from "react-router-dom";
import {
  Container,
  LinearProgress,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.symbol.toLowerCase().includes(search) ||
        item.name.includes(search) ||
        item.symbol.includes(search)
    );
  };

  const useStyles = makeStyles({
    row: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#F4F7FF",
      },
      fontFamily: "Nunito Sans",
    },
  });
  const classes = useStyles();
  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h4" style={{ marginBlock: "2rem" }}>
        Cryptocurrency Prices
      </Typography>
      <TextField
        label="Search for Crypto"
        variant="outlined"
        style={{
          marginBottom: "2rem",
          width: "100%",
          backgroundColor: "white",
          fontFamily: "Nunito Sans",
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></TextField>
      <TableContainer>
        {loading ? (
          <LinearProgress />
        ) : (
          <Table
            style={{
              backgroundColor: "white",
              border: "1px solid rgb(224,224,224)",
              borderRadius: "10px",
              fontFamily: "Nunito Sans",
            }}
          >
            <TableHead>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      color: "rgb(18,32,108)",
                      fontWeight: "700",
                      fontSize: "1.2rem",
                      fontFamily: "Nunito Sans",
                    }}
                    key={head}
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()?.length ? (
                handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        {" "}
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: 15 }}
                        >
                          {" "}
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />{" "}
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {" "}
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {" "}
                              {row.symbol}{" "}
                            </span>{" "}
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>{" "}
                          </div>{" "}
                        </TableCell>{" "}
                        <TableCell align="right">
                          {" "}
                          {symbol} {row.current_price.toFixed(2)}{" "}
                        </TableCell>{" "}
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {" "}
                          {profit && "+"}{" "}
                          {row.price_change_percentage_24h.toFixed(2)}%{" "}
                        </TableCell>{" "}
                        <TableCell align="right">
                          {" "}
                          {symbol} {row.market_cap.toString().slice(0, -6)}M{" "}
                        </TableCell>{" "}
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow
                  style={{ padding: "20px 10px", fontSize: "20px" }}
                  className={classes.row}
                >
                  No coin Found
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Pagination
        count={(handleSearch()?.length / 10).toFixed(0)}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      ></Pagination>
    </Container>
  );
};

export default CryptoTable;
