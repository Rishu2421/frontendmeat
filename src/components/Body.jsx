import React from "react";
import Banner from "./inner_components_index/Banner/Banner";
import CategoryWrap from "./inner_components_index/CategoryWrap/CategoryWrap";
import TopSellingProducts from "./inner_components_index/TopSellingProducts";
import BonelessCuts from "./inner_components_index/BonelessCuts";
import AboutUs from "./inner_components_index/AboutUs/AboutUs";
import Meetgram from "./inner_components_index/Meetgram";
import Testimonials from "./inner_components_index/Testimonials/Testimonials";
import { useNavigate } from "react-router-dom";

function Body({ categoryChoice }){
  const navigate=useNavigate();
  const handleCategoryChoice = (categoryName,subcategories) => {
    categoryChoice(categoryName,subcategories);
    navigate(`/category/${categoryName}`);
  };
    return (
        <div>
      <Banner />   
      <CategoryWrap onCategoryChoice={handleCategoryChoice}/>
     
      <TopSellingProducts />
      {/* <Meetgraminfo /> */}
      <BonelessCuts />  
      <Meetgram />
      <AboutUs />
      <Testimonials />
        </div>
    )
}

export default Body;