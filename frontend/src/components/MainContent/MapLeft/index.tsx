import { FormControl, makeStyles } from "@material-ui/core";
import {
   Grid,
   Card,
   CardContent,
   CardMedia,
   CardActionArea,
   Box,
   InputLabel,
   Select,
   MenuItem,
   Skeleton
} from "@mui/material";

import { useContext, useState } from "react";
import { StoresContext } from "../../../contexts/StoresContext";

interface Props {
   selectStore: (id: string) => any;
}

const MapLeft: React.FC<Props> = ({ selectStore }) => {

   const { stores, getRateColor, getAvgRate, getDeductedPrice, setStoreId } = useContext(StoresContext);
   const classes = useStyles();
   const totalStores = stores.length || 0

   const DEFAULT_STORE_URL = "https://i.pinimg.com/originals/70/88/36/708836ce6b5cd801c2b33fc4f3feb476.jpg"
   const DEFAULT_STORE_URL_LIBRARY = [
      "https://www.ringmybarber.com/wp-content/uploads/2020/06/barbershop-tools.jpg",
      "https://scontent-arn2-2.xx.fbcdn.net/v/t1.15752-9/264249993_2740694202906463_8732184357202008075_n.png?_nc_cat=108&ccb=1-5&_nc_sid=ae9488&_nc_ohc=wHGT8ZaUxOQAX8lqlnV&_nc_ht=scontent-arn2-2.xx&oh=b2513b4903285b44a1a8fdd70e0ff048&oe=61D26882",
      "https://cdn5.vectorstock.com/i/1000x1000/51/29/barber-shop-poster-hipster-vector-10165129.jpg",
      "https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/263157065_4640003532761563_6787411404556636736_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=ae9488&_nc_ohc=Eh25I5m7O1YAX_YcrO3&_nc_ht=scontent-arn2-1.xx&oh=5dbc3131c3429e32d86f27d8cc34187a&oe=61D0E3E4",
      "https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/263170017_616221443136298_7002579285187911358_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=ae9488&_nc_ohc=O8F7BCEvchEAX_as0Ha&_nc_ht=scontent-arn2-1.xx&oh=64d58787a89160ddee6ef3387954f0a6&oe=61D398B5",
      "https://i.pinimg.com/550x/ba/86/7e/ba867edfd9f1b248ce5d1c82aa396b05.jpg",
      "https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/263034760_180531780960834_6589227711472610217_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=ae9488&_nc_ohc=1O-PDWZVGq8AX9ch9gp&_nc_ht=scontent-arn2-1.xx&oh=65ed2fa46e3f10d7c794f1f35868ec7e&oe=61D3146F",
      "https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/263073458_600329001221061_6351134991847693381_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=hjAmh_0hJgEAX8DAqHI&_nc_ht=scontent-arn2-1.xx&oh=43fdd5c6dd1a572db701c9e8e646668e&oe=61D207B6",
      "https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/263192536_432365048357185_579568375754720118_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=ae9488&_nc_ohc=knyCHY58xPsAX_1tdg-&_nc_ht=scontent-arn2-1.xx&oh=0bb21b857378fc36a0242f7e1e01a1f4&oe=61D22CCC",
      "https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/263323570_1022504638311388_3265078804064792874_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=ae9488&_nc_ohc=9mH8fPjqkkoAX8eDpJp&_nc_ht=scontent-arn2-1.xx&oh=2389862246cf796abeac518d3ac88906&oe=61D209C3"
   ]

   let sortedRoom = stores;
   const [sort, setSort] = useState("");

   if (sort) {
      let tempStores;
      if (sort === "cheapest") {
         tempStores = stores.sort(function (a: any, b: any) {
            return a.price - b.price
         })
         sortedRoom = tempStores;
      }
      else {
         var tam = stores.map((store: any) => {
            store.rateArv = getAvgRate(store.rate);
            return store;
         });
         tempStores = tam.sort(function (a: any, b: any) {
            return b.rateArv - a.rateArv
         })
         sortedRoom = tempStores;
      }
   }

   return (
      <>
         <div style={{ display: 'flex' }}>
            <h2>Select between {totalStores} barber shops in the area</h2>
            <div style={{ flex: 1 }}></div>
            <Box style={{ justifyContent: 'flex-end', marginRight: '5rem' }}>
               <FormControl style={{ minWidth: 100, height: 80 }}>
                  <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={sort}
                     label="Sort by:"
                     onChange={(event) => setSort(event.target.value)}
                     disabled={sortedRoom.length === 0}
                     style={{ height: '3em', textAlign: 'center' }}
                  >
                     <MenuItem value="best">Best</MenuItem>
                     <MenuItem value="cheapest">Cheapest</MenuItem>
                  </Select>
               </FormControl>
            </Box>
         </div>
         {/* style here just for example */}
         <Box style={{ maxHeight: '81vh', maxWidth: '100wh', overflow: 'auto' }}>
            <Grid container style={{ alignItems: 'space-between', justifyContent: 'center' }} >
               {sortedRoom.length ? (sortedRoom.map((store: any, i) => {
                  return (
                     <Card sx={{ maxWidth: 345 }} className={classes.paperMap} key={store?.id} onClick={() => selectStore(store?.id)} onMouseEnter={() => {
                        setStoreId(store?.id);
                     }}
                     onMouseLeave={()=>{
                        setStoreId('');
                     }}
                     >
                        <CardActionArea>
                           <CardMedia
                              key={store?.id}
                              component="img"
                              height="140"
                              image={DEFAULT_STORE_URL_LIBRARY[i]}
                              alt="green iguana"
                           />
                           <CardContent>
                              <h2>{store?.name} &nbsp;
                                 <span style={{ color: 'red' }}>{store?.discount_rate ? `-${store?.discount_rate}%` : ''}</span>
                              </h2>
                              <h3>{store?.address}</h3>
                              <h3 style={{ color: getRateColor(getAvgRate(store?.rate)) } || 'green'}>{getAvgRate(store?.rate) || 0} ★ {` (${store?.rate.length || 0})`}</h3>
                              <h3>{
                                 store?.discount_rate > 0 ?
                                    `Original ${store?.price}€  => ${getDeductedPrice(store?.price, store?.discount_rate)}€` :
                                    `${store?.price}€`}
                              </h3>
                              <h3>Open from: 10:00 AM
                                 {/* {store?.opentime} */}
                              </h3>
                           </CardContent>
                        </CardActionArea>
                     </Card>
                  );
               })
               ) : (
                  Array.from(new Array(9)).map((a, i) => {
                     return (
                        <Card sx={{ maxWidth: 345 }} className={classes.paperMap} key={i}>
                           <CardActionArea>
                              <Skeleton variant="rectangular" width={310} height={118} />
                              <CardContent>
                                 <Skeleton height={30} />
                                 <Skeleton width={230} height={20} />
                                 <Skeleton width={200} height={18} />
                                 <Skeleton width={170} height={18} />
                                 <Skeleton width={170} height={18} />
                              </CardContent>
                           </CardActionArea>
                        </Card>
                     );
                  })
               )
               }
            </Grid>
         </Box>
      </>

   );
};

const useStyles = makeStyles((theme: any) => ({
   paperMap: {
      width: 310,
      margin: 5,
      padding: 5,
      cursor: "pointer"
   },
}));

export default MapLeft;


