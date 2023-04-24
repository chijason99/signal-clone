import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Chats from '../../components/Chats'
import Main from '../../components/Main'
export default function Home() {
  return (
    <>
      <Head>
        <title>Real time chat app</title>
        <meta name="description" content="A real time chat app developed with Next.js and socket.io." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.wrapper}>
        <Chats />
        <Main name='jason'/>
      </div>
    </>
  )
}
