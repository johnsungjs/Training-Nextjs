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

const Ssr = ({ data }) => {
  const router = useRouter();

  function createData(id, body, title) {
    return { id, body, title };
  }

  const rows = data.map((e) => createData(e.id, e.body, e.title));

  return (
    <div>
      <Paper sx={{ p: 2, m: 2, justifyContent: "space-between", alignItems:"center" }} className='flex-row'>
        <Typography>My Book List (USING SSR)</Typography>
        <Button variant="contained" onClick={() => router.push("/")}>Back To Home</Button>
      </Paper>
      <Paper sx={{ p: 2, m: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align='center'>Book Title</TableCell>
                <TableCell align='center'>Book Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell align='left'>{row.title}</TableCell>
                  <TableCell align='left'>{row.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Ssr;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios
    .get(linkApi)
    .then((res) => res.data)
    .catch((err) => console.log("error get data", err));
  const data = await res;

  // Pass data to the page via props
  return { props: { data } };
}
