import { AsyncMultiSelect, AsyncMultiSelectProps } from "components/AsyncMultiSelect";
import { OnChangeProps } from "components/MultipleEditor/types.ts";

export type OuterAutoCompleteFieldProps = Pick<
  AsyncMultiSelectProps,
  "optionsFetcher" | "optionFormatter" | "preloadOptions" | "isSingle" | "defaultOptions"
>;
export type AutoCompleteFieldProps = OuterAutoCompleteFieldProps & OnChangeProps<AsyncMultiSelectProps["values"]>;
export const AutoCompleteField = ({ value, ...props }: AutoCompleteFieldProps) => (
  <AsyncMultiSelect {...props} values={value} placeholder="Текст..." />
);
