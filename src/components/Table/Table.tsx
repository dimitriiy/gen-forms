import React from "react";
import { Table as TableWrap, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react";

import { ColumnDef } from "models/index.ts";

export const Table = ({ columns }: React.PropsWithChildren<{ columns: ColumnDef[] }>) => {
  return (
    <div className="table">
      <TableWrap>
        <Thead>
          <Tr>
            {columns.map(({ id, label }) => (
              <Th key={id}>{label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={6}>
              Это таблица. Тут будут данные. И для того чтобы их менять существует форма - она в правой части экрана.
            </Td>
          </Tr>
        </Tbody>
      </TableWrap>
    </div>
  );
};
