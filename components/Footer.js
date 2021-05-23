import Link from 'next/link'
import styles from '@/styles/Footer.module.css'
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Dj Events All rights reserved 2021</p>
      <Link href='/about'>
        <a>About</a>
      </Link>
    </footer>
  )
}
