import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { linkApi } from "@/src/service/linkApi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Paper sx={{ p: 2, m: 2, display: "flex", justifyContent: "center" }}>
        <Typography variant="h4">NextJS Mini Project</Typography>
      </Paper>
      <Paper
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <Typography variant="h5">Data Fetching</Typography>
        <div className='flex-row' style={{justifyContent: "center"}}>
          <Button
            variant='contained'
            sx={{ m: 2 }}
            onClick={() => router.push("/ssr")}>
            Go To Server Side Rendering (SSR) Page
          </Button>
          <Button
            variant='contained'
            sx={{ m: 2 }}
            onClick={() => router.push("/data-fetching/1")}>
            Go To Static Side Generation (SSG) Page
          </Button>
        </div>
      </Paper>
      <Paper
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <Typography variant="h5">Fetching API Third Party (Dummy API)</Typography>
        <div className='flex-row' style={{justifyContent: "center"}}>
          <Button
            variant='contained'
            sx={{ m: 2 }}
            onClick={() => router.push("/ssr")}>
            Mapping SSR
          </Button>
          <Button
            variant='contained'
            sx={{ m: 2 }}
            onClick={() => router.push("/csr")}>
            Mapping CSR
          </Button>
          <Button
            variant='contained'
            sx={{ m: 2 }}
            onClick={() => router.push("/combo")}>
            Mapping CSR + SSR
          </Button>
        </div>
      </Paper>
      <Paper
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <Typography variant="h5">Page</Typography>
        <div className='flex-row' style={{justifyContent: "center"}}>
          <Button
            variant='contained'
            sx={{ m: 2 }}
            onClick={() => router.push("/dynamicRoute")}>
            Static Route
          </Button>
          <Button
            variant='contained'
            sx={{ m: 2 }}
            onClick={() => router.push("dynamicRoute")}>
            Dynamic Route
          </Button>
        </div>
      </Paper>
      <Paper
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <Typography variant="h5">Create API di nextJS</Typography>
        <div className='flex-row' style={{justifyContent: "center"}}>
          <Button
            variant='contained'
            sx={{ m: 2 }}
            onClick={() => router.push("/testApi")}>
            Implement GET POST DELETE
          </Button>
        </div>
      </Paper>
      <Paper
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <Typography variant="h5">Middleware Private Route</Typography>
        <div className='flex-row' style={{justifyContent: "center"}}>
          <Button
            variant='contained'
            sx={{ m: 2 }}
            onClick={() => router.push("/auth/login")}>
            Go To Sign In Page
          </Button>
        </div>
      </Paper>

    </>
  );
}
