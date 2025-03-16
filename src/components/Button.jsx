import React from "react";

export default function Button(props) {
  const { text, func } = props;
  return (
    <button
      className="px-8 py-4 mx-auto rounded-md border-2 bg-slate-950 border-blue-400 border-solid blueShadow duration-200"
      onClick={func}
    >
      <p>{text}</p>
    </button>
  );
}
