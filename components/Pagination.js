import Link from 'next/link'

export default function Pagination({ page, eventsCount, perPage }) {
  //Legkésőbbi event meghatározása
  const lastPage = Math.ceil(eventsCount / perPage)
  return (
    <div>
      {/* előző gomb akkor látszik ha nem az első oldalon vagyunk */}
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='btn-secondary'>Előző</a>
        </Link>
      )}
      {/* következő gomb akkor látszik ha nem az utolsó oldalon vagyunk */}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='btn-secondary jobbraTol'>Következő</a>
        </Link>
      )}
    </div>
  )
}
