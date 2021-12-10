import React from 'react'
import MapLeft from './MapLeft';
import MapRight from './MapRight'
import { History, LocationState } from "history";

import {
  Box,
  Grid,
} from "@mui/material";
interface Props {
  history: History<LocationState>
}

const MainContent: React.FC<Props> = ({ history }) => {

  const selectStore: any = (id: number) => {
    history.push(`/map/${id}`)
  }

  return (
    <>
      <Box style = {{marginTop: '1rem', padding: '0 2rem'}} >
        <Grid container style = {{marginLeft: '10px'}}>
          <Grid item xs={7}>
          <MapLeft selectStore = {selectStore} />
          </Grid>
          <Grid item xs={5}>
          <MapRight selectStore = {selectStore}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MainContent;
