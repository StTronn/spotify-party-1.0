import React from "react";
import styled from "styled-components";

const Image = styled.img`
  height: 100%;
  margin: auto;
  object-fit: cover;
`;

function Card({ className, title, subtitle, text }) {
  const songInformation = JSON.parse(localStorage.getItem("songInformation"));
  return (
    <div className={className}>
      <div className="bg-gray-400 h-48 w-48 mb-2">
        <Image src={songInformation.item.album.images[0].url} />
      </div>
      <h3 className="text-white font-bold text-sm">
        {songInformation.item.name}
      </h3>
      {subtitle && (
        <h4 className="text-gray-400 text-sm font-medium">
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
        </h4>
      )}
      {text && <span className=""></span>}
    </div>
  );
}

export default Card;
