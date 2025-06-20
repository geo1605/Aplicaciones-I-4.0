import { Table } from "antd";
import type { TableProps } from "antd";
import "antd/dist/reset.css"; // estilo base

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Edad",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Dirección",
    dataIndex: "address",
    key: "address",
  },
];

const data: DataType[] = [
  { key: "1", name: "Juan Pérez", age: 32, address: "Calle Reforma 123" },
  { key: "2", name: "María López", age: 28, address: "Av. Juárez 456" },
  { key: "3", name: "Carlos Sánchez", age: 40, address: "Blvd. Hidalgo 789" },
];

export default function MyTable() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Tabla de Usuarios</h2>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
