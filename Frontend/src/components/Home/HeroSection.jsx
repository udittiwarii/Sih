import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import image1 from '../../images/istockphoto-1752927355-612x612.webp'
import image3 from '../../images/dow.webp'
import image4 from '../../images/download.jpg'

const heroImages = [
  
  image1,
  image3,
  image4
];

export default function HeroSection() {
  return (
    <section className="bg-blue-50">
      <div className="container mx-auto px-4 py-12 md:flex md:items-center md:gap-8">
        {/* Left Info */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-800">
            Clean & Green – Save the Ganga
          </h1>
          <p className="text-gray-700 mb-6 text-base sm:text-lg">
            Report pollution, track clean-ups, and join the community to keep Ganga clean.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Swiper */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <Swiper
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
          >
            {heroImages.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
