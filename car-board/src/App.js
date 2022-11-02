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
  const postPerPage = 12
  const currentPageNum = 1
  const [carInfo, setCarInfo] = useState([])
  const [pageNum , setPageNum] = useState(currentPageNum)
  const [isSearch, setIsSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  
  useEffect(() => {
    axios.get('/selectAll').then((result)=>{setCarInfo(result.data)})
    setIsSearch(false)
  },[])
  
  const firstIndex = (pageNum-1)*postPerPage
  const lastIndex = firstIndex + postPerPage
  const copyCarList = [...carInfo]
  const carMaker = new Set(carInfo.map(cars=>cars.car_maker))

  let postList = copyCarList.slice(firstIndex , lastIndex)
  let newPostList
  if (isSearch){
    newPostList = carInfo.filter(cars=>(
      cars.car_name.toUpperCase().includes(searchValue.toUpperCase()) || 
      cars.car_maker.toUpperCase().includes(searchValue.toUpperCase()
      )))
    postList = newPostList.slice(firstIndex, lastIndex)
  }
  
  return ( 
    <BrowserRouter>
      <div className="App">
        <Header 
        setIsSearch={setIsSearch} 
        setSearchValue={setSearchValue} 
        setPageNum={setPageNum}
        carMaker = {carMaker}
        />
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route 
            path='/buy/*'
            element={
            <Board postList={postList} totalCar={isSearch ? newPostList.length : carInfo.length} buttonLen={Math.ceil((isSearch ? newPostList.length : carInfo.length)/postPerPage)}
            pageNum={pageNum} setPageNum={setPageNum}/>}
            />
            <Route path='/sell' element={<SellPage/>}/>
            <Route path='/review' element={<Review/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
