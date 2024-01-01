import React from "react";

interface Line {
  text: string;
  bold?: boolean;
  color?: string;
}

interface Props {
  curStep?: number;
  maxStep?: number;
  title: string;
  description: Line[];
}

/**
 * @prop {number} curStep - An optional number representing the current step the component is detailing; default value is -1.
 * @prop {number} maxStep - An optional number representing the last step in the series; default value is -1.
 * @prop {string} title - A string used as the title of the current step.
 * @prop {Line[]} description - An array of objects describing the textual content for the step.
 *                    Each object contains:
 *                      - text: a string representing the line of text to be displayed.
 *                      - bold: (optional) a boolean indicating if the text should be bolded.
 *                      - color: (optional) a string representing the color of the text.
 * @returns a text display outlining instructions for the current step
 * the user is on during wallet creation and import.
 */
export default function StepInfo({
  curStep = -1,
  maxStep = -1,
  title,
  description,
}: React.PropsWithChildren<Props>) {
  return (
    <div className="Wrapper grid justify-center mt-7">
      {maxStep !== -1 && (
        <div className="font-sans text-background-100 text-sm">
        {curStep} out of {maxStep}
      </div>
      )}
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
