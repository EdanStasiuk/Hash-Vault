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

/**
 * @prop curStep: a number representing the current step the component is detailing.
 * @prop maxStep: a number representing the last step in the series.
 * @prop title: a string used as the title of the current step.
 * @prop description: an array of objects describing the textual content for the step.
 *                    Each object contains:
 *                      - text: a string representing the line of text to be displayed.
 *                      - bold: (optional) a boolean indicating if the text should be bolded.
 *                      - color: (optional) a string representing the color of the text.
 * @returns a text display outlining instructions for the current step
 * the user is on during wallet creation and import.
 */
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
