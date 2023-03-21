import { Button, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import React from "react";

const login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "admin",
      password: "admin",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(10, "Must be 10 character or less")
        .required("Username can't be empty"),
      password: Yup.string().required("Password can't be empty "),
    }),
    onSubmit: async (value) => {
      console.log("this is value: ", value);
      const credentials = await signIn("credentials", {
        username: value?.username,
        password: value?.password,
        redirect: false,
      });
      if (credentials.ok) {
        router.push("/");
      }
      console.log("this is credentials: ", credentials);
    },
  });

  return (
    <>
      <Paper
        sx={{
          minWidth: "400px",
          height: "500px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: "auto",
          borderRadius: "20px",
          padding: "20px",
        }}>
        <div className='flex-col' style={{ height: "100%" }}>
          <div style={{ height: "60px", margin: "auto" }}>
            <Typography variant='h5'>Sign in Here</Typography>
          </div>
          <form onSubmit={formik.handleSubmit} style={{ height: "100%" }}>
            <Typography sx={{ pb: 1 }}>Username</Typography>
            {formik.errors &&
              formik.touched &&
              formik.errors?.username &&
              formik.touched?.username && (
                <div
                  style={{
                    fontSize: "15px",
                    color: "red",
                    marginBottom: "10px",
                  }}>
                  {formik.errors?.username}
                </div>
              )}
            <TextField
              sx={{ width: "100%" }}
              value={formik.values.username}
              onChange={formik.handleChange}
              name='username'
              type='username'
              label='Username'
              variant='outlined'
            />
            <Typography sx={{ pb: 1, pt: 2 }}>Password</Typography>
            {formik.errors &&
              formik.touched &&
              formik.errors?.password &&
              formik.touched?.password && (
                <div
                  style={{
                    fontSize: "15px",
                    color: "red",
                    marginBottom: "10px",
                  }}>
                  {formik.errors?.password}
                </div>
              )}
            <TextField
              sx={{ width: "100%" }}
              value={formik.values.password}
              onChange={formik.handleChange}
              name='password'
              type='password'
              label='Password'
              variant='outlined'
            />
            <Button
              sx={{ mt: 4, width: "100%" }}
              variant='contained'
              type='submit'>
              Login
            </Button>
          </form>
        </div>
      </Paper>
    </>
  );
};

export default login;
