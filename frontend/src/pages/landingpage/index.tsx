import landing from './landing.mp4';
import styles from './LandingPage.module.css'
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <video className={styles["landing-video"]} autoPlay loop muted>
                <source src={landing} type='video/mp4' />
            </video>
            <div className={styles["container"]}>
                <div className={styles["text"]}>
                    <h2>Barber shops</h2>
                    <h3>Treating yourself has never been easier</h3>
                    <p>Find the best selection of barber shops near you. Book what you want, when you want.</p>
                    <div style = {{display: 'flex', justifyContent: 'center'}}>
                        <Link to="/map">
                            <button className={styles["btn-explore"]}>
                                Explore  »
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LandingPage;