import { Input, InputProps } from "@chakra-ui/react";
import { OnChangeProps } from "components/MultipleEditor/types.ts";

export type OuterInputFieldProps = Omit<InputProps, "onChange" | "value">;
export type InputFieldProps = OuterInputFieldProps & OnChangeProps<string>;
export const InputField = ({ value, onChange, ...props }: InputFieldProps) => {
  return (
    <Input {...props} placeholder="Текст..." size="md" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
  );
};
