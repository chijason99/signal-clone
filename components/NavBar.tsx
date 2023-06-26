// css
import styles from '../src/styles/NavBar.module.css'

// components
import AuthButton from './AuthButton'

// utils
import { useRouter } from 'next/router'

export default function NavBar() {
  const router = useRouter();
  return (
    <nav className={styles.navbar} >
        <h1 className={styles.heading} onClick={() => router.push("/LandingPage")}>SignalClone</h1>
        <div className={styles["auth-container"]}>
            <AuthButton isAuth={true} displayText='Sign In' path={'/auth/SignIn'}/>
            <AuthButton isAuth={true} displayText='Sign Up' path={'/auth/SignUp'}/>
        </div>
    </nav>
  )
}
