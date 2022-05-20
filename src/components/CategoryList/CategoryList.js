import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { useAppContext } from "../../AppContext";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <BsChevronRight
      className={className}
      style={{ ...style, display: "block", color: "gray" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <BsChevronLeft
      className={className}
      style={{ ...style, display: "block", color: "gray" }}
      onClick={onClick}
    />
  );
}

export default function CategoryList() {
  const url = "http://hkportfolio.local/wp-json/api/projects/categories";
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchData, setCurrentCatId, currentCatId } = useAppContext();
  const buttonRefs = useRef([]);

  useEffect(() => {
    const getCategories = async () => {
      const cat = await fetchData(url);
      const newCat = [{ name: "All" }, ...cat];
      // setCategories(await fetchData(url));
      setCategories(newCat);
    };
    getCategories();
  }, []);

  const categoryClickHandler = (e) => {
    // remove prev .active class
    console.log(buttonRefs.current);
    buttonRefs.current.forEach(
      (item) =>
        item.classList.contains("active-category") &&
        item.classList.remove("active-category")
    );
    e.target.classList.add("active-category");
    setCurrentCatId(parseInt(e.target.value));
  };

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <div className="row mb-2">
        <div className="col-sm-8 mx-auto">
          <Slider {...settings}>
            {/* <button
              className="hk-btn active-category"
              value={0}
              onClick={(e) => categoryClickHandler(e)}
              ref={(element) => {
                buttonRefs.current[0] = element;
              }}
            >
              All
            </button> */}
            {categories.map((category, index) => {
              return (
                <button
                  key={index}
                  // className={`hk-btn ${index == 0 && "active-category"}`}
                  className={`hk-btn ${
                    (index == currentCatId ||
                      currentCatId == category.term_id) &&
                    "active-category"
                  }`}
                  value={`${index == 0 ? 0 : category.term_id}`}
                  onClick={(e) => categoryClickHandler(e)}
                  ref={(element) => {
                    buttonRefs.current[index] = element;
                  }}
                >
                  {category.name}
                </button>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
