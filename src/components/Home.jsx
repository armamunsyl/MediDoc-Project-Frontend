import React from 'react';
import Banner from './Banner';
import ChatbotCta from './ChatbotCta';
import FaqEmergency from './FaqEmergency';
import FeaturedCategories from './FeaturedCategories';
import OurGoal from './OurGoal';
import RecentArticle from './RecentArticle';

const Home = () => {
  return (
    <div>
      <Banner />
      <OurGoal />
      <FeaturedCategories />
      <RecentArticle />
      <ChatbotCta />
      <FaqEmergency />
    </div>
  );
};

export default Home;
