import Link from 'next/link'
import Search from '@/components/Search'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/Header.module.css'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

export default function Header() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Dj Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Események</a>
            </Link>
          </li>
          {user ? (
            //Ha be van lépve akkor ez látszik -- tud esemény hozzáadni
            <>
              <li>
                <Link href='/events/add'>
                  <a>Esemény hozzáadása</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className='btn-secondary btn-icon'
                >
                  <FaSignOutAlt />
                  Kilépés
                </button>
              </li>
            </>
          ) : (
            //Ha nincs belépve akkor be kell lépni először
            <li>
              <Link href='/account/login'>
                <a className='btn-secondary btn-icon'>
                  <FaSignInAlt />
                  Belépés
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
