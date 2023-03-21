import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const index = ({ data }) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [dataFromApi, setDataFromApi] = useState(data);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(
        `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`
      )
      .then((res) => setDataFromApi(res.data.data));
  }, [page, size]);

  function createData(id, name, trips) {
    return { id, name, trips };
  }

  const rows = dataFromApi.map((e) => createData(e._id, e.name, e.trips));

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
        <Typography>
          Other Reader List (USING SSR + CSR With Pagination)
        </Typography>
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
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>Book Read</TableCell>
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
                  <TableCell align='center'>{row.name}</TableCell>
                  <TableCell align='center'>{row.trips}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          disabled={page === 1}
          variant='contained'
          sx={{ p: 1, mt: 4, mr: 2 }}
          onClick={() => setPage(page - 1)}>
          Previous Page
        </Button>
        <Button
          variant='contained'
          sx={{ p: 1, mt: 4 }}
          onClick={() => setPage(page + 1)}>
          Next Page
        </Button>
        <FormControl sx={{ p: 1, mt: 2, ml: 1 }}>
          <InputLabel id='demo-simple-select-label'>Size</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={size}
            label='Size Page'
            onChange={(e) => setSize(e.target.value)}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </div>
  );
};

export default index;

export async function getServerSideProps() {
  //fetch data from external api
  const res = await axios
    .get("https://api.instantwebtools.net/v1/passenger?page=1&size=5")
    .then((res) => res.data.data)
    .catch((err) => console.log("error get data", err));

  const data = await res;

  //pass data to page via props
  return {
    props: { data },
  };
}
