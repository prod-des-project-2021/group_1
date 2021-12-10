import { makeStyles } from "@material-ui/core";
import {
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { StoresContext } from "../../contexts/StoresContext";

const Login = () => {
  const { Login, auth } = useContext(StoresContext);
  
  const handleSubmit = (values: any) => {
    let {username, passwordHash} = values;
    Login(username, passwordHash);
  };

  const authToken = localStorage.getItem('token')

  const theme = createTheme();
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      {!auth && !authToken ? (
        <Container maxWidth="xs" style={{
          height: "600px",
          border: "1px solid",
          borderRadius: "1rem",
          maxWidth: "50vw",
          display: "flex",
          justifyContent: 'space-between'
        }}>
          <CssBaseline />
          <Wrapper>
            <Typography component="h1" variant="h3" padding="1rem">
              LOG IN
            </Typography>
            <Formik
              initialValues={{ username: "", passwordHash: "" }}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <Grid container spacing={2} justifyContent="center">
                    <InputField name="username" label="Username" type="text" />
                    <InputField
                      name="passwordHash"
                      label="Password"
                      type="password"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{
                        width : "150px",
                        fontSize: "20px"
                      }}
                    >
                      LOG IN
                    </Button>
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Typography variant="body1">
                          <Link to="/register" className={classes.linkBtn}>
                            Don't have an account? Register
                          </Link>
                        </Typography>
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

export default Login;
