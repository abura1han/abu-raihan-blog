import React from "react";

interface Props {
  name: string;
}

const NewsLater: React.FC<Props> = ({ name }) => {
  return (
    <div
      className="my-5 max-w-[1000px] mx-auto bg-gradient-to-tr from-blue-400 to-blue-700 pb-5 rounded"
      aria-label="News later"
    >
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => e.preventDefault()}
        role="form"
      >
        <h2
          className="font-semibold text-xl text-center mt-10 text-white"
          role="heading"
        >
          Subscribe to {name}'s blog
        </h2>
        <div className="flex flex-col sm:block w-full sm:w-auto px-4">
          <input
            type="email"
            placeholder="john@gmail.com"
            className="border hover:border-black focus:border-black bg-white text-black rounded sm:rounded-none sm:rounded-l-sm py-2 px-1 mt-2 outline-none text-center sm:text-left"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white border border-black rounded sm:rounded-none sm:rounded-r-sm mt-3 sm:mt-0"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(NewsLater);
