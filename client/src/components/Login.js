import React from "react";
import TextLoop from "react-text-loop";
import bgSvg from "../assets/audiodrawing-dark.95e9a693.svg";
import styled from "styled-components";
import { FaSpotify } from "react-icons/fa";

const Cointainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 8vh 1fr;
  align-items: center;
`;

const MainCointainer = styled.div`
  display: grid;
  grid-template-columns: 6fr 2fr;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
`;
const LoginButton = styled.div`
  width: 250px;
  height: 35px;
`;

const Login = () => {
  return (
    <Cointainer className="bg-sp-gray-dark">
      <div>
        <h1> Nav </h1>
      </div>

      <MainCointainer className="px-20">
        <span>
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-sp-green sm:text-5xl sm:leading-none md:text-6xl">
            <TextLoop interval={3000}>
              <span>Jam Out</span>
              <span>Be The Dj</span>
              <span>Listen Together</span>
            </TextLoop>
            <br />
            <span className="text-white">with anyone anywhere</span>
          </h2>
          <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Grab some peeps and create a virtual lounge where you can chat, see
            and play what others are playing.
          </p>
          <LoginButton className="bg-sp-green mt-8 pt-1 text-base leading-6 font-medium text-white rounded-full text-center">
            <a
              className="w-full flex items-center justify-center"
              href={process.env.REACT_APP_ENDPOINT + "login"}
            >
              <FaSpotify />
              &nbsp; Login to Spotify{" "}
            </a>
          </LoginButton>
        </span>
        <Image className="" src={bgSvg} />
      </MainCointainer>
    </Cointainer>
  );
};

export default Login;
