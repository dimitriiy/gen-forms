import { DatePicker, DatePickerProps } from "components/_private";

export type OuterDateFieldProps = Omit<DatePickerProps, "onChange" | "value">;
export type DateFieldProps = DatePickerProps;
export const DateField = (props: DateFieldProps) => <DatePicker {...props} />;
