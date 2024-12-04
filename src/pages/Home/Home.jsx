import React from "react";
import { useTitle } from "../../hooks/useTitle";
import Map from "./Map/Map";
import PopularInstructor from "./PopularTeacher/PopularInstructor";
import HeroContainer from "./Hero/HeroContainer";
import Gallary from "./Gallary/Gallary";
import Notification from "./Notifications/Notification";

const Home = () => {
  useTitle("Home | Yoga Master - Unleashed Your Inner Self");
  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallary />
        <Notification />

        <PopularInstructor />
      </div>
      <Map />
    </section>
  );
};

export default Home;
