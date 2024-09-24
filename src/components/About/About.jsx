import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about">
      <div className="about__image-container">
        <img
          // src="../../assets/barca-wallpaper.jpg"
          alt="About"
          className="about__image"
        />
      </div>
      <div className="about__text-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__description">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
};

export default About;
