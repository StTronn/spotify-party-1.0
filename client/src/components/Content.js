import React from "react";
import styled from "styled-components";
import Heading from "./Heading";
import Card from "./Card";

const TrackCointainer = styled.div`
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

function Content({ playbackObj, creatorName }) {
  console.log("playbackObj", playbackObj);
  return (
    <div className="max-h-full overflow-y-auto px-12 py-6 mt-10">
      <Heading
        title="See What Other's Are Jamming To"
        subtitle={creatorName + "'s room"}
      />

      <div className=" cardsWrap  mt-4">
        <div className="cardsWrapInner">
          {Object.entries(playbackObj).map((item) => (
            <Card songInformation={item[1]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
