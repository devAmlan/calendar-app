import React from "react";

function page() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="md:w-3/4 w-full flex justify-between items-center gap-8 md:flex-row flex-col">
        <div className="flex md:w-1/2 flex-col justify-center items-start gap-6">
          <h1 className="text-4xl font-extrabold text-primary">
            Get Started on Tymar
          </h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
            quibusdam esse? Officiis architecto exercitationem dolore, delectus
            fugit incidunt laborum illo aut, iusto cupiditate eveniet iste natus
            fuga dignissimos facilis corporis!
          </p>
          <button className="w-full py-3 bg-primary text-white border-0 rounded-lg text-lg font-semibold">
            Create a Workspace
          </button>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
            libero. Incidunt possimus adipisci nesciunt quam perspiciatis
            blanditiis nulla cum laudantium.
          </p>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

export default page;
