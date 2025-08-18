"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Adebayo Johnson",
    location: "Lagos, Nigeria",
    rating: 5,
    comment: "Amazing quality products & super fast delivery. Got my iPhone & airpod in less than an hour after ordering!",
    image: "/fi.jpg",
  },
  {
    name: "Sarah Okafor",
    location: "Abuja, FCT",
    rating: 5,
    comment: "Best tech store in Nigeria. Their customer service is outstanding.",
    image: "/hi.jpg",
  },
  {
    name: "Michael Eze",
    location: "Port Harcourt, Rivers",
    rating: 4,
    comment: "Genuine products at competitive prices. Highly recommended!",
    image: "/sd.jpg",
  },
  {
    name: "Fatima Bello",
    location: "Kano, Nigeria",
    rating: 5,
    comment: "They literally got u covered when searching for top notch gadgets & accessories.. Welldone Cyfa Tech Store",
    image: "/hh.jpg",
  },
  {
    name: "Johnbull Osaro",
    location: "Lagos, Nigeria",
    rating: 4,
    comment: "Excellent service and fast shipping.",
    image: "/pe.jpg",
  },
  {
    name: "Edwin Ighodaro",
    location: "Abuja, Nigeria",
    rating: 4,
    comment: "Fun experience Shopping",
    image: "/lo.jpg",
  },
  {
    name: "David benson",
    location: "Edo, Nigeria",
    rating: 5,
    comment: "Excellent service and fast shipping.",
    image: "/ge.jpg",
  },
  {
    name: "isreal Kennedy",
    location: "Delta, Nigeria",
    rating: 4,
    comment: "My surest plug for all tech gadgets. Their prices are unbeatable!",
    image: "/so.jpg",
  },
];

export default function TestimonialsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const itemsPerSlide = 3; // Desktop view
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleTestimonials = () => {
    const start = currentSlide * itemsPerSlide;
    return testimonials.slice(start, start + itemsPerSlide);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3 text-black">What Our Customers Say</h2>
        <p className="text-gray-600 text-center mb-12">Real reviews from satisfied customers</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-transform duration-500">
          {getVisibleTestimonials().map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image ?? "/ge.jpg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover w-[50px] h-[50px]"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Numbered Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                index === currentSlide
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
