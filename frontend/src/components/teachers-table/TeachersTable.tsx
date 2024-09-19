import { useQuery } from "@apollo/client";
import { GET_TEACHERS } from "../../client/queries";
import TableComponent from "../table/Table";

const columns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
];

const TeachersTable: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TEACHERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Teachers</h1>
      <TableComponent columns={columns} data={data.teachers} />
    </div>
  );
};

export { TeachersTable };
