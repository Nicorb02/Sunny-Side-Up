import React from 'react'
import { Link } from 'react-router-dom';

import chicken1 from '../images/chicken1.jpg';
import chicken2 from '../images/chicken2.webp';
import chicken3 from '../images/chicken3.jpg';
import chicken4 from '../images/chicken4.jpg';
import chicken5 from '../images/chicken5.jpg';
import chicken6 from '../images/chicken6.jpg';
import ReactRoundedImage from "react-rounded-image"
import '../styles/About.css';
import Blobs from '../components/Blobs.js';
import logo from '../images/logo.png';
import BackButton2 from '../styles/assets/BackButton2';
import { Navigate, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  function doBack () {
      navigate("/");
  }


  return (
    <body className='about-body'>
    <div className='back-button' onClick={doBack}> <BackButton2 /> </div>  
    <div class="about-section">
        <header>Sunny Side Up Planner</header>
        <img src={logo} className='logo-box' alt="logo" />
        <text-body>Welcome to our planner app, designed to help you stay organized and productive! Our app was created 
          by a team of talented and dedicated individuals who are passionate about improving people's lives through technology.
        </text-body>
    </div>
    <div>
    <h1>Welcome to our flock!</h1>
    <div class="flexbox-container">
    <view style={{flex:1, flexDirection:'column'}}>
    <Link to="https://www.tastingtable.com/1004068/everything-youve-ever-wondered-about-eggs/" rel="noreferrer">
      <ReactRoundedImage
          image={chicken1}
          roundedColor="#ff9900"
          imageWidth="150"
          imageHeight="145"
          roundedSize="30"
          borderRadius="70"
          hoverColor="#ffe66d"
        />
        </Link>
          <section>
            <name>Matthew Mintz</name>
          </section>
          </view>
        <view style={{flex:1, flexDirection:'column'}}>
        <ReactRoundedImage
          image={chicken2}
          roundedColor="#ff9900"
          imageWidth="150"
          imageHeight="145"
          roundedSize="30"
          borderRadius="70"
          hoverColor="#f0e9b2"
          
        />
          <section>
            <name>Xiaodan Xu</name>
          </section>
          </view>
        </div>
        <div class="flexbox-container">
        <view style={{flex:1, flexDirection:'column'}}>
        <ReactRoundedImage
          image={chicken3}
          roundedColor="#ff9900"
          imageWidth="150"
          imageHeight="145"
          roundedSize="30"
          borderRadius="70"
          hoverColor="#e94d0b"
        />
          <section>
            <name>Nico Rodriguez</name>
          </section>
        </view>
        <view style={{flex:1, flexDirection:'column'}}>
      <ReactRoundedImage
          image={chicken4}
          roundedColor="#ff9900"
          imageWidth="150"
          imageHeight="145"
          roundedSize="30"
          borderRadius="70"
          hoverColor="#f0e9b2"
        />
          <section>
            <name>Hussain Khan</name>
          </section>
        </view>
          </div>
          <div class="flexbox-container">
        <view style={{flex:1, flexDirection:'column'}}>
      <ReactRoundedImage
          image={chicken5}
          roundedColor="#ff9900"
          imageWidth="150"
          imageHeight="145"
          roundedSize="30"
          borderRadius="70"
          hoverColor="#ffe66d"
        />
          <section>
            <name>Nader Fares</name>
          </section>
        </view>

      <view style={{flex:1, flexDirection:'column'}}>
      <ReactRoundedImage
          image={chicken6}
          roundedColor="#ff9900"
          imageWidth="150"
          imageHeight="145"
          roundedSize="30"
          borderRadius="70"
          hoverColor="#e94d0b"
        />
          <section>
            <name>Jenna Busch</name>
          </section>
          </view>
        </div>
    </div>
    </body>
  );
};

export default About;
