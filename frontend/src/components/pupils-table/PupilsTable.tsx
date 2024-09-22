import { useQuery } from "@apollo/client";
import { GET_PUPILS } from "../../client/queries";
import Table from "../table/Table";

interface IPupil {
  id: string;
  name: string;
  grade: number;
}

const columns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Grade", key: "grade" },
];

const PupilsTable: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PUPILS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Pupils</h1>
      <Table<IPupil> columns={columns} data={data.getPupils} />
    </div>
  );
};

export { PupilsTable };
