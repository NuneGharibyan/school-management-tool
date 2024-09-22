import {
  Table as MUITable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactElement } from "react";

interface IColumn<T> {
  label: string;
  key: string;
  renderer?: (data: T) => ReactElement | string;
}

interface ITableProps<T> {
  columns: IColumn<T>[];
  data: T[];
}

const Table = <T extends { [key: string]: any }>({
  columns,
  data,
}: ITableProps<T>) => {
  const renderCell = (data: T, column: IColumn<T>): ReactElement => {
    return column.renderer ? column.renderer(data) : data[column.key];
  };

  return (
    <TableContainer component={Paper}>
      <MUITable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.label} align="center">
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: T, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} align="center">
                  {renderCell(row, column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
