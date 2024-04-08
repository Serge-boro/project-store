import { Link } from 'react-router-dom'
import { hero1, hero2, hero3, hero4 } from '../assets'
import { useState } from 'react'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const carouselImages = [
  { name: hero1 },
  { name: hero2 },
  { name: hero3 },
  { name: hero4 },
]
const Hero = () => {
  const [isIndex, setIsIndex] = useState(1)

  const { user } = useSelector((state) => state.userState.user)

  const { name } = carouselImages[isIndex]

  const nextItem = () => {
    setIsIndex((prev) => (prev + 1) % carouselImages.length)
  }
  const prevItem = () => {
    setIsIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    )
  }

  return (
    <div className='grid lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl'>
          We are changing the way people shop
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8 mb-8'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
          adipisci, voluptas, mollitia fuga sint temporibus explicabo quo
          sapiente necessitatibus neque id nam alias esse illum similique porro
          corporis voluptates ipsum praesentium, quod dicta sequi. Maxime
          laboriosam sapiente nulla. Dolores, fugiat.
        </p>
        <p className={`text-[#ff5efa] ${user && 'hidden'} `}>
          Please sign in or take the guest button to get more options
        </p>
        <div className='mt-10'>
          <Link to='/products' className='btn btn-primary'>
            our products
          </Link>
        </div>
      </div>
      <div className='hidden lg:carousel'>
        <button className='prev-btn' onClick={prevItem}>
          <FaChevronCircleLeft />
        </button>
        <div className=' h-[28rem] p-4 space-x-4 bg-neutral'>
          <img
            src={name}
            alt={name}
            className='rounded-box h-full w-80 object-cover'
          />
        </div>
        <button className='next-btn' onClick={nextItem}>
          <FaChevronCircleRight />
        </button>
      </div>
    </div>
  )
}

export default Hero
