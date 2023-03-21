import { Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TestApi = () => {
  const [inputUser, setInputUser] = useState({});
  const [result, setResult] = useState();

  const router = useRouter();

  const handleChange = (e) => {
    setInputUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGet = () => {
    axios
      .get("http://localhost:3000/api/dummy")
      .then((res) => setResult(res.data))
      .catch((err) => console.log("error get data", err));
  };

  const handlePost = () => {
    axios
      .post("http://localhost:3000/api/dummy", { data: inputUser })
      .then((res) => setResult(res.data))
      .catch((err) => console.log("error get data", err));
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:3000/api/dummy", { data: inputUser })
      .then((res) => setResult(res.data))
      .catch((err) => console.log("error get data", err));
  };

  const handleReset = () => {
    setInputUser({});
    setResult();
  };

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
        <Typography variant='h5'>
          API TESTER (Connected to localhost:3000)
        </Typography>
        <Button variant='contained' onClick={() => router.push("/")}>
          Back To Home
        </Button>
      </Paper>
      <Paper sx={{ p: 2, m: 2 }}>
        <div className='flex-row'>
          <div className='flex-col' style={{ flex: 1 }}>
            <Typography variant='h6' sx={{ pb: 1 }}>
              Test Here
            </Typography>
            <Typography sx={{ pb: 1 }}>Insert Title</Typography>
            <TextField
              sx={{ width: 400 }}
              value={inputUser.title || ""}
              onChange={handleChange}
              name='title'
              label='title'
              variant='outlined'
            />
            <Typography sx={{ pb: 1, pt: 1 }}>Insert Author</Typography>
            <TextField
              sx={{ width: 400 }}
              value={inputUser.author || ""}
              onChange={handleChange}
              name='author'
              label='author'
              variant='outlined'
            />
            <Typography sx={{ pb: 1, pt: 1 }}>Insert Link Image</Typography>
            <TextField
              sx={{ width: 400 }}
              value={inputUser.link || ""}
              onChange={handleChange}
              name='link'
              label='link image'
              variant='outlined'
            />
            <Typography sx={{ pb: 1, pt: 1 }}>Insert Description</Typography>
            <TextField
              sx={{ width: 400 }}
              value={inputUser.description || ""}
              onChange={handleChange}
              name='description'
              label='description'
              variant='outlined'
            />
          </div>
          <div
            className='flex-col'
            style={{ flex: 1, justifyContent: "center" }}>
            <Button variant='contained' sx={{ m: 2, p: 1 }} onClick={handleGet}>
              GET
            </Button>
            <Button
              variant='contained'
              sx={{ m: 2, p: 1 }}
              onClick={handlePost}>
              POST
            </Button>
            <Button
              variant='contained'
              sx={{ m: 2, p: 1 }}
              onClick={handleDelete}>
              DELETE
            </Button>
            <Button
              variant='contained'
              sx={{ m: 2, p: 1 }}
              onClick={handleReset}>
              Reset Result
            </Button>
          </div>
        </div>
      </Paper>
      <Paper sx={{ p: 2, m: 2 }}>
        <Typography variant='h6'>Result (Return API)</Typography>
        <div
          style={{
            border: "1px solid grey",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
          }}>
          <Typography variant='h7'>
            {result ? JSON.stringify(result) : "no result"}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default TestApi;
