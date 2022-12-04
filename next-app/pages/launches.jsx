// import { useEffect } from 'react'
// import { useState } from 'react'

export default function Launches({data}) {
  // const [data, setData] = useState(null)
  // useEffect(() => {
  //   const fetchLaunches = async() => {
  //     const res = await fetch("https://api.spacexdata.com/v3/launches")
  //     const data = await res.json()
  //     console.log(data)
  //     setData(data)
  //   }  
  //   fetchLaunches()
  // },[])

  if(data === null){
    return <div>Loading</div>
  }
  return (
    <div>
      <ol>
        {data.map((launch,index)=>(
          <li key={index}>
            {launch.mission_name}
          </li>
        ))}
      </ol>
    </div>
  )
}

export async function getStaticProps(){
  const res = await fetch("https://api.spacexdata.com/v3/launches") // 이 데이터가 바뀌지않는다면 미리 만들어놓고 그걸 재사용한다.
  const data = await res.json()

  console.log('getStaticProps')
  return{
    props: { data } // will be passed to the page component as props . props로 페이지 컴포넌트로 전달될것이다.
  }
}

// export async function getServerSideProps(){
//   const res = await fetch("https://api.spacexdata.com/v3/launches")
//   const data = await res.json()

//   console.log('getServerSideProps')
//   return{
//     props: { data } // will be passed to the page component as props . props로 페이지 컴포넌트로 전달될것이다.
//   }
// }