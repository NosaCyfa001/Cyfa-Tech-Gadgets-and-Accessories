"use client";
import { Button } from '@/components/ui/button';
import {
  Zap, Shield, Award, Users, Smartphone, Headphones, Watch, Battery,
  MapPin, Clock, Phone, Calendar, Trophy, TrendingUp, Globe
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function CompleteAboutPage() {
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0);

  const values = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: 'Innovation First',
      description: 'We stay ahead of tech trends to bring you the most cutting-edge gadgets before they hit mainstream.'
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: 'Quality Assured',
      description: 'Every product undergoes rigorous testing. We partner only with trusted brands and verified suppliers.'
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: 'Best Value',
      description: 'Premium tech shouldn\'t break the bank. We negotiate the best prices so you get more for less.'
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-500" />,
      title: 'Customer Obsessed',
      description: 'Your experience matters. From browsing to unboxing, we\'ve designed every touchpoint with you in mind.'
    }
  ];

  const team = [
    {
      name: 'Nosa Ugobor (Cyfa)',
      role: 'Founder & CEO',
      bio: 'Tech entrepreneur with 8+ years in Software development. Previously at Meta & Google.',
      image: '/cyfa.jpg'
    },
    {
      name: 'Kemi Adeleke',
      role: 'Branch Manager/Financial Strategist',
      bio: 'Dedicated to managing supply chains, company finances and relationships with global suppliers.',
      image: '/ol.jpg'
    },
    {
      name: 'Moses Ayodeji',
      role: 'Tech Specialist',
      bio: 'Our resident gadget guru who tests every product that comes in and out our door and maintains our high-quality standards before shipping.',
      image: '/vh.jpg'
    },
    {
      name: 'Ibrahim Suleiman',
      role: 'Marketing Director',
      bio: 'Creative marketer who ensures our brand reaches the right audience across Africa & beyond.',
      image: '/dd.jpg'
    },
    {
      name: 'Itohan Ivbongo',
      role: 'Sales Representative',
      bio: 'Dedicated to helping every customer find their perfect tech solution.',
      image: '/cc.jpg'
    },
    {
      name: 'Chioma Okeke',
      role: 'Sales Representative',
      bio: 'Guides customers in discovering the right gadgets that fit their lifestyle and needs.',
      image: '/ll.jpg'
    },
    {
      name: 'Ahmed Hassan',
      role: 'Logistics Coordinator',
      bio: 'Ensures fast and secure delivery of products to customers nationwide.',
      image: '/so.jpg'
    },
    {
      name: 'Abraham Opara',
      role: 'Social Media Manager',
      bio: 'Creates engaging content and manages our online community presence.',
      image: '/bjx.jpg'
    },
  ];

  const milestones = [
    { year: '2019', event: 'Founded in Lagos', icon: <Calendar className="w-5 h-5" /> },
    { year: '2020', event: '1,000+ Happy Customers', icon: <Users className="w-5 h-5" /> },
    { year: '2021', event: 'Now in 7 locations', icon: <MapPin className="w-5 h-5" /> },
    { year: '2022', event: 'Website Officially Live!', icon: <Globe className="w-5 h-5" /> },
    { year: '2023', event: '25,000+ Products Sold', icon: <TrendingUp className="w-5 h-5" /> },
    { year: '2024', event: '50,000+ Customers Served', icon: <Trophy className="w-5 h-5" /> }
  ];

  const productCategories = [
    { icon: <Smartphone className="w-8 h-8" />, name: 'Smartphones', count: '500+' },
    { icon: <Headphones className="w-8 h-8" />, name: 'Audio Gear', count: '300+' },
    { icon: <Watch className="w-8 h-8" />, name: 'Smartwatches', count: '200+' },
    { icon: <Battery className="w-8 h-8" />, name: 'Accessories', count: '1000+' }
  ];

  const nextTeamSlide = () => {
    setCurrentTeamSlide((prev) => (prev + 1) % Math.ceil(team.length / 4));
  };

  const prevTeamSlide = () => {
    setCurrentTeamSlide((prev) => (prev - 1 + Math.ceil(team.length / 4)) % Math.ceil(team.length / 4));
  };

  const totalSlides = Math.ceil(team.length / 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded by a visionary tech entrepreneur who was tired of overpriced gadgets and mediocre service,
                <span className="font-bold text-blue-600"> Cyfa Tech</span> emerged from a simple belief:
                everyone deserves access to premium technology without the premium price tag.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                What started as a passion project has evolved into a trusted destination for over 50,000+ customers
                who demand quality, value, and exceptional service. We've built relationships with leading manufacturers
                to bring you authentic products at unbeatable prices.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we’re more than just a store—we’re a community of innovators and tech enthusiasts,
                with 7 branches across Lagos and Abuja, united by the belief that great technology should
                enrich every aspect of life.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-500 to-blue-400 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-white font-normal leading-relaxed">
                  To democratize access to cutting-edge technology by curating the best gadgets,
                  offering competitive prices, and delivering an experience that exceeds expectations at every turn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">Key milestones that shaped Cyfa Tech</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-yellow-500 to-blue-500"></div>

            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {milestone.icon}
                      <span className="font-bold text-blue-600">{milestone.year}</span>
                    </div>
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </div>

                <div className="w-4 h-4 bg-white border-4 border-blue-500 rounded-full relative z-10"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The Amazing people Behind Cyfa Tech</p>
          </div>

          <div className="relative">
            {/* Team Cards Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out cursor-pointer"
                style={{ transform: `translateX(-${currentTeamSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 min-w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {team.slice(slideIndex * 4, (slideIndex * 4) + 4).map((member, memberIndex) => (
                        <div key={memberIndex} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                          <div className="mb-4 flex justify-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden shadow-md group-hover:scale-110 transition-transform duration-300">
                              <Image
                                src={member.image}
                                alt={member.name}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                          <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center gap-3 mt-8">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTeamSlide(index)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 
                      hover:scale-110 
                      ${index === currentTeamSlide
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Us Today</h2>
            <p className="text-gray-600">Come, Experience Quality Firsthand</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group cursor-pointer">
              <MapPin className="w-8 h-8 text-red-500 mx-auto mb-4 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110" />
              <h3 className="text-lg mb-2 text-black font-bold">Visit Our Stores</h3>
              <p className="text-gray-600">
                8 Pepple St, computer village, Ikeja, Lagos.
                <br />
                72b Admiralty Way Lekki phase 1, Lagos.
                <br />
                Shop C9 Akinyemi complex, Ajah, Lagos.
                <br />
                No. 4, Ishawo Road, Agric Bus Stop, Ikorodu, Lagos.
                <br />
                Aminu Kano Cres, Wuse, Abuja 904101, FCT.
                <br />
                Shop A53A new Banex plaza wuse 2 Abuja.
                <br />
                Suit p6, kemu nivo way, beside BOSO Micro finance Bank, Abuja.
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <Clock className="w-8 h-8 text-cyan-500 mx-auto mb-4 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110" />
              <h3 className="text-lg mb-2 text-black font-bold">Store Hours</h3>
              <p className="text-gray-600">
                Sunday: <span className="text-red-500">Closed</span>
                <br />
                Mon-Wed: 9:30am - 5:30pm
                <br />
                Thursday: 10:00am - 5:30pm
                <br />
                Fri-Sat: 9:00am - 6:00pm
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <Phone className="w-8 h-8 text-neutral-600 mx-auto mb-4 transition-all duration-500 group-hover:scale-125 group-hover:-rotate-12" />
              <h3 className="text-lg mb-2 text-black font-bold">Get in Touch</h3>
              <p className="text-gray-600">
                09132496929
                <br />
                07014162335
                <br />
                08054546718
                <br />
                nosacyfa02@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

