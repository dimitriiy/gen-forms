import React from "react";

import { DatePickerProps } from "components/_private";
import { ColumnDef } from "models/index.ts";
import {
  AutoCompleteFieldProps,
  BooleanRadioGroupFieldProps,
  InputFieldProps,
  OuterAutoCompleteFieldProps,
  OuterDateFieldProps,
  OuterInputFieldProps,
  TextAreaFieldProps,
} from "components/MultipleEditor/components/MultipleEditorFields";

export type OnChangeProps<T> = {
  onChange: (value: T) => void;
  value: T;
};

export enum FormTypeElement {
  input = "Input",
  date = "Date",
  booleanRadioGroup = "booleanRadioGroup",
  textArea = "TextArea",
  autoComplete = "AutoComplete",
  //new widgets...
}

export type ElementWithCustomComponent<Id extends string = string, T = any> = {
  id: Id;
  Component: (props: OnChangeProps<T>) => React.ReactNode;
  label?: string;
};

export type BaseRegistryColumn<Id extends string = string> = {
  id: Id;
  type: FormTypeElement;
  label?: string;
};

export interface InputColumn<Id extends string = string, Props = OuterInputFieldProps> extends BaseRegistryColumn<Id> {
  type: FormTypeElement.input;
  props?: Props | ((props: unknown) => Props);
}

export interface DateColumns<Id extends string = string, Props = OuterDateFieldProps> extends BaseRegistryColumn<Id> {
  type: FormTypeElement.date;
  props?: Props | ((props: unknown) => Props);
}

export interface BooleanRadioGroupColumn<Id extends string = string> extends BaseRegistryColumn<Id> {
  type: FormTypeElement.booleanRadioGroup;
  props?: never;
}

export interface TextAreaColumn<Id extends string = string> extends BaseRegistryColumn<Id> {
  type: FormTypeElement.textArea;
  props?: never;
}

export interface AutocompleteColumn<Id extends string = string, Props = OuterAutoCompleteFieldProps>
  extends BaseRegistryColumn<Id> {
  type: FormTypeElement.autoComplete;
  props: Props;
  isMultipleValue?: boolean;
}

export type ColumnsRegistry = {
  [FormTypeElement.input]: InputColumn;
  [FormTypeElement.date]: DateColumns;
  [FormTypeElement.booleanRadioGroup]: BooleanRadioGroupColumn;
  [FormTypeElement.textArea]: TextAreaColumn;
  [FormTypeElement.autoComplete]: AutocompleteColumn;
};

export type PropsTypeByColumnType = {
  [FormTypeElement.input]: InputFieldProps;
  [FormTypeElement.date]: DatePickerProps;
  [FormTypeElement.booleanRadioGroup]: BooleanRadioGroupFieldProps;
  [FormTypeElement.textArea]: TextAreaFieldProps;
  [FormTypeElement.autoComplete]: AutoCompleteFieldProps;
};

export type FormColumnType = ColumnsRegistry[keyof ColumnsRegistry] | ElementWithCustomComponent;
export type ColumnTypeArr = readonly (readonly FormColumnType[])[];

export type GetValueType<T extends FormTypeElement> = T extends ColumnsRegistry[keyof ColumnsRegistry]
  ? PropsTypeByColumnType[T["type"]]["value"]
  : Parameters<ElementWithCustomComponent["Component"]>[0]["value"];

export type GetOnChangeType<T extends FormTypeElement> = T extends ColumnsRegistry[keyof ColumnsRegistry]
  ? PropsTypeByColumnType[T["type"]]["onChange"]
  : Parameters<ElementWithCustomComponent["Component"]>[0]["onChange"];
export interface FormElementProps<T extends FormTypeElement> {
  label: string;
  type: T;
  componentProps: ColumnsRegistry[T]["props"];
  onChange: GetOnChangeType<T>;
  value: GetValueType<T>;
}

export type Keys<T extends readonly (readonly { id: string }[])[] = readonly (readonly FormColumnType[])[]> =
  T extends { id: infer R }[] ? (R extends string ? R : never) : string;

export type GetTypeOfValue<T extends FormColumnType> = T extends ColumnsRegistry[keyof ColumnsRegistry]
  ? PropsTypeByColumnType[T["type"]]["value"]
  : T extends ElementWithCustomComponent
    ? Parameters<T["Component"]>[0]["value"]
    : never;

export type FormState<T extends ColumnTypeArr = ColumnTypeArr> = Record<
  T[number][number]["id"],
  GetTypeOfValue<T[number][number]> | null
>;

export interface MultipleEditingPanelProps<T extends ColumnTypeArr = ColumnTypeArr> {
  columns: ColumnDef[];
  formStructure: T;
  onSave: (values: FormState<T>) => void;
  onClose?: () => void;
}

export interface SchemeGroupProps<T extends ColumnTypeArr = ColumnTypeArr> {
  schemeGroup: T[number];
  columnsAsMap: Record<string, ColumnDef>;
  onChange: (id: T[number][number]["id"]) => (value: GetTypeOfValue<T[number][number]>) => void;
  formValues: FormState<T>;
}

export const isCustomElement = (item: any): item is ElementWithCustomComponent => "Component" in item;
