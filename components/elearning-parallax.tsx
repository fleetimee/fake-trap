"use client"

import React from "react"

import { HeroParallax } from "@/components/ui/hero-parallax"

export function ElearningParallax() {
  return <HeroParallax products={products} />
}
export const products = [
  {
    title: "Authentikasi",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image1.png`,
  },
  {
    title: "Kewenangan",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image2.png`,
  },
  {
    title: "Dashboard Peserta",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image3.png`,
  },

  {
    title: "Pengaturan",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image4.png`,
  },
  {
    title: "Pembelajaran",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image5.png`,
  },
  {
    title: "Ujian",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image6.png`,
  },

  {
    title: "Leaderboard",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image7.png`,
  },
  {
    title: "Pemateri Divisi",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image8.png`,
  },
  {
    title: "Modul",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image9.png`,
  },
  {
    title: "Materi",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image10.png`,
  },
  {
    title: "Ujian Maker",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image11.png`,
  },

  {
    title: "Buat Soal",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image12.png`,
  },
  {
    title: "Approval Pemateri",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image13.png`,
  },
  {
    title: "Operator LMS",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image14.png`,
  },
  {
    title: "Supervisor Operator LMS",
    thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/parallax/image15.png`,
  },
]
