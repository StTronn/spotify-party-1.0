import React from "react";
import styled from "styled-components";
import Heading from "./Heading";
import Card from "./Card";

const TrackCointainer = styled.div`
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

function Content() {
  return (
    <div className="max-h-full overflow-y-auto px-12 py-6 mt-10">
      <Heading title="See What Other's Are Jamming To" />

      <TrackCointainer className=" mb-16 mt-4">
        <Card
          title="El Programa de los Simios"
          subtitle="Desde las entrañas del universo geek para el mundo: El Programa de los Simios..."
        ></Card>
        <Card
          title="El Programa de los Simios"
          subtitle="Desde las entrañas del universo geek para el mundo: El Programa de los Simios..."
        ></Card>
        <Card
          title="El Programa de los Simios"
          subtitle="Desde las entrañas del universo geek para el mundo: El Programa de los Simios..."
        ></Card>
        <Card
          title="El Programa de los Simios"
          subtitle="Desde las entrañas del universo geek para el mundo: El Programa de los Simios..."
        ></Card>
      </TrackCointainer>
    </div>
  );
}

export default Content;
