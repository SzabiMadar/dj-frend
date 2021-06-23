import { ToastContainer, toast } from 'react-toastify'
import cookie from 'cookie'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import moment from 'moment'
import { FaImage } from 'react-icons/fa'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'
import { parseCookies } from '@/helpers/index'

export default function EditEventPage({ evt, token }) {
  const router = useRouter()

  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })

  const [showModal, setShowModal] = useState(false)
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  )

  const imageUploaded = async (e) => {
    const strapiRes = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await strapiRes.json()

    setImagePreview(data.image.formats.thumbnail.url)
    toast.success('Sikeres feltöltés', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    setShowModal(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //validation
    const hasEmptyFields = Object.values(values).some((field) => field === '')

    if (hasEmptyFields) {
      toast.error('Minden mezőt ki kell töltened!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    } else {
      //Ha minden ki van töltve akkor POST request

      const postReq = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })

      if (!postReq.ok) {
        if (postReq.status === 403 || postReq.status === 401) {
          toast.error('Nincs token', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          return
        }
        toast.error('Valami hiba történt a szervernél!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        console.log(postReq)
      } else {
        const data = await postReq.json()
        router.push(`/events/${data.slug}`)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  return (
    <Layout>
      <Link href='/events'>{`< Vissza`}</Link>
      <h1>Esemény frissítése</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Esemény neve</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Előadók</label>
            <input
              type='text'
              id='performers'
              name='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Helyszín</label>
            <input
              type='text'
              id='venue'
              name='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Cím</label>
            <input
              type='text'
              id='address'
              name='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Dátum</label>
            <input
              type='date'
              id='date'
              name='date'
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Kezdés időpontja</label>
            <input
              type='text'
              id='time'
              name='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Leírás</label>
          <textarea
            type='text'
            id='description'
            name='description'
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type='submit' value='Esemény frissítése' className='btn' />
      </form>
      <h2>Esemény Képe</h2>
      {imagePreview ? (
        <Image src={imagePreview} height='100' width='170' />
      ) : (
        <div>
          <p>Nincs kép feltöltve</p>
        </div>
      )}
      <div>
        <button
          className='btn-secondary'
          onClick={() => {
            setShowModal(true)
          }}
        >
          <FaImage />
          <p className={styles.imageGomb}>Kép megadása</p>
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req)
  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json()

  return {
    props: {
      evt,
      token,
    },
  }
}
