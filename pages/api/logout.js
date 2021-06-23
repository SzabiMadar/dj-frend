import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'POST') {
    // Cookie törlése a szerverről
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    )
    res.status(200).json({ message: 'Cookie Destroyed' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed!` })
  }
}
