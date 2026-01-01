import React, { useState, useEffect } from 'react';
import {
  Home, Calendar, MapPin, Users, Bed, Utensils, Waves,
  Camera, Star, Mail, Phone, ChevronDown, Menu, X,
  Trees, Bike, UtensilsCrossed, Compass, Building, Anchor,
  ChevronLeft, ChevronRight, MessageCircle, Quote
} from 'lucide-react';

const DanishSummerHouse = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Gallery images - EDIT THIS ARRAY to reorder, remove, or change photos
  // To reorder: move lines up/down, To remove: delete the line, To change title: edit the text
  const galleryImages = [
    '/danish-summer-house/images/_a0a2586-2-edit.jpg',
    '/danish-summer-house/images/_A0A2591-2-Edit 2.jpg',
    '/danish-summer-house/images/_A0A2607.jpg',
    '/danish-summer-house/images/_A0A2613-Pano.jpg',
    '/danish-summer-house/images/_A0A2894-Edit.jpg',
    '/danish-summer-house/images/_A0A2903-Edit.jpg',
    '/danish-summer-house/images/_A0A2907-Edit-2.jpg',
    '/danish-summer-house/images/_A0A2919.jpg',
    '/danish-summer-house/images/_A0A2929.jpg',
    '/danish-summer-house/images/_a0a2931.jpg',
    '/danish-summer-house/images/_A0A3414.jpg',
    '/danish-summer-house/images/_A0A6778.jpg',
    '/danish-summer-house/images/_A0A7144-Edit 2.jpg',
    '/danish-summer-house/images/_A0A7246.jpg',
    '/danish-summer-house/images/_A0A7264-HDR.jpg',
    '/danish-summer-house/images/_A0A9528-2.jpg',
    '/danish-summer-house/images/_A0A9530.jpg',
    '/danish-summer-house/images/_A0A9536-2.jpg',
    '/danish-summer-house/images/_A0A9631-2.jpg',
    '/danish-summer-house/images/_MG_2850.jpg',
    '/danish-summer-house/images/_MG_2863-Edit.jpg',
    '/danish-summer-house/images/_MG_2877-Edit-2-Edit.jpg',
    '/danish-summer-house/images/_MG_2898-Edit 2.jpg',
    '/danish-summer-house/images/_MG_2945.jpg',
    '/danish-summer-house/images/_MG_2955.jpg',
    '/danish-summer-house/images/_MG_3014.jpg',
    '/danish-summer-house/images/_MG_3135.jpg',
    '/danish-summer-house/images/_MG_3391-Edit.jpg',
    '/danish-summer-house/images/_MG_3465.jpg',
    '/danish-summer-house/images/_MG_7971.jpg',
    '/danish-summer-house/images/_MG_8632.jpg',
    '/danish-summer-house/images/_RML7063-Edit.jpg',
    '/danish-summer-house/images/_RML7127.jpg',
    '/danish-summer-house/images/_RML9849-HDR.jpg',
    '/danish-summer-house/images/_RML9851-HDR.jpg',
    '/danish-summer-house/images/_RML9867.jpg',
    '/danish-summer-house/images/_RML9868.jpg',
    '/danish-summer-house/images/_RML9877.jpg',
    '/danish-summer-house/images/_RML9887.jpg',
    '/danish-summer-house/images/_RML9889.jpg',
    '/danish-summer-house/images/20111020155401061.jpg',
    '/danish-summer-house/images/annexeplan.jpg',
    '/danish-summer-house/images/DJI_0212-3.jpg',
    '/danish-summer-house/images/IMG_1268.jpg',
    '/danish-summer-house/images/IMG_1578.jpg',
    '/danish-summer-house/images/IMG_2554.jpg',
    '/danish-summer-house/images/IMG_5028.jpg',
    '/danish-summer-house/images/IMG_9894.jpg',
    '/danish-summer-house/images/Q1010029.jpg',
    '/danish-summer-house/images/Q1010384.jpg',
    '/danish-summer-house/images/Q1010388.jpg',
    '/danish-summer-house/images/Q1010389.jpg',
    '/danish-summer-house/images/Q1010450-Edit-2.jpg',
    '/danish-summer-house/images/RML07462.jpg',
    '/danish-summer-house/images/RML08037.jpg',
    '/danish-summer-house/images/Screenshot 2024-11-25 at 17.08.46.jpg',
    '/danish-summer-house/images/Screenshot 2024-11-25 at 17.10.21.jpg',
    '/danish-summer-house/images/SOLKROGENPHOTO.jpg'
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "The property really is as good as, if not better than, its on-line description and photos. It was beautifully presented and well-maintained, but still a family home that felt welcoming.",
      author: "Anonymous Guest",
      title: "5-Star Review",
      rating: 5
    },
    {
      id: 2,
      text: "The house is truly set in an amazing secluded residential spot with a most unique and breathtaking view. The house is large, airy and open-planned and works well with large families.",
      author: "Anonymous Guest",
      title: "Very Special Property",
      rating: 5
    },
    {
      id: 3,
      text: "This place is just wonderful. A beautiful house with a stunning view, large, well equipped, clean and delicate. We also really enjoyed the big garden and the beach.",
      author: "Anonymous Guest",
      title: "Wonderful Stay",
      rating: 5
    },
    {
      id: 4,
      text: "We had a fantastic and memorable time, the property is in an outstanding position with views across the straits to Sweden and the gardens are delightful. The property itself is extremely well appointed and has a homely and luxurious atmosphere.",
      author: "Anonymous Guest",
      title: "We Will Come Again",
      rating: 5
    }
  ];

  // Things to do locally
  const localAttractions = [
    {
      icon: Building,
      title: "Gilleleje Town",
      description: "Charming fishing village with restaurants, harbor fish cafes, and shops. Just 10 minutes away.",
      distance: "5 km",
      image: "/danish-summer-house/images/Gilleleje-Town.jpg"
    },
    {
      icon: Building,
      title: "Hornbæk Beach",
      description: "Beautiful sandy beach with cafes and water sports. Perfect for families.",
      distance: "8 km",
      image: "/danish-summer-house/images/Hornbaek.jpg"
    },
    {
      icon: Compass,
      title: "Louisiana Museum",
      description: "World-renowned modern art museum with stunning sea views and sculpture gardens.",
      distance: "25 km",
      image: "/danish-summer-house/images/Louisiana.jpg"
    },
    {
      icon: Building,
      title: "Kronborg Castle",
      description: "UNESCO World Heritage Site - Hamlet's castle in Helsingør.",
      distance: "20 km",
      image: "/danish-summer-house/images/kronborg-Castle.jpg"
    },
    {
      icon: Building,
      title: "Copenhagen",
      description: "Denmark's vibrant capital city with historic landmarks, world-class museums, and colorful Nyhavn harbor.",
      distance: "60 km",
      image: "/danish-summer-house/images/Copenhagen.jpg"
    },
    {
      icon: Bike,
      title: "Cycling Routes",
      description: "Scenic coastal cycling paths through charming villages and countryside.",
      distance: "On doorstep",
      image: "/danish-summer-house/images/cycling-routes.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Crimson Text', serif" }}>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">

            {/* Logo/Brand */}
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold tracking-wide"
            >
              <span className="text-blue-900">DANISH</span>
              <span className="text-blue-400 ml-2">SUMMER HOUSE</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
              >
                PHOTOS & VIDEO
              </button>
              <button
                onClick={() => scrollToSection('things-to-do')}
                className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
              >
                THINGS TO DO
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
              >
                TESTIMONIALS
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                CONTACT
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-blue-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left text-blue-900 hover:text-blue-600 font-medium py-2"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-blue-900 hover:text-blue-600 font-medium py-2"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-left text-blue-900 hover:text-blue-600 font-medium py-2"
              >
                PHOTOS & VIDEO
              </button>
              <button
                onClick={() => scrollToSection('things-to-do')}
                className="block w-full text-left text-blue-900 hover:text-blue-600 font-medium py-2"
              >
                THINGS TO DO
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left text-blue-900 hover:text-blue-600 font-medium py-2"
              >
                TESTIMONIALS
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                CONTACT
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Video */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/danish-summer-house/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Beachfront Danish<br />Summer House
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-50">
            Between Gilleleje and Hornbæk, Denmark
          </p>
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            A beautiful 1930s art deco-inspired summerhouse, recently modernised and extended,
            with breathtaking views across the straits to Sweden
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('about')}
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Explore the Property
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 border-2 border-white/30"
            >
              Book Your Stay
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        >
          <ChevronDown className="w-10 h-10" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              About the House
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A stunning beachfront property perfect for families and groups
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-blue-50 p-8 rounded-2xl text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Prime Location</h3>
              <p className="text-gray-700">
                1 hour north of Copenhagen airport, between Gilleleje and Hornbæk
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Sleeps 10+</h3>
              <p className="text-gray-700">
                4 bedrooms in main house plus 2-bedroom annexe
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl text-center">
              <Waves className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Beachfront Views</h3>
              <p className="text-gray-700">
                Breathtaking views across the straits to Sweden
              </p>
            </div>
          </div>

          {/* Property Description */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-12 rounded-3xl mb-16">
            <div className="grid md:grid-cols-2 gap-12">

              {/* Left Column */}
              <div>
                <h3 className="text-3xl font-bold mb-6">Property Features</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Bed className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Main House - 4 Bedrooms</p>
                      <p className="text-blue-100 text-sm">Master bedroom with super king bed and ensuite, 2 rooms with twin beds, 1 room with 4 bunk beds</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Home className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Annexe - 2 Bedrooms</p>
                      <p className="text-blue-100 text-sm">Completed last year, each with twin beds</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Utensils className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Modern Kitchen</p>
                      <p className="text-blue-100 text-sm">Induction hob, 2 dishwashers, Nespresso machine, fully equipped</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Waves className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Bathrooms</p>
                      <p className="text-blue-100 text-sm">Family bathroom, additional bathroom with sauna and steam shower</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-3xl font-bold mb-6">Outdoor Amenities</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Trees className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Large Garden</p>
                      <p className="text-blue-100 text-sm">Spacious outdoor area with beautiful landscaping</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Bike className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Recreation Facilities</p>
                      <p className="text-blue-100 text-sm">Football pitch, ping pong table</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Anchor className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Beach Access</p>
                      <p className="text-blue-100 text-sm">Direct access to the beach and stunning coastal walks</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Quiet Location</p>
                      <p className="text-blue-100 text-sm">Secluded residential spot with privacy and tranquility</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gray-50 p-12 rounded-3xl">
            <h3 className="text-3xl font-bold text-blue-900 mb-8 text-center">Rental Information</h3>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Main House + 2 Bedrooms Annexe</p>
                  <p className="text-4xl font-bold text-blue-900 mb-4">DKK 15,000</p>
                  <p className="text-gray-500">per week</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Main House + 2 Bedrooms</p>
                  <p className="text-4xl font-bold text-blue-900 mb-4">DKK 30,000</p>
                  <p className="text-gray-500">per week (except Xmas/New Year)</p>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto space-y-3 text-gray-700">
              <p className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Mandatory cleaning charge: DKK 2,500</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Linens fee: DKK 150 per person</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Available for much of the year - contact for availability</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Photo Gallery
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Explore the beauty and comfort of our beachfront property
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video">
              <video
                controls
                className="w-full h-full object-cover"
                poster="/danish-summer-house/images/DJI_0212-3.jpg"
              >
                <source src="/danish-summer-house/videos/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-center text-gray-600 mt-4 text-lg">
              Video tour of the property and surrounding area
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((imagePath, index) => (
              <div
                key={index}
                onClick={() => {
                  setLightboxImage(index);
                  setLightboxOpen(true);
                }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                {/* Actual image */}
                <img
                  src={imagePath}
                  alt={`Beachfront summer house rental North Zealand Denmark - ${
                    index % 8 === 0 ? 'sea view to Sweden' :
                    index % 8 === 1 ? 'interior living space Gilleleje' :
                    index % 8 === 2 ? 'garden and outdoor area' :
                    index % 8 === 3 ? 'bedroom accommodation' :
                    index % 8 === 4 ? 'kitchen and dining' :
                    index % 8 === 5 ? 'bathroom facilities' :
                    index % 8 === 6 ? 'exterior beachfront property' :
                    'Danish coastal holiday home'
                  }`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all"></div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-12">
            Click any photo to view in full size
          </p>
        </div>
      </section>

      {/* Things to Do Section */}
      <section id="things-to-do" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Things to Do Locally
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the charm of North Zealand with its beautiful beaches, historic sites, and Danish culture
            </p>
          </div>

          {/* Attractions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localAttractions.map((attraction, index) => {
              const Icon = attraction.icon;
              return (
                <div
                  key={index}
                  className="relative rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group h-80"
                >
                  {/* Background Image */}
                  <img
                    src={attraction.image}
                    alt={attraction.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8 text-white">
                    <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3">
                      {attraction.title}
                    </h3>

                    <p className="text-white/90 mb-4 leading-relaxed">
                      {attraction.description}
                    </p>

                    <div className="flex items-center text-white font-semibold">
                      <MapPin className="w-4 h-4 mr-2" />
                      {attraction.distance}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-blue-900 text-white p-12 rounded-3xl text-center">
            <h3 className="text-3xl font-bold mb-4">Explore the Danish Riviera</h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
              The property is ideally located for exploring the beautiful coastline, charming villages,
              and cultural attractions of North Zealand. Perfect for families and groups seeking both
              relaxation and adventure. The shops, restaurants, museums and attractions of Copenhagen are an hour away.
            </p>
            <p className="text-blue-200">
              Recommendations for local restaurants, shops, and activities can be provided upon booking.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Guest Testimonials
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              All five star homeaway.co.uk reviews from 2014/2015
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <Quote className="w-10 h-10 text-blue-600 opacity-30" />
                  <div className="flex ml-auto">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-blue-900">{testimonial.title}</p>
                  <p className="text-gray-500 text-sm">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Reviews Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              More reviews available upon request
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Get in touch
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Contact us to check availability and make a reservation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Contact us:</h3>
              <p className="text-gray-600 mb-8">Please fill in the boxes on this page</p>

              <form action="mailto:info@danishsummerhouse.com" method="post" encType="text/plain" className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name *"
                    required
                    className="w-full px-4 py-3 bg-blue-900 text-white placeholder-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email *"
                    required
                    className="w-full px-4 py-3 bg-blue-900 text-white placeholder-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-blue-900 text-white placeholder-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="6"
                    className="w-full px-4 py-3 bg-blue-900 text-white placeholder-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  ></textarea>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@danishsummerhouse.com" className="text-blue-600 hover:text-blue-800">
                    info@danishsummerhouse.com
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Location:</strong> Between Gilleleje & Hornbæk, North Zealand
                </p>
                <p className="text-gray-700">
                  <strong>Availability:</strong> Much of the year
                </p>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=56.1148,12.3556&zoom=15&maptype=roadmap"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Location - North Zealand Coast"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">DANISH SUMMER HOUSE</h3>
            <p className="text-blue-300 mb-6">Your Perfect Coastal Retreat</p>

            <div className="flex justify-center gap-8 mb-6">
              <button
                onClick={() => scrollToSection('home')}
                className="text-blue-200 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-blue-200 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-blue-200 hover:text-white transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('things-to-do')}
                className="text-blue-200 hover:text-white transition-colors"
              >
                Things to Do
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-blue-200 hover:text-white transition-colors"
              >
                Testimonials
              </button>
            </div>

            <div className="border-t border-blue-800 pt-6">
              <p className="text-blue-300 text-sm">
                © 2025 Danish Summer House. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal (for gallery images) */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300"
          >
            <X className="w-10 h-10" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImage((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
            }}
            className="absolute left-6 text-white hover:text-gray-300"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <div className="max-w-6xl max-h-[90vh] relative">
            <img
              src={galleryImages[lightboxImage]}
              alt={`Beachfront summer house rental North Zealand Denmark - ${
                lightboxImage % 8 === 0 ? 'sea view to Sweden' :
                lightboxImage % 8 === 1 ? 'interior living space Gilleleje' :
                lightboxImage % 8 === 2 ? 'garden and outdoor area' :
                lightboxImage % 8 === 3 ? 'bedroom accommodation' :
                lightboxImage % 8 === 4 ? 'kitchen and dining' :
                lightboxImage % 8 === 5 ? 'bathroom facilities' :
                lightboxImage % 8 === 6 ? 'exterior beachfront property' :
                'Danish coastal holiday home'
              }`}
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
            />
            <p className="text-white text-center mt-4 text-lg">
              Image {lightboxImage + 1} of {galleryImages.length}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImage((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
            }}
            className="absolute right-6 text-white hover:text-gray-300"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DanishSummerHouse;
