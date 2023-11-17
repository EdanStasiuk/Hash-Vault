import React from "react";

interface Line {
  text: string;
  bold?: boolean;
  color?: string;
}

interface Props {
  curStep: number;
  maxStep: number;
  title: string;
  description: Line[];
}

export default function StepInfo({
  curStep,
  maxStep,
  title,
  description,
}: React.PropsWithChildren<Props>) {
  return (
    <div className="Wrapper grid justify-center mt-7">
      <div className="font-sans text-background-100 text-sm">
        {curStep} out of {maxStep}
      </div>
      <div className="font-sans font-normal text-3xl text-white">{title}</div>
      <div className="font-sans font-thin text-lg text-white mt-2 whitespace-pre">
        {description.map((line, index) => (
          <React.Fragment key={index}>
            {line.bold ? (
              <span
                style={{ fontWeight: "bold", color: line.color || "inherit" }}
              >
                {line.text}
              </span>
            ) : (
              line.text
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
