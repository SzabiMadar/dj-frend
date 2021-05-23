import Link from 'next/link'
import Layout from '@/components/Layout'
export default function AboutPage() {
  return (
    <Layout title='About DJ events'>
      <h1>About</h1>
      <p>Ez egy app , hogy megaláljátok a legjobb partykat</p>
      <p>1.0.0 verzió</p>
      <Link href='/'>Home</Link>
    </Layout>
  )
}
