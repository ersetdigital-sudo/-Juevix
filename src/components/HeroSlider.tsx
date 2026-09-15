"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { heroSlides } from "@/data/games";

export function HeroSlider() {
  return (
    <section className="rounded-[20px] overflow-hidden relative jx-heroslider">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <Link href={slide.href} className="block">
              <Image
                src={slide.image}
                alt={slide.alt}
                width={1200}
                height={400}
                className="w-full h-auto"
                priority={i === 0}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
