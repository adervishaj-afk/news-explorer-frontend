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
        Welcome to the News Explorer Application, created by Adervi as part of the TripleTen Software Engineering track! This app is designed to help you explore and stay up-to-date on topics that interest you. Search for articles, save them to your profile, and build a personalized collection of information. I’m thrilled to share this project with you and encourage you to dive in, learn something new, and have fun along the way. Enjoy exploring!


        </p>
        <p className="about__description">
          
        </p>
      </div>
    </section>
  );
};

export default About;
