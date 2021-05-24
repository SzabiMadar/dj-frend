import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'

const PER_PAGE = 4

export default function EventsPage({ events, eventsCount, page }) {
  return (
    <Layout>
      <h1>Események</h1>
      {events.length === 0 && <h3>Jelenleg nincsenek események.</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} eventsCount={eventsCount} perPage={PER_PAGE} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  //Lapok számítási módja
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  //Események számának lekérése
  const strapiEventCountRes = await fetch(`${API_URL}/events/count`)
  const eventsCount = await strapiEventCountRes.json()

  //Esemény model lekérése
  const strapiEventModelRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )
  const events = await strapiEventModelRes.json()

  return {
    props: { events, page: +page, eventsCount },
  }
}
