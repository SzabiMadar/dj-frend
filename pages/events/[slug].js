import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'

import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import { useRouter } from 'next/router'

export default function EventPage({ currEvt }) {
  const router = useRouter()
  return (
    <Layout>
      <ToastContainer />
      <div className={styles.event}></div>
      <span>
        {new Date(currEvt.date).toLocaleDateString('hu-HU')} at {currEvt.time}
      </span>
      <h1>{currEvt.name}</h1>
      {currEvt.image && (
        <div className={styles.image}>
          <Image
            src={currEvt.image.formats.large.url}
            width={960}
            height={600}
          ></Image>
        </div>
      )}
      <h3>Előadók :</h3>
      <p>{currEvt.performers}</p>
      <h3>Leírás :</h3>
      <p>{currEvt.description}</p>
      <h3>Helyszín : </h3>
      <p>{`${currEvt.venue} , ${currEvt.address}`}</p>

      <Link href='/events'>
        <a className={styles.back}> {'<'} Vissza </a>
      </Link>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const currEvent = await res.json()
  return {
    props: {
      currEvt: currEvent[0],
    },
    revalidate: 1,
  }
}
/* export async function getServerSideProps({ query: { valami } }) {
  const res = await fetch(`${API_URL}/api/events/${valami}`)
  const currEvent = await res.json()
  return {
    props: {
      currEvt: currEvent[0],
    },
  }
} */
