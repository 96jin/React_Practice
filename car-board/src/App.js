import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Board from './components/Board';
import axios from 'axios';
import { useState, useEffect } from 'react';


function App() {
  const postPerPage = 12
  const currentPageNum = 1
  const [carInfo, setCarInfo] = useState([])
  const [pageNum , setPageNum] = useState(currentPageNum)
  // const [currentPost , setCurrentPost] = useState([])
  
  useEffect(() => {
    axios.get('/selectAll').then((result)=>{setCarInfo(result.data)})
    // axios.get('/selectAll').then((result)=>console.log(result.data))
    // setCurrentPost(postList)
    
    // console.log(carInfo)
  },[])
  
  const firstIndex = (pageNum-1)*postPerPage
  const lastIndex = firstIndex + postPerPage
  const postList = carInfo.slice(firstIndex , lastIndex)
  

  useEffect(() => {
  },[])



  return ( 
    <div className="App">
      <Header/>
      <Board postList={postList}/>
      <Footer buttonLen={Math.ceil(carInfo.length/postPerPage)}
      pageNum={pageNum} setPageNum={setPageNum}
      />
    </div>
  );
}

export default App;
