import "./App.css";
import React from "react"
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },  
});

const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const getProductData = async () => {
    try {
      const data = await axios.get(
        "https://api-test-7h6w.onrender.com/transactions"
      );
      console.log(data.data);
      setProduct(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  // let id = Number;

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className="App">
      <h1>BANK OF FLATIRON</h1>
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

 

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> ID</StyledTableCell>
              <StyledTableCell align="left"> Date</StyledTableCell>
              <StyledTableCell align="left"> Description</StyledTableCell>
              <StyledTableCell align="left"> Category</StyledTableCell>
              <StyledTableCell align="left"> Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
            // eslint-disable-next-line
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.description.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
                else if (
                  item.category.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                } 
                
                
              })
              .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.date}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.description}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.category}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.amount}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
