/* eslint-disable no-unused-vars */
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import patientAvatar from "./../../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";

const Testimonials = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            breakpoints: 0,
          },
          768: {
            slidesPerView: 2,
            breakpoints: 20,
          },
          1024: {
            slidesPerView: 3,
            breakpoints: 30,
          },
        }}
      >
        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar} alt="patient Avatar Image" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Muhibur Rahman
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              “I have taken services from them. The treat so well and they are
              providing the best madical services.”
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar} alt="patient Avatar Image" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Muhibur Rahman
                </h4>
                <div className="flex items-center gap-1">
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                </div>
              </div>
            </div>
            <p className="text-[18px] leading-7 mt-4 text-textColor font-[400]">
              “I have taken services from them. The treat so well and they are
              providing the best madical services.”
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar} alt="patient Avatar Image" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Muhibur Rahman
                </h4>
                <div className="flex items-center gap-1">
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                </div>
              </div>
            </div>
            <p className="text-[18px] leading-7 mt-4 text-textColor font-[400]">
              “I have taken services from them. The treat so well and they are
              providing the best madical services.”
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar} alt="patient Avatar Image" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Muhibur Rahman
                </h4>
                <div className="flex items-center gap-1">
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                  <HiStar className="text-yellowColor w-[18px] h-5"></HiStar>
                </div>
              </div>
            </div>
            <p className="text-[18px] leading-7 mt-4 text-textColor font-[400]">
              “I have taken services from them. The treat so well and they are
              providing the best madical services.”
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonials;
