import React, { useState, useEffect, useContext } from "react";
import { Store } from "../Store";
import styled from "styled-components";
import {
  Flex,
  Stack,
  Heading,
  Image,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spinner,
} from "@chakra-ui/core";

const Blurred = styled.div`
  z-index: 0;

  grid-area: a;
  filter: blur(900px);
`;

const Cover = styled.div`
  z-index: 1;
  grid-area: a;
  position: relative;
`;

const Cointainer = styled.div`
  display: grid;
  grid-template-rows: 8fr 2fr;
  grid-row-gap: 20px;
  max-width: 50vh;
  height: 40vh;
  max-height: 900px;
  padding: 30px;
  min-height: 300px;
  justify-self: center;
  justify-content: center;
`;
const ImageHolder = styled.div`
  display: grid;
  grid-template-areas: "a";
`;
const OverlayDesc = styled.div`
  grid-area: a;
  display: grid;
  color: white;
  align-content: end;
  z-index: 2;
  visibility: hidden;
  background-color: rgba(128, 128, 128, 0.2);
  opacity: 0;

  transition: all 0.4s ease-in-out 0s;
  ${Cointainer}:hover & {
    visibility: visible;
    background-color: rgba(128, 128, 128, 0.4);
    opacity: 1;
  }
`;
//`

const SongDisplay = () => {
  const { state } = useContext(Store);
  const { user, spotifyApi } = state;
  const [songInformation, setSongInformation] = useState();
  useEffect(() => {
    if (user) {
      window.setInterval(() => {
        spotifyApi.getMyCurrentPlaybackState().then((response) => {
          setSongInformation(response);
        });
      }, 1000);
    }
  }, [user, spotifyApi]);
  if (songInformation)
    if (songInformation.item) {
      return (
        <>
          <Cointainer>
            <ImageHolder>
              <Blurred>
                <Image
                  style={{ display: "blocked", margin: "auto auto" }}
                  src={songInformation.item.album.images[0].url}
                />
              </Blurred>
              <Cover>
                <Image
                  style={{ display: "blocked", margin: "auto auto" }}
                  src={songInformation.item.album.images[0].url}
                  mt={10}
                />
              </Cover>
              <OverlayDesc>
                <span style={{ paddingRight: "20px" }}>
                  <Heading size="md" ml={4}>
                    {songInformation.item.name}
                  </Heading>
                  <Text ml={4} mb={4}>
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
                  </Text>
                </span>
              </OverlayDesc>
            </ImageHolder>
            <div>
              <Stack textAlign="left" width="100%">
                <Heading size="md" m={0}>
                  {songInformation.item.name}
                </Heading>
                <Text m={0}>
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
                </Text>
                <Slider
                  color={"green"}
                  min={0}
                  max={songInformation.item.duration_ms / 1000}
                  value={
                    songInformation.progress_ms
                      ? songInformation.progress_ms / 1000
                      : 0
                  }
                  maxW={"100%"}
                >
                  <SliderTrack />
                  <SliderFilledTrack />
                  <SliderThumb size={4} />
                </Slider>
              </Stack>
            </div>
          </Cointainer>
        </>
      );
    }
  return (
    <Stack spacing={10} align="center" mt={10}>
      <Spinner size="lg" />
      <Text>
        If you haven't started to play a song yet, please do that now.
        Otherwise, you may be looking at this loading spinner for quite awhile{" "}
        <span role="img" aria-label="wink">
          😉
        </span>
      </Text>
    </Stack>
  );
};

export default SongDisplay;
