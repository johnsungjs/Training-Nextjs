import { Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const DynamicRouteDetail = ({ id }) => {
  const router = useRouter();
  const dataClicked = router.query;

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
      <Paper
        sx={{
          p: 2,
          m: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className='flex-row'>
        <div>Book Detail With ID: {id}</div>
        <Button variant='contained' onClick={() => router.back()}>
          Back All Books
        </Button>
      </Paper>
      <div className='flex-row' style={{ justifyContent: "center" }}>
        <Card sx={{ width: 345 }}>
          <CardMedia
            sx={{ height: 300 }}
            image={dataClicked.link}
            title='image'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {dataClicked.bookTitle}
            </Typography>
            <Typography variant='body2' component='div' color='text.secondary'>
              {dataClicked.ratings}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Share</Button>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export const getServerSideProps = (ctx) => {
  const { id } = ctx.params;
  return {
    props: {
      id,
    },
  };
};

export default DynamicRouteDetail;
