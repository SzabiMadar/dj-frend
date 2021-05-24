import { useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null)

  //kép feltöltése
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refId', evtId)
    formData.append('field', 'image')
    console.log(formData)

    const strapiRes = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (strapiRes.ok) {
      imageUploaded()
    }
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }
  return (
    <div className={styles.form}>
      <h1>Esemény borítókép feltöltése</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='upload' className='btn' />
      </form>
    </div>
  )
}
