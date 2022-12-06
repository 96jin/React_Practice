import Layout from "../../components/layout";
import { getAllPostIds,getPostData } from '../../lib/posts';
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import {useRouter} from 'next/router'
import { useEffect } from "react";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return {
    // paths : [{params : {id: 'ssg-ssr'}}]
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData, // Posts 로 전달한다.
    },
  };
}

export default function Posts({postData}) {
  const router = useRouter()

  useEffect(() => {
    const getText = async () => {
      const res = await fetch('/api/hello')
      const data = await res.json()
      alert(data.text)
    }
    getText()

    const getPid = async () => {
      const res = await fetch(`/api/post/${postData.title}`)
      const data = await res.json()
      console.log(data.text)
    }
    getPid()
  },[])

  // fallback 을 true 로 전달하면~ 동적으로 대응
  if(router.isFallback){
    return <div>Loading..</div>
  } 
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
      </article>
    </Layout>
  )
}
