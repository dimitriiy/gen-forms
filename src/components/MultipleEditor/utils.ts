import _flatten from "lodash/flatten";
import _flow from "lodash/flow";
import _isNil from "lodash/isNil";
import _keyBy from "lodash/keyBy";
import _omitBy from "lodash/omitBy";
import _reduce from "lodash/reduce";
import { Moment } from "moment";

import { AutocompleteColumn, DateColumns, FormColumnType, FormState, FormTypeElement } from "./types";

import { Option } from "../AsyncMultiSelect";
import { ColumnDef } from "models/index.ts";
import { momentToTableDateFormat } from "components/_private";

export const isAutocompleteColumn = (column: any): column is AutocompleteColumn =>
  column.type === FormTypeElement.autoComplete;

export const isDateColumn = (column: any): column is DateColumns => column.type === FormTypeElement.date;
export const prepareDateForSave = <
  T extends readonly (readonly FormColumnType[])[] = readonly (readonly FormColumnType[])[],
>(
  formValues: FormState<T>,
  formStructure: T
) => {
  const onlyChangedValues = _omitBy(formValues, _isNil);

  const formStructureById = _flow(_flatten, (data) => _keyBy(data, "id"))(formStructure);

  const transformValue = (key: string, value: unknown) => {
    const item = formStructureById[key];

    if (isDateColumn(item)) {
      return momentToTableDateFormat(value as Moment);
    }

    if (isAutocompleteColumn(item)) {
      if (item?.isMultipleValue) return (value as Option[]).map((option) => option.value);

      return (value as Option[])[0].value;
    }

    return value;
  };

  const result = _reduce(
    onlyChangedValues,
    (acc, value, key) => {
      return { ...acc, [key]: transformValue(key, value) };
    },
    {} as FormState<T>
  );

  return result;
};

export const flatColumns = (columns: ColumnDef[]) => columns?.flatMap((column) => column.children ?? column) ?? [];

export const columnsById = (columns: ColumnDef[]) => {
  const flattenColumns = flatColumns(columns);

  return _keyBy(flattenColumns, "id");
};
