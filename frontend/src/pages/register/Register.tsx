import {
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import APIRegister from "../../api/APIRegister";
import { Form, Formik } from "formik";
import Wrapper from "../../components/Wrapper";
import InputField from "../../components/InputField";

import { StoresContext } from "../../contexts/StoresContext";
import { useContext } from "react";

const Register = () => {
  const theme = createTheme();
  const classes = useStyles();

  let history = useHistory();

  const { auth } = useContext(StoresContext);
  const authToken = localStorage.getItem('token')

  const [errorMsg, setErrorMsg] = useState<Boolean>(false);

  const handleRegister = (values: any) => {
    let { username, fullname, passwordHash } = values;
    APIRegister(username, fullname, passwordHash).then((response) => {
      if (response) {
        history.push("/login");
      }
      else {
        setErrorMsg(true);
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      {!auth && !authToken ? (
        <Container component="main" maxWidth="xs" style={{
          height: "600px",
          border: "1px solid",
          borderRadius: "1rem",
          maxWidth: "50vw",
          display: "flex",
          justifyContent: 'space-between'
        }}>
          <CssBaseline />
          <Wrapper>
            {errorMsg && <Typography variant="h5" color="error">Something went wrong</Typography>}
            <Typography component="h1" variant="h3" padding="1rem">
              REGISTER
            </Typography>

            <Formik
              initialValues={{ username: "", fullname: "", passwordHash: "", checked: false }}
              onSubmit={handleRegister}
            >
              {() => (
                <Form>
                  <Grid container spacing={2} justifyContent="center">
                    <InputField
                      name="username"
                      label="Username"
                      type="text"
                    />
                    <InputField
                      name="fullname"
                      label="fullname"
                      type="text"
                    />
                    <InputField
                      name="passwordHash"
                      label="password"
                      type="password"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{
                        width: "150px",
                        fontSize: "20px"
                      }}
                    >
                      REGISTER
                    </Button>
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Link to="/login" className={classes.linkBtn}>
                          Already have an account? Log in
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Wrapper>
        </Container>
      ) : (
        <Redirect to="/map" />
      )}
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme: any) => ({
  linkBtn: {
    textDecoration: "none",
  }
}))

export default Register;
