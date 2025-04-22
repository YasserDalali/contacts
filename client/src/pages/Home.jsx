import React from "react";
import Squares from "../components/ui/Squares.jsx";
import SplitText from "../blocks/TextAnimations/SplitText/SplitText.jsx";

function Home() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background squares */}
      <div className="absolute inset-0 pointer-events-none">
        <Squares
          className="w-full h-full"
          speed={0.2}
          squareSize={30}
          direction="left"
          borderColor="#222222"
          hoverFillColor="#222"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div >
          <div className="flex justify-center ">
                 <SplitText
            text="Contact"
            className="text-8xl text-white font-bold "
            delay={50}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />     
                 <SplitText
            text="AI"
            className="text-8xl text-cyan-400 font-bold "
            delay={250}
            animationFrom={{ opacity: 0, transform: "translate3d(0,-50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
           
          />     
          </div>
 
          <p className="text-white max-w-1/2 mx-auto">HELLO WORLD</p>
        </div>

        
      </div>
    </div>
  );
}

export default Home;
