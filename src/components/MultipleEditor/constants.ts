import { FormTypeElement } from "./types";
import {
  BooleanRadioGroupField,
  DateField,
  InputField,
  TextAreaField,
  AutoCompleteField,
} from "components/MultipleEditor/components/MultipleEditorFields";
import React from "react";

export const componentMap: Record<FormTypeElement, React.FC<any>> = {
  [FormTypeElement.booleanRadioGroup]: BooleanRadioGroupField,
  [FormTypeElement.date]: DateField,
  [FormTypeElement.input]: InputField,
  [FormTypeElement.textArea]: TextAreaField,
  [FormTypeElement.autoComplete]: AutoCompleteField,
};
