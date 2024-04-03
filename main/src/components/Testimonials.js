import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-2 bg-gradient-to-tl bl shadow-2xl rounded-lg border-fuchsia-500 shadow-fuchsia-400 z-50 from-fuchsia-600 to-fuchsia-300">
      <div className="w-3/4 xs:w-5/6 m-auto my-10">
        <div className="">
          <Slider className="" {...settings}>
            {data.map((d, index) => (
              <div
                key={index}
                className="bg-white shadow-2xl hover:shadow-white transition-all duration-500  h-[450px] cursor-pointer font-poppins text-black rounded-xl"
              >
                <div className="h-60 bg-gradient-to-b from-indigo-500 to-violet-500 flex justify-center items-center rounded-t-xl">
                  <img
                    src={d.img}
                    alt=""
                    className="max-w-52 min-w-0 p-3 aspect-square  rounded-full"
                  />
                </div>

                <div className="flex flex-col items-center justify-center gap-4 p-4">
                  <p className="text-xl xs:text-lg font-semibold">{d.name}</p>
                  <p className="text-center xs:text-sm">{d.review}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    name: `John Morgan`,
    img: "https://res.cloudinary.com/dd6sontgf/image/upload/v1712155331/foto-sushi-6anudmpILw4-unsplash_hjbbcr.jpg",
    review: `CollaboHub has transformed the way we manage projects. It's intuitive, efficient, and incredibly helpful.`,
  },
  {
    name: `Ellie Anderson`,
    img: "https://res.cloudinary.com/dd6sontgf/image/upload/v1712155330/fred-moon-vSI2KnI4Abc-unsplash_vseraj.jpg",
    review: `Using CollaboHub has been a game-changer for our team. The real-time updates and collaboration features are invaluable.`,
  },
  {
    name: `Nia Adebayo`,
    img: "https://res.cloudinary.com/dd6sontgf/image/upload/v1712155335/vicky-hladynets-uyaTT9u6AvI-unsplash_uzprpf.jpg",
    review: `I can't imagine managing projects without CollaboHub now. It's made our workflow so much smoother and more organized.`,
  },
  {
    name: `Rigo Louie`,
    img: "https://res.cloudinary.com/dd6sontgf/image/upload/v1712155328/craig-mckay-jmURdhtm7Ng-unsplash_acpyke.jpg",
    review: `CollaboHub is a must-have tool for any team. It's user-friendly, efficient, and has everything we need to stay on track with our projects.`,
  },
  {
    name: `Mia Williams`,
    img: "https://res.cloudinary.com/dd6sontgf/image/upload/v1712155330/nith-in-w1N1WmLDyHU-unsplash_lrbyjc.jpg",
    review: `We've tried other project management tools, but nothing compares to CollaboHub. It's intuitive, reliable, and has greatly improved our productivity.`,
  },
];

export default Testimonials;
