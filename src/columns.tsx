import { ColumnDef } from "models/index.ts";

//ColumnDef - это структура одной колонки таблицы.

export const columns: ColumnDef[] = [
  {
    id: "name",
    label: "Имя",
  },
  {
    id: "date",
    label: "Дата рождения",
  },
  {
    id: "age",
    label: "Возраст",
  },
  {
    id: "country",
    label: "Страна",
  },
  {
    id: "work",
    label: "Работа",
  },

  {
    id: "work_company",
    label: "Название компании",
  },
];
