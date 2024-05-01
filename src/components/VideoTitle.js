import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <>
      <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-md md:text-3xl font-bold">{title}</h1>
        <p className="py-6 text-sm md:text-md md:w-1/3">{overview}</p>
        <div className="flex">
          <button
            className="bg-white px-4 py-1 mx-4 md:py-2 md:px-12 rounded-md border text-black font-bold hover:bg-opacity-70"
            type="submit"
          >
            {" "}
            Play{" "}
          </button>
          <button className="bg-black bg-opacity-70 py-1 md:py-2 px-4 md:px-10 rounded-md border" type="submit">
            More Info
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoTitle;
