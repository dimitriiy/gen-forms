export enum TableBodyCellType {
  text = 'text',
  number = 'number',
  select = 'select',
  autocomplete = 'autocomplete',
  check = 'check',
  date = 'date',
}

export type ColumnDef = {
  label: string;
  id: string;
  children?: ColumnDef[];
  frozen?: boolean;
  allowSort?: boolean;
  allowBulkEdit?: boolean;
  invisible?: boolean;
  locked?: boolean;
  operators?: string[];
  hasNullDate?: boolean;
  type?: TableBodyCellType;
  allowFilter?: boolean;
  allowBlocked?: boolean;
  groupId?: string;
  isMultipleFilterValue?: boolean;
  getCellProps?: (data: any) => any;
};

export type Country = {
  name: string;
  code: string;
};
