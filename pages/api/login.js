import { API_URL } from '@/config/index'
import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { identifier, password } = req.body

    //Szóval ez a route a middleman, hogy lehessen HTTP only Tokent menteni
    //Lényegében a frontendről ezt a login route-ot ütjük meg
    //és ha megütjük akkor ez a rout meg küld egy másik requestet a serverről a strapihoz a JWT tokenért

    const strapiRes = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    })

    const strapiData = await strapiRes.json()

    if (strapiRes.ok) {
      //Itt kapjuk vissza a JWT tokent
      // Cookie mentése a serverre

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', strapiData.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        })
      )

      res.status(200).json({ user: strapiData.user })
    } else {
      res
        .status(strapiData.statusCode)
        .json({ message: strapiData.message[0].messages[0].message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed!` })
  }
}
