import axios from 'axios'
import React, { useRef, useState } from 'react'
import './css/sellpage.css'

export default function SellPage() {

  const inputInfo = useRef([])
  const [img, setImg] = useState('')
  const [imgSrc, setImgSrc] = useState()

  // 이미지 미리보기
  const handleChangeImgInput = async(fileBlob) => {
    if(!fileBlob){
      setImgSrc()
      return
    }
    let reader = new FileReader()
    setImg(fileBlob)
    reader.readAsDataURL(fileBlob)
    return new Promise((resolve)=>{
      reader.onload = () => {
        setImgSrc(reader.result)
        resolve()
      }
    })
  }

  const handleSubmitCarInfo = async(e) => {
    e.preventDefault()
    try{
      const formData = new FormData()
      formData.append('file', img)
      console.log(formData)
      formData.append('text',inputInfo.current[0].value)
      formData.append('text',inputInfo.current[1].value)
      formData.append('text',inputInfo.current[2].value)
      formData.append('text',inputInfo.current[3].value)
      formData.append('text',inputInfo.current[4].value)
      inputInfo.current.forEach((cur)=>cur.value='')
      setImgSrc('')
      await axios.post('/insertCar', formData)
      alert('등록 완료!')
    }catch(e){
      alert('제대로 입력해주세요')
    }
  }

  return (
      <div className='sellpage-wrap'>
        <div className="car-img-thumbnail">
          {imgSrc ? <img className='thumbnail-img' src={imgSrc} alt="" /> : <span>차량 사진을 등록해주세요</span>}
        </div>
        <form className='submit-box' onSubmit={handleSubmitCarInfo} encType="multipart/form-data">
          <div>
            <label htmlFor="car-img">사진</label>
            <input type="file" accept='image/*' name='file' id='car-img' className="car-img" onChange={(e)=>handleChangeImgInput(e.target.files[0])}/>
          </div>
          <div>
            <label htmlFor="car-maker-input">제조사</label>
            <input type="text" id='car-maker-input' className="car-maker-input" ref={el=>inputInfo.current[0]=el}/>
          </div>
          <div>
            <label htmlFor="car-model-input">모델 명</label>
            <input type="text" id='car-model-input' className="car-model-input" ref={el=>inputInfo.current[1]=el}/>
          </div>
          <div>
            <label htmlFor="car-prod-year-input">년식</label>
            <input type="month" id='car-prod-year-input' className="car-prod-year-input" ref={el=>inputInfo.current[2]=el}/>
          </div>
          <div>
            <label htmlFor="car-distance-input">주행 거리</label>
            <input type="text" id='car-distance-input' className="car-distance-input" ref={el=>inputInfo.current[3]=el}/>
          </div>
          <div>
            <label htmlFor="car-price-input">가격</label>
            <input type="text" id='car-price-input' className="car-price-input" ref={el=>inputInfo.current[4]=el}/>
          </div>
          <button>등록</button>
        </form>
      </div>
  )
}
