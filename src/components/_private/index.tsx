import React, { ChangeEventHandler } from "react";
import { Moment } from "moment";
import { Country } from "models/index.ts";
import moment from "moment";

export const Typography = ({
  className,
  children,
  variant = "h2",
}: React.PropsWithChildren<{ className?: string; variant?: string }>) => {
  const el = React.createElement(variant, { className, children });
  return el;
};

export enum sizeTokenValues {
  "small",
  "large",
}

export const momentToTableDateFormat = (value: Moment) => value.toString();

export interface InputProps {
  id?: string;
  name?: string;
  value?: string;
  filled?: boolean;
  width?: number | string;
  size?: string;
  type?: string;
  disabled?: boolean;
  loading?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export interface DatePickerProps {
  value: Moment | null;
  onChange: (value: Moment) => void;
  minDate?: Moment;
  maxDate?: Moment;
}

const DATE_FORMAT = "YYYY-MM-DD";
const formatDateToStr = (value?: Moment | null) => value?.format(DATE_FORMAT) ?? "";
export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, minDate, maxDate }) => {
  return (
    <input
      type="date"
      className="input"
      name="born"
      min={formatDateToStr(minDate)}
      max={formatDateToStr(maxDate)}
      value={formatDateToStr(value)}
      onChange={(e) => onChange(moment(e.target.value, DATE_FORMAT))}
    />
  );
};

export const getCountries = () =>
  new Promise((res) => {
    const fakeCountries: Country[] = Array.from({ length: 10 }, (_, i) => i).map((i) => ({
      name: `Country ${i}`,
      code: i.toString(),
    }));
    setTimeout(() => res(fakeCountries), 1000);
  });
