import React from "react";

import PopularCamps from "../PopularCamps/PopularCamps";
import Banner from "../Banner/Banner";
import FeedbackAndRatings from "../ExtraSection/FeedbackAndRatings";
import InsightsAndStatistics from "../ExtraSection/InsightsAndStatistics";
import HealthcareProfessionals from "../ExtraSection/HealthcareProfessionals";
import OurImpact from "../ExtraSection/OurImpact";
import UpcomingComingCamp from "../UpCommingCamp/UpComingCamp";
import { Helmet } from "react-helmet";


const Home = () => {
 
  return (
    <div>
       <Helmet>
        <title>Home || MCMS</title>
        <meta name="description" content="This is the home page of my website." />
      </Helmet>
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
