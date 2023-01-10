import Image from "next/image";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

const BANNER_WIDTH = 1000; // the width of the banner in pixels
const BANNER_SPEED = 50; // the speed at which the banner elements move in pixels per second

const BANNER_IMAGES = [
  "beanie.png",
  "chicken hat.png",
  "eyes.png",
  "goon hat.png",
  "red glasses.png",
  "hat.png",
  "retro glasses.png",
  "sushi headband.png",
  "tophat.png",
];

const Banner = () => {
  return (
    <div className="h-[88px] bg-checker flex">
      <Marquee 
        className='w-full' 
        loop={0} 
        gradient={false}
        speed={60}
      >
        {BANNER_IMAGES.map((image, index) => (
          <div
            key={index}
            className="h-full flex items-center justify-center w-full"
          >
            <Image
              src={`/banner/${image}`}
              width={80}
              height={80}
              alt="logo"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Banner;
