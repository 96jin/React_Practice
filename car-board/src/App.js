import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, } from 'react-router-dom'
import Home from './components/Home';
import SellPage from './components/SellPage';
import Review from './components/Review';


function App() {
  // const [users, setUsers] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // const fetchUsers = async() => {
  //   try{
  //     setError(null)
  //     setUsers(null)
  //     setLoading(true)
  //     const response = await axios.get('/selectAll')
  //     setUsers(response.data)
  //   }
  //   catch(e){
  //     setError(e)
  //   }
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   fetchUsers()
  // },[])

  // if(loading){
  //   return <div>로딩중..</div>
  // }
  // if(error){
  //   return <div>에러 발생</div>
  // }
  // if(!users){
  //   return null
  // } 로딩, 에러하는동안 화면 표시 방지

  const postPerPage = 12
  const currentPageNum = 1

  // const [postList, setPostList] = useState([])
  const [carInfo, setCarInfo] = useState([])
  const [pageNum , setPageNum] = useState(currentPageNum)
  const [isSearch, setIsSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [easySearchMaker, setEasySearchMaker] = useState({
    maker:[],dis:[],price:[],year:[]})

  useEffect(() => {
    axios.get('/selectAll').then((result)=>{setCarInfo(result.data)})
  },[])

  const firstIndex = (pageNum-1)*postPerPage
  const lastIndex = firstIndex + postPerPage
  const copyCarList = [...carInfo]
  
  // 차 종류 중복 제거
  const carMaker = [...new Set(copyCarList.map((cars)=>(cars.car_maker)))]
  
  let postList = copyCarList.slice(firstIndex , lastIndex)
  let newPostList

  if(easySearchMaker.maker.length>=1){
    newPostList = carInfo.filter((cars)=>(
      easySearchMaker.maker.includes(cars.car_maker)
      ))
    postList = newPostList.slice(firstIndex, lastIndex)
    console.log(newPostList)
  }else{
    newPostList = carInfo
  }

  if (isSearch){
    newPostList = newPostList.filter(cars=>(
      cars.car_name.toUpperCase().includes(searchValue.toUpperCase()) || 
      cars.car_maker.toUpperCase().includes(searchValue.toUpperCase()
      )))
      postList = newPostList.slice(firstIndex, lastIndex)
    }  
  
  // if (isSearch){
  //   newPostList = carInfo.filter(cars=>(
  //     cars.car_name.toUpperCase().includes(searchValue.toUpperCase()) || 
  //     cars.car_maker.toUpperCase().includes(searchValue.toUpperCase()
  //     )))
  //     postList = newPostList.slice(firstIndex, lastIndex)
  //     console.log(newPostList)
  //   }

  // const sortByEasySearch  = (sort) => {
  //   console.log(easySearchMaker[sort])
  //   if (easySearchMaker.sort){
  //     newPostList = carInfo.filter(cars=>(
  //       cars.car_name.toUpperCase().includes(searchValue.toUpperCase()) || 
  //       cars.car_maker.toUpperCase().includes(searchValue.toUpperCase()
  //       )))
  //     newPostList = newPostList.filter((maker)=>easySearchMaker.sort.maker.filter((setMaker)=>setMaker===maker))
  //     console.log(postList)
  //     postList = newPostList.slice(firstIndex, lastIndex)
  // }}
  // sortByEasySearch('maker')
  

  // console.log(easySearchMaker['maker'])

  return ( 
    <BrowserRouter>
      <div className="App">
        <Header 
        setIsSearch={setIsSearch} 
        setSearchValue={setSearchValue} 
        setPageNum={setPageNum}
        />
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route 
            path='/buy/*'
            element={
            <Board postList={postList} totalCar={newPostList.length} buttonLen={Math.ceil((isSearch ? newPostList.length : carInfo.length)/postPerPage)}
            pageNum={pageNum} setPageNum={setPageNum} carMaker={carMaker} setEasySearchMaker={setEasySearchMaker} easySearchMaker={easySearchMaker}/>}
            />
            <Route path='/sell' element={<SellPage/>}/>
            <Route path='/review' element={<Review/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;