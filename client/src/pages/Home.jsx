import React from "react";
import Squares from "../components/ui/Squares.jsx";

function Home() {
  return (
    <div className="bg-black w-screen">
      <Squares
        speed={0.2}
        squareSize={30}
        direction="left" // up, down, left, right, diagonal
        borderColor="#222222"
        hoverFillColor="#222"
      />
    </div>
  );
}

export default Home;
