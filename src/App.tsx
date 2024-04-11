import "./App.css";

import { MultipleEditor } from "components/MultipleEditor";
import { Table } from "components/Table";
import { editingFormScheme } from "./editingFormScheme.tsx";
import { columns } from "./columns.tsx";
import React from "react";
import { FormState } from "components/MultipleEditor/types.ts";

export function App() {
  const onSaveData = React.useCallback((formValues: FormState<typeof editingFormScheme>) => {
    console.log(formValues, formValues.work, formValues.work); //infer types
    alert("Фжух, данные формы сохранились!");
  }, []);

  return (
    <div className="page">
      <Table columns={columns} />
      <MultipleEditor formStructure={editingFormScheme} columns={columns} onSave={onSaveData} />
    </div>
  );
}
