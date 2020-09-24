import React from "react";
import "../App.css";
import styled from "styled-components";

const Image = styled.img`
  height: 100%;
  margin: auto;
  object-fit: cover;
`;

function Card({ user, songInformation }) {
  if (songInformation && songInformation.item.album)
    return (
      <>
        <div style={{ maxWidth: "200px" }} className="card md:max-w-md">
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

            <p className=" mt-2 mt-0 text-sp-green text-xs">{user}</p>
          </div>
        </div>
      </>
    );
  return <></>;
}

export default Card;
