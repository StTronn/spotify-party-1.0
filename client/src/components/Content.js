import React from "react";
import styled from "styled-components";
import Heading from "./Heading";
import Card from "./Card";

function Content({ playbackObj, creatorName, roomId }) {
  if (Object.entries(playbackObj).length > 0)
    return (
      <div className="max-h-full overflow-y-auto px-12 py-6 mt-10 overflow-auto">
        <Heading
          title="See What Other's are Jamming To"
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
  else
    return (
      <div className="max-h-full overflow-y-auto px-12 py-6 mt-10 overflow-auto">
        <Heading
          title="See What Other's are Jamming To"
          subtitle={creatorName + "'s room"}
          roomId={roomId}
        />

        <div className=" cardsWrap grid justify-center mt-4">
          <p className="mt-3 text-base text-sp-gray-alt sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            {" "}
            It's lonley play something...
          </p>
        </div>
      </div>
    );
}

export default Content;
