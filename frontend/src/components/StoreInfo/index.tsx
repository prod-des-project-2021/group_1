import styles from './StoreInfo.module.css'
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Link,
    Rating,
    TextareaAutosize,
    Button
} from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import APIGetStoreByID from '../../api/APIGetStoreByID';
import ShowmapMini from '../showmap/ShowmapMini';

import { useContext } from "react";
import { StoresContext } from "../../contexts/StoresContext";

import APIGetCommentsByID from '../../api/APIGetCommentsByID';
import APIPostAComment from '../../api/APIPostAComment';

import IStore from '../../contexts/IStores';

const StoreInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getDeductedPrice, getRateColor, getAvgRate, onUpdateState, setOnUpdateState  } = useContext(StoresContext);

    const [selectedStore, setSelectedStore] = useState<IStore>()
    const [comments, setComments] = useState<any>([])
    const [rate, setRate] = useState<number | null>(0);
    const [userComment, setUserComment] = useState('');

    async function _APIGetStoreByID() {
        const result = await APIGetStoreByID(id)
        if (result) if (result.status === 200) {
            console.log(result.data)
            setSelectedStore(result.data)
        }
    }

    async function _APIGetCommentsByID() {
        const result = await APIGetCommentsByID(id)
        if (result) if (result.status === 200) {
            const _result = result.data
            console.log(result.data)
            setComments(_result.reverse())
        }
    }

    function convertToHumanDay(day: string) {
        var date = new Date(day);
        return date.toLocaleDateString('en-GB')
    }

    function onSubmitRate(event: any) {
        event.preventDefault();
        console.log(id, rate, userComment)
        APIPostAComment(id, rate, userComment)
        .then(result => {
            console.log(result)
            if(result) {
                if (result.status === 403) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('username')
                    alert('Please login again!')
                    window.location.href = '/login';
                } else {
                    setOnUpdateState(!onUpdateState)
                    alert('Thank you for your comment!')
                }
            } 
        })
        .catch(error => console.log(error))
    }

    const DEFAULT_STORE_URL = "https://i.pinimg.com/originals/70/88/36/708836ce6b5cd801c2b33fc4f3feb476.jpg"
    const INSTAGRAM_URL = "https://instagram.com/"

    let commentsElement = comments.map((comment: any, i: number) => {
        return (
            <Card style={{ borderColor: 'black', marginTop: '1rem' }} key={i}>
                <CardContent>
                    <div style={{ display: 'flex' }}>
                        <h3>Haircut service by {comment?.userName}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Rating name="read-only" value={comment?.rate} readOnly />&nbsp; &nbsp;
                        <h4>{convertToHumanDay(comment.updateAt)}</h4>
                    </div>
                    <div>
                        <h3>{comment?.comment || 'No comment'}</h3>
                    </div>
                </CardContent>
            </Card>
        );
    });

    useEffect(() => {
        _APIGetStoreByID()
        _APIGetCommentsByID()
    }, [onUpdateState])

    return <div className={styles.container}>
        <Box style={{ marginTop: '1rem', padding: '0 2rem' }} >
            <Grid container spacing={4} style={{ marginLeft: '10px', padding: '0rem 8rem' }} >
                <Grid item xs={7}>
                    <Card sx={{ maxWidth: '45vw', maxHeight: '35vh' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height='400px'
                                image={DEFAULT_STORE_URL}
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <div style={{ height: '35vh', width: '30vw', borderRadius: '10px', overflow: 'hidden' }}>
                        <ShowmapMini coordinates={selectedStore?.location?.coordinates} />
                    </div>
                </Grid>

                <Grid item xs={7}>
                    <div style={{ width: '45vw', borderRadius: '10px', overflow: 'hidden' }}>
                        {selectedStore ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '42vw' }}>
                            <h1>{selectedStore?.name}</h1>
                            <h1 style={{ color: 'red' }}>{selectedStore?.discount_rate ? `-${selectedStore?.discount_rate}%` : ''}</h1>
                            <h1>{
                                selectedStore?.discount_rate! > 0 ?
                                    `Alk. ${getDeductedPrice(selectedStore?.price!, selectedStore?.discount_rate!)}€` :
                                    `${selectedStore?.price}€`
                            }
                            </h1>
                            <Link href={INSTAGRAM_URL + selectedStore?.instagram} target="_blank" >
                                <InstagramIcon sx={{ fontSize: 40 }} color="success" />
                            </Link>
                        </div>
                        : <h2>Loading....</h2>}
                        {/* &nbsp; */}
                        <div style={{ fontSize: '26px', fontWeight: 500 }}>{selectedStore?.address}</div><br />
                        <div style={{ fontSize: '24px' }}>{selectedStore?.description}</div>
                    </div>
                </Grid>

                <Grid item xs={5}>
                    <div style={{ width: '20vw', borderRadius: '10px', overflow: 'hidden', border: '1px solid', marginLeft: '5vw' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <h1>Rate:</h1> &nbsp;&nbsp;&nbsp;
                            <h1 style={{ color: getRateColor(getAvgRate(selectedStore?.rate!)) }}> {getAvgRate(selectedStore?.rate!)} ★ {` (${selectedStore?.rate.length || 0})`}</h1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Rating
                                    name="simple-controlled"
                                    value={rate}
                                    onChange={(event, newRate) => {
                                        setRate(newRate);
                                    }}
                                />
                        </div>

                        <form onSubmit={onSubmitRate}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', paddingBottom: '2rem' }}>
                                <TextareaAutosize
                                    onChange={event =>setUserComment(event.target.value)}
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Write a comment..."
                                    style={{ width: 250, borderRadius: '0.5rem', fontSize: '20px' }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '2rem' }}>
                                <Button variant="contained" color="success" type="submit">Submit</Button>
                            </div>
                        </form>

                    </div>
                </Grid>

                <Grid item xs={7}>
                    <h1>Services</h1>
                    <br/><h2>Haircut normal</h2>
                    <Card style={{ borderColor: 'black', marginTop: '1rem', maxWidth: '40vw'}}>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Haircut long hair</h3>
                                <h3 style = {{marginRight: '1rem'}}>From {selectedStore?.price} €</h3>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h4>Cut or trim of long hair. Include wash.</h4>
                            </div>
                        </CardContent>
                    </Card>

                    <br/><h2>Coloring</h2>
                    <Card style={{ borderColor: 'black', marginTop: '1rem', maxWidth: '40vw'}}>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Color & Cut (Short)</h3>
                                <h3 style = {{marginRight: '1rem'}}>From 59 €</h3>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h4>Haircut and color, short hair. Include wash.</h4>
                            </div>
                        </CardContent>
                    </Card>

                    <br/><h2>Muticolor/Hightlights</h2>
                    <Card style={{ borderColor: 'black', marginTop: '1rem', maxWidth: '40vw'}}>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Multiplecolor & Cut (Short)</h3>
                                <h3 style = {{marginRight: '1rem'}}>From 80 €</h3>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h4>Haircut and multiple color, short hair. Include wash.</h4>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={5} spacing={2}>
                    <h1>Comments</h1>
                    <div style={{ height: '35vh', width: '30vw', borderRadius: '10px' }}>
                        {commentsElement}
                    </div>
                </Grid>
            </Grid>
        </Box>
    </div>
}

export default StoreInfo;