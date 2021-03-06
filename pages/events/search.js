import Layout from '@/components/Layout'
import qs from 'qs'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'
import EventItem from '@/components/EventItem'

export default function SearchPage({ events }) {
  const router = useRouter()
  console.log(router)
  return (
    <Layout title='Keresés eredménye'>
      <h1>{`Eredmények a "${router.query.term}" keresésre`}</h1>
      {events.length === 0 && <h3>Jelenleg nincsenek események.</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { venue_contains: term },
        { description_contains: term },
      ],
    },
  })
  const res = await fetch(`${API_URL}/events?${query}`)
  const events = await res.json()

  return {
    props: { events },
  }
}
