import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Typewriter } from "react-simple-typewriter"; 
import useScrollToTop from "../../Hooks/useScrollToTop";

const Banner = () => {
  useScrollToTop();

// https://i.ibb.co.com/02Z5NnW/freepik-1.jpg
// https://i.ibb.co.com/j8zT4Q5/freepik-2.jpg
// https://i.ibb.co.com/Tg68C5Q/success-1.jpg
// https://i.ibb.co.com/X7YpLFB/success-2.jpg

  const successStories = [
    {
      id: 1,
      title: "Life Saved in Time",
      description:
        "A quick response during our health camp in Dhaka saved a child's life. Early detection of a critical illness ensured timely treatment.",
      image: "https://i.ibb.co.com/nL0zwXv/patient-2.jpg",
    },
    {
      id: 2,
      title: "Empowering Local Communities",
      description:
        "Our camp in rural Chattogram provided free medical checkups to over 500 people, creating a positive impact and improving awareness.",
      image: "https://i.ibb.co.com/Tg68C5Q/success-1.jpg",
    },
    {
      id: 3,
      title: "Smiles Restored",
      description:
        "Dental care services offered in Rajshahi gave 200+ people their confidence back with professional treatments.",
      image: "https://i.ibb.co.com/nL0zwXv/patient-1.jpg",
    },
    {
      id: 4,
      title: "Smiles Restored",
      description:
        "Dental care services offered in Rajshahi gave 200+ people their confidence back with professional treatments.",
      image: "https://i.ibb.co.com/z4dwtTF/doctor-patient-1600x900.webp",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-50 ">
      {/* Carousel */}
      <div className="container mx-auto">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={3500}
          showStatus={false}
          showArrows
          swipeable
          className="rounded-lg overflow-hidden"
        >
          {successStories.map((story) => (
            <div key={story.id} className="relative h-[420px]">
              {/* Image */}
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full lg:object-center"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
              {/* Text Content */}
              <div className="absolute bottom-8 left-8 right-8 ">
                <h3 className="text-3xl font-bold mb-2 text-teal-500">
                  <Typewriter
                    words={[story.title]}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                  />
                </h3>
                <p className="text-lg text-white font-semibold">{story.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
