import { makeStyles } from "@material-ui/core";
import {
  AppBar,
  Stack,
  Toolbar,
} from "@mui/material";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoresContext } from "../../contexts/StoresContext";
import styles from './Navbar.module.css'
const Navbar = () => {
  const { Logout, auth } = useContext(StoresContext);
  const tokenAuth = localStorage.getItem('token')

  const classes = useStyles();

  return (
    <>
      <AppBar color="inherit" position="static" elevation={0}>
        <Toolbar>
          <div className={classes.brand}>
            <Link to="/" className={classes.linkBtn}>
              <img src="https://i.pinimg.com/originals/04/0e/d9/040ed98defb52539c6ef68703fbde157.png" alt="logo" className={`${styles.imgLogo} ${classes.logo}`} />
            </Link>
          </div>
          {auth || tokenAuth ? (
            <Stack direction="row" spacing={2}>
              <button className={styles.btnItem}>
                {localStorage.getItem("username")}
              </button>
              <button className={styles.btnItem}>
                Contact us
              </button>
              <button className={`${styles.btn} ${styles.btnDark}`}
                onClick={Logout}
              >Log out
              </button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={6}>
              <button className={styles.btnItem}>
                Contact us
              </button>
                <Link to="/login">
                <button className={`${styles.btn} ${styles.btnDark}`}>
                  Log in
                  </button>
                </Link>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </>

  );
};

const useStyles = makeStyles((theme: any) => ({
  logo: {
    maxWidth: 260,
    display: 'inline-block'
  },
  brand: {
    flexGrow: 1,
  },
  linkBtn: {
    textDecoration: "none",
    marginLeft: '1rem',
    color: "white"
  }
}));

export default Navbar;
