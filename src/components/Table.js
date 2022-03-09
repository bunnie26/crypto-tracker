import React, { useState, useEffect } from "react";
import axios from "axios";
import { CoinList } from "../config/Api";
import { CryptoState } from "../Context";
import {
  Container,
  LinearProgress,
  TextField,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

const Table = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency } = CryptoState();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, [currency]);
  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h4" style={{ marginBlock: "2rem" }}>
        Cryptocurrency Prices
      </Typography>
      <TextField
        label="Search for Crypto"
        variant="outlined"
        style={{ marginBottom: "2rem", width: "100%" }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></TextField>
      <TableContainer>
        {loading ? (
          <LinearProgress />
        ) : (
          <Table style={{ backgroundColor: "white", borderRadius: "16px" }}>
            <TableHead>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market cap"].map((item) => (
                  <TableCell>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default Table;
