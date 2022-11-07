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
      inputInfo.current[5].value = '*사진을 첨부해주세요.'
      inputInfo.current[5].style.border='2px solid #e61332'
      inputInfo.current[5].classList.add('input-empty')
      return
    }
    if(inputInfo.current[5].classList.contains('input-empty')){
      inputInfo.current[5].classList.remove('input-empty')
    }
    inputInfo.current[5].style.border='1px solid black'
    let reader = new FileReader()
    inputInfo.current[5].value = fileBlob.name
    setImg(fileBlob)
    console.log(fileBlob)
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
          {imgSrc ? <img className='thumbnail-img' src={imgSrc} alt="" /> : <span className='thmb-span'>차량 사진을 등록해주세요</span>}
        </div>
        <form className='submit-box' onSubmit={handleSubmitCarInfo} encType="multipart/form-data">
          <div className='filebox'>
            <label className='upload-img' htmlFor="car-img">사진 선택</label>
            <input className='upload-name'  placeholder='첨부파일' disabled={true} ref={el=>inputInfo.current[5]=el}/>
            <input type="file" accept='image/*' name='file' id='car-img' style={{width:100}} className="car-img" onChange={(e)=>handleChangeImgInput(e.target.files[0])}/>
          </div>
          <div>
            <label htmlFor="car-maker-input">제조사</label>
            <input type="text" id='car-maker-input' placeholder='필수항목입니다.' className="car-maker-input" ref={el=>inputInfo.current[0]=el}/>
          </div>
          <div>
            <label htmlFor="car-model-input">모델명</label>
            <input type="text" id='car-model-input' placeholder='필수항목입니다.' className="car-model-input" ref={el=>inputInfo.current[1]=el}/>
          </div>
          <div>
            <label htmlFor="car-prod-year-input">년식</label>
            <input type="month" id='car-prod-year-input'  className="car-prod-year-input" ref={el=>inputInfo.current[2]=el}/>
          </div>
          <div>
            <label htmlFor="car-distance-input">주행 거리</label>
            <input type="text" id='car-distance-input' placeholder='필수항목입니다.' className="car-distance-input" ref={el=>inputInfo.current[3]=el}/>
            <span> km</span>
          </div>
          <div>
            <label htmlFor="car-price-input">가격</label>
            <input type="text" id='car-price-input' placeholder='필수항목입니다.' className="car-price-input" ref={el=>inputInfo.current[4]=el}/>
            <span> 만원</span>
          </div>
          <button className='submit-button'>등록</button>
        </form>
      </div>
  )
}
