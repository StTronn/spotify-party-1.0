import React from "react";
import styled from "styled-components";
import Heading from "./Heading";
import Card from "./Card";

const TrackCointainer = styled.div`
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

function Content({ playbackObj, creatorName, roomId }) {
  return (
    <div className="max-h-full overflow-y-auto px-12 py-6 mt-10">
      <Heading
        title="See What Other's Are Jamming To"
        subtitle={creatorName + "'s room"}
        roomId={roomId}
      />

      <div className=" cardsWrap  mt-4">
        <div className="cardsWrapInner">
          {Object.entries(playbackObj).map((item) => (
            <Card user={item[1][1]} songInformation={item[1][0]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
