import { Textarea, TextareaProps } from "@chakra-ui/react";
import { OnChangeProps } from "components/MultipleEditor/types.ts";

export type OuterTextAreaFieldProps = Omit<TextareaProps, "onChange" | "value">;
export type TextAreaFieldProps = OuterTextAreaFieldProps & OnChangeProps<string>;
export const TextAreaField = ({ placeholder = "Текст...", ...props }: TextAreaFieldProps) => {
  return (
    <Textarea
      {...props}
      placeholder={placeholder}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value || ""}
    />
  );
};
