import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const successStories = [
    {
      id: 1,
      title: "Life Saved in Time",
      description:
        "A quick response during our health camp in Dhaka saved a child's life. Early detection of a critical illness ensured timely treatment.",
      image: "https://i.ibb.co.com/S6k5tkc/diabetes.jpg",
    },
    {
      id: 2,
      title: "Empowering Local Communities",
      description:
        "Our camp in rural Chattogram provided free medical checkups to over 500 people, creating a positive impact and improving awareness.",
      image: "https://i.ibb.co.com/NyBfXW4/fitness.webp",
    },
    {
      id: 3,
      title: "Smiles Restored",
      description:
        "Dental care services offered in Rajshahi gave 200+ people their confidence back with professional treatments.",
      image: "https://i.ibb.co.com/27655Cv/mental.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className="bg-gray-100 py-8">
      <h2 className="text-4xl font-bold text-center mb-6">
        Success Stories & Impactful Moments
      </h2>
      <div className="container mx-auto">
        <Slider {...settings}>
          {successStories.map((story) => (
            <div key={story.id} className="p-4">
              <div className="relative h-[400px]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full  rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 rounded-lg"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold">{story.title}</h3>
                  <p className="text-sm mt-2">{story.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
