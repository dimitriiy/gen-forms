import React from "react";

import { FormBlockGroup, FormBlockRow } from "./components/Form";

import { componentMap } from "./constants";
import {
  FormElementProps,
  Keys,
  SchemeGroupProps,
  FormTypeElement,
  isCustomElement,
  PropsTypeByColumnType,
  ColumnTypeArr,
  ColumnsRegistry,
} from "./types";

import isEqual from "lodash/isEqual";

const FormElement = React.memo(
  <T extends FormTypeElement>({ componentProps, type, value, onChange }: FormElementProps<T>) => {
    if (!type || !componentMap[type]) {
      throw new Error(`${type} is not implemented!`);
    }

    const FormFieldComponent = componentMap[type] as React.FC<PropsTypeByColumnType[T]>;

    return <FormFieldComponent {...(componentProps as any)} onChange={onChange} value={value} />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.type === nextProps.type &&
      prevProps.onChange === nextProps.onChange &&
      isEqual(prevProps.componentProps, nextProps.componentProps)
    );
  }
);

export function SchemeGroup<T extends ColumnTypeArr = ColumnTypeArr>(props: SchemeGroupProps<T>) {
  const { schemeGroup, columnsAsMap, onChange, formValues } = props;

  // Вот эти мемоизации вызывают сомнения. В прод бы я не стал это добавлять наверное.
  // Также пришлось добавить propsAreEqual для FormElement, чтобы все элементы формы не перерисовывались на каждное изменение.
  const handlersById = React.useMemo(
    () =>
      schemeGroup.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.id]: onChange(cur.id),
        }),
        {} as Record<string, ReturnType<SchemeGroupProps<T>["onChange"]>>
      ),
    [onChange, schemeGroup]
  );

  const componentPropsById = React.useMemo(
    () =>
      (schemeGroup as ColumnsRegistry[keyof ColumnsRegistry][]).reduce(
        (acc, cur) => ({
          ...acc,
          [cur.id]: typeof cur.props === "function" ? cur.props(formValues) : cur.props,
        }),
        {} as Record<string, ColumnsRegistry[keyof ColumnsRegistry]["props"]>
      ),
    [onChange, schemeGroup, formValues]
  );

  return (
    <FormBlockGroup>
      {schemeGroup.map((schemeGroupRow) => {
        const label = schemeGroupRow?.label ?? columnsAsMap[schemeGroupRow.id].label;

        return (
          <FormBlockRow title={label} key={schemeGroupRow.id}>
            {isCustomElement(schemeGroupRow) ? (
              <schemeGroupRow.Component
                onChange={handlersById[schemeGroupRow.id]}
                value={formValues[schemeGroupRow.id as Keys<T>]}
              />
            ) : (
              <FormElement
                label={label}
                type={schemeGroupRow.type}
                onChange={handlersById[schemeGroupRow.id]}
                value={formValues[schemeGroupRow.id as Keys<T>]}
                componentProps={componentPropsById[schemeGroupRow.id]}
              />
            )}
          </FormBlockRow>
        );
      })}
    </FormBlockGroup>
  );
}
