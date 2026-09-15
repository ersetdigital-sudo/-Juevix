"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import type { HeroSlide } from "@/lib/db";

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  return (
    <section className="rounded-[20px] overflow-hidden relative jx-heroslider">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
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
