import { EffectCoverflow, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LoginBgOne from "../../assets/Ball-4.png";
import LoginBgTwo from "../../assets/Ball-1.png";
import LoginBgThree from "../../assets/Ball-2.png";
import LoginBgFour from "../../assets/Ball-3.png";
import Logo from "../../assets/bilic.svg";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export interface AuthSidebarProps {
  imagePath?: string[];
  heading: string | React.ReactNode;
}

export const AuthSidebar: React.FC<AuthSidebarProps> = ({
  imagePath,
  heading,
}) => {
  return (
    // <div className="relative min-h-full hidden lg:block lg:w-[560px] overflow-hidden isolate bg-[#f3fff4]">
    <div className="relative min-h-full hidden lg:block lg:w-[560px] overflow-hidden isolate bg-[#343538]">
      <div className="absolute mt-8 ms-8">
        <img
          src="/providers/yearnLogo.svg"
          alt=""
          role="logo"
          // className="w-12 mb-3"
          className="w-[150px] mb-3"
        />
        <h4 className="text-3xl font-normal font-work_sans max-w-[360px] leading-[1.2] text-white">
          {heading}
        </h4>
      </div>
      <img
        src={LoginBgOne}
        alt=""
        className="absolute top-[-32px] right-[-50px] z-[-1]"
      />
      <img
        src={LoginBgTwo}
        alt=""
        className="absolute w-[60%] bottom-[-100px] left-[-80px] z-[-1]"
      />
      <img
        src={LoginBgThree}
        alt=""
        className="absolute w-[10%] top-[300px] left-[40px] z-[-1]"
      />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={1}
        coverflowEffect={{
          slideShadows: false,
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectCoverflow]}
        className="absolute top-[320px] left-4"
      >
        {imagePath?.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img src={imageUrl} alt={`Image ${index}`} className="w-[86%]" />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <img
          src={LoginBgAgent}
          alt=""
          className="absolute w-[86%] bottom-[400px] right-[30px] z-[-1]"
        /> */}
      <img
        src={LoginBgFour}
        alt=""
        className="absolute w-[36%] bottom-[300px] right-[30px] z-[600]"
      />
    </div>
  );
};

export default AuthSidebar;
