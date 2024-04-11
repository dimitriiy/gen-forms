import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import stylex from "@stylexjs/stylex";

import {
  MultipleEditorActions,
  MultipleEditorBody,
  MultipleEditorContent,
  MultipleEditorLeftSlotActions,
  MultipleEditorRightSlotActions,
  MultipleEditorWrap,
} from "components/MultipleEditor/components/MultipleEditorContent";
import { classes } from "components/MultipleEditor/styles.tsx";

import { SchemeGroup } from "./SchemeGroup";
import { ColumnTypeArr, FormState, GetTypeOfValue, MultipleEditingPanelProps } from "./types";
import { prepareDateForSave, columnsById } from "./utils";

const initFormState = <T extends ColumnTypeArr = ColumnTypeArr>(columns: T) =>
  columns.flat().reduce((acc, c) => ({ ...acc, [c.id]: null }), {}) as FormState<T>;

export function MultipleEditor<T extends ColumnTypeArr = ColumnTypeArr>({
  onSave,
  onClose,
  formStructure,
  columns,
}: MultipleEditingPanelProps<T>) {
  const [formValues, setFormValues] = React.useState<FormState<T>>(initFormState(formStructure));

  const columnsAsMap = React.useMemo(() => columnsById(columns), [columns]);

  const onChange = React.useCallback(
    (id: T[number][number]["id"]) => (value: GetTypeOfValue<T[number][number]>) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: value,
      }));
    },
    []
  );

  const onReset = () => {
    setFormValues(initFormState(formStructure));
  };

  const onSaveHandler = () => {
    onSave(prepareDateForSave(formValues, formStructure));
  };

  const isDisabled = Object.values(formValues).every((value) => value === null || value === "");

  return (
    <MultipleEditorWrap>
      <h2 {...stylex.props(classes.title)}>Редактирование</h2>
      <MultipleEditorContent>
        <MultipleEditorBody>
          {formStructure.map((schemeGroup, index) => (
            <SchemeGroup
              key={index}
              columnsAsMap={columnsAsMap}
              formValues={formValues}
              onChange={onChange}
              schemeGroup={schemeGroup}
            />
          ))}
        </MultipleEditorBody>

        <MultipleEditorActions>
          <MultipleEditorLeftSlotActions>
            <Button onClick={onReset} variant="outline" size="sm">
              Сбросить
            </Button>
          </MultipleEditorLeftSlotActions>
          <MultipleEditorRightSlotActions>
            <ButtonGroup spacing="2" size="sm">
              <Button onClick={onClose} colorScheme="red">
                Отменить
              </Button>
              <Button colorScheme="green" onClick={onSaveHandler} isDisabled={isDisabled}>
                Применить
              </Button>
            </ButtonGroup>
          </MultipleEditorRightSlotActions>
        </MultipleEditorActions>
      </MultipleEditorContent>
    </MultipleEditorWrap>
  );
}
