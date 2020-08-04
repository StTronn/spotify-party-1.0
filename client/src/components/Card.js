import React from "react";
import "../App.css";
import styled from "styled-components";

const Image = styled.img`
  height: 100%;
  margin: auto;
  object-fit: cover;
`;

function Card({ songInformation }) {
  if (songInformation)
    return (
      <a href={"/#"}>
        <div className="card">
          <div className="cardImage">
            <img src={songInformation.item.album.images[0].url} alt="Pic 1" />
          </div>
          <div className="cardContent">
            <h3>{songInformation.item.name}</h3>
            <span>
              {songInformation.item.artists.map(
                (artist, index) =>
                  `${artist.name}${
                    songInformation.item
                      ? songInformation.item.artists.length - 1 === index
                        ? ""
                        : ", "
                      : ""
                  }`
              )}
            </span>
          </div>
        </div>
      </a>
    );
  return <></>;
}

export default Card;
