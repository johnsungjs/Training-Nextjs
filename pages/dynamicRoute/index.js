import { linkApi } from "@/src/service/linkApi";
import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import { dataDummy } from "@/dataDummy";

const DynamicRoute = () => {
  const router = useRouter();

  const handleGoToDetail = (clicked) => {
    // console.log("data clicked: ", clicked);
    router.push({
      pathname: `/dynamicRoute/${clicked.id}`,
      query: clicked,
    });
  };

  const data = dataDummy;

  function createData(id, bookAuthor, bookTitle, link, ratings) {
    return { id, bookAuthor, bookTitle, link, ratings };
  }

  const rows = data.map((e) =>
    createData(e.bookId, e.bookAuthor, e.bookTitle, e.link, e.ratings)
  );
  return (
    <div>
      <Paper
        sx={{
          p: 2,
          m: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className='flex-row'>
        <Typography>My Book List (hardcode data)</Typography>
        <Button variant='contained' onClick={() => router.push("/")}>
          Back To Home
        </Button>
      </Paper>
      <Paper sx={{ p: 2, m: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align='left'>Book Title</TableCell>
                <TableCell align='left'>Book Description</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell align='left'>{row.bookAuthor}</TableCell>
                  <TableCell align='left'>{row.bookTitle}</TableCell>
                  <TableCell align='center'>
                    <Button
                      variant='contained'
                      onClick={() => handleGoToDetail(row)}>
                      Go To Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default DynamicRoute;
