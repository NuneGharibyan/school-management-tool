import { useQuery } from "@apollo/client";
import { GET_SUBJECTS } from "../../client/queries";
import TableComponent from "../table/Table";

const columns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
];

const SubjectsTable: React.FC = () => {
  const { loading, error, data } = useQuery(GET_SUBJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Subjects</h1>
      <TableComponent columns={columns} data={data.getSubjects} />
    </div>
  );
};

export { SubjectsTable };
