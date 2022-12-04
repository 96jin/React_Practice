import Link from 'next/link';
import Head from 'next/head'
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
        <meta name="author" content="Chris Mills"/>
        <meta name="description"
        content = "The MDN Learning Area aims to provide complete"/>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </Layout>
  )
}
