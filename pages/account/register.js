import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const { regiserUser, error } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    regiser({ username, email, password })
    if (password !== passwordConfirm) {
      toast.error('A jelszavak nem egyeznek!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <Layout title='Regisztráció'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Regisztráció
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='userName'>Felhasználónév : </label>
            <input
              type='text'
              id='userName'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
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
          <div>
            <label htmlFor='passwordConfirm'>Jelszó megerősítése :</label>
            <input
              type='password'
              id='passwordConfirm'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type='submit' value='Belépés' className='btn' />
          <p>
            Már regisztrálva vagy?
            <Link href={`/account/login`}>
              <a> Belépés itt!</a>
            </Link>{' '}
          </p>
        </form>
      </div>
    </Layout>
  )
}
