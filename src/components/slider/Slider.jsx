import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style-slider.css';
// import required modules
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMovieData } from '../../action-creators/movies';
import getCommentsByMovieId from 'API/GetCommentsByID';
import { useAuth } from 'hooks/use-auth';
import getMovieRating from 'API/GetMovieRating';

const Slider = () => {
  const dispatch = useDispatch();
  const { email } = useAuth();

  function handleOnClick(id) {
    getMovieData(dispatch, id);
    getCommentsByMovieId(id, dispatch);
    getMovieRating(email, id, dispatch);
  }

  return (
    <div className='slider'>
      <>
        <Swiper
          effect={'coverflow'}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: -30,
            stretch: -70,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide><Link to='/movie'><img src="https://m.media-amazon.com/images/M/MV5BOWNmMzAzZmQtNDQ1NC00Nzk5LTkyMmUtNGI2N2NkOWM4MzEyXkEyXkFqcGc@._V1_SX300.jpg"
            onClick={() => {
              handleOnClick('tt6710474');
            }}
          /></Link></SwiperSlide>
          <SwiperSlide><Link to='/movie'><img src="https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_SX300.jpg"
            onClick={() => {
              handleOnClick('tt1877830');
            }}
          /></Link></SwiperSlide>
          <SwiperSlide><Link to='/movie'><img src="https://m.media-amazon.com/images/M/MV5BZTY2M2U5OTEtNDljYS00MGQwLWI4YzQtOGJiMzUxM2IyYjRhXkEyXkFqcGc@._V1_SX300.jpg"
            onClick={() => {
              handleOnClick('tt14114802')
            }}
          /></Link></SwiperSlide>
          <SwiperSlide><Link to='/movie'><img src="https://m.media-amazon.com/images/M/MV5BNmQxNjZlZTctMWJiMC00NGMxLWJjNTctNTFiNjA1Njk3ZDQ5XkEyXkFqcGc@._V1_SX300.jpg"
            onClick={() => {
              handleOnClick('tt1630029')
            }}
          /></Link></SwiperSlide>
          <SwiperSlide><Link to='/movie'><img src="https://m.media-amazon.com/images/M/MV5BODUyZjkxZDMtZGI3ZC00ZmEwLTgwMTUtYTU4OTQ5YjU4ZjRlXkEyXkFqcGc@._V1_SX300.jpg"
            onClick={() => {
              handleOnClick('tt12593682')
            }}
          /></Link></SwiperSlide>
          <SwiperSlide><Link to='/movie'><img src="https://m.media-amazon.com/images/M/MV5BYTViNzUyNDUtZTg3Yy00OTY4LWEyMTYtMmUzYjE3ZmZjYzUwXkEyXkFqcGc@._V1_SX300.jpg"
            onClick={() => {
              handleOnClick('tt7322224')
            }}
          /></Link></SwiperSlide>
          <SwiperSlide><Link to='/movie'><img src="https://m.media-amazon.com/images/M/MV5BMDBkZDNjMWEtOTdmMi00NmExLTg5MmMtNTFlYTJlNWY5YTdmXkEyXkFqcGc@._V1_SX300.jpg"
            onClick={() => {
              handleOnClick('tt1745960')
            }}
          /></Link></SwiperSlide>
          <SwiperSlide><Link to='/movie'><img src="https://m.media-amazon.com/images/M/MV5BYjUzMWU0ZTEtMjlhYy00YWEwLTlhOTktNzNkMTlhNGNiYmRlXkEyXkFqcGc@._V1_SX300.jpg"
            onClick={() => {
              handleOnClick('tt10168670')
            }}
          /></Link></SwiperSlide>
          <SwiperSlide><Link to='/movie'><img src="https://m.media-amazon.com/images/M/MV5BMGQxYTQyNDUtNmZkMi00MzQ4LWFhMTktNTYzOGQ1ZGMzYjQ2XkEyXkFqcGc@._V1_SX300.jpg"
            onClick={() => {
              handleOnClick('tt15301048')
            }}
          /></Link></SwiperSlide>
          <SwiperSlide><Link to='/movie'><img src="https://m.media-amazon.com/images/M/MV5BMWEzMTA3MjAtOTkwYS00ZTNlLWIzYzMtMDIxNzU0NTlkMGRlXkEyXkFqcGc@._V1_SX300.jpg"
            onClick={() => {
              handleOnClick('tt11291274')
            }}
          /></Link></SwiperSlide>
        </Swiper>
      </>
    </div>
  )
}

export default Slider
