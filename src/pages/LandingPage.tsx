import NavBar from "../../components/NavBar"
import styles from '../styles/LandingPage.module.css'
export default function LandingPage() {
  return (
    <div className={styles['landing-page']}>
        <NavBar />
        <h3 className={styles.slogan}>
        Stay Connected. Chat in Real Time with SignalClone!
        </h3>
    </div>
  )
}
