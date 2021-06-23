import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error } = useContext(AuthContext)

  useEffect(
    () =>
      error &&
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <Layout title='Belépés'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Belépés
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>E-mail : </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Jelszó :</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type='submit' value='Belépés' className='btn' />
        </form>
        <p>
          Nem vagy még regisztrálva?
          <Link href={`/account/register`}>
            <a> Regisztrálj itt!</a>
          </Link>{' '}
        </p>
      </div>
    </Layout>
  )
}
