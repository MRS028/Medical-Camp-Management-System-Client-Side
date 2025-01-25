import React from "react";

import PopularCamps from "../PopularCamps/PopularCamps";
import Banner from "../Banner/Banner";
import FeedbackAndRatings from "../ExtraSection/FeedbackAndRatings";
import InsightsAndStatistics from "../ExtraSection/InsightsAndStatistics";
import HealthcareProfessionals from "../ExtraSection/HealthcareProfessionals";
import OurImpact from "../ExtraSection/OurImpact";
import UpcomingComingCamp from "../UpCommingCamp/UpComingCamp";


const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularCamps></PopularCamps>
      <FeedbackAndRatings/>
      <InsightsAndStatistics/>
      <UpcomingComingCamp/>
      <HealthcareProfessionals/>
      <OurImpact></OurImpact>

    </div>
  );
};

export default Home;
