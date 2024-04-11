import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export type BooleanRadioGroupFieldProps = {
  value: boolean | null;
  onChange: (value: boolean) => void;
};
export const BooleanRadioGroupField: React.FC<BooleanRadioGroupFieldProps> = ({ value, onChange }) => {
  const [val, setValue] = React.useState(value ? "1" : "2");

  return (
    <RadioGroup onChange={setValue} value={val}>
      <Stack direction="column">
        <Radio value="1" onChange={() => onChange(true)}>
          Да
        </Radio>

        <Radio value="2" onChange={() => onChange(false)}>
          Нет
        </Radio>
      </Stack>
    </RadioGroup>
  );
};
