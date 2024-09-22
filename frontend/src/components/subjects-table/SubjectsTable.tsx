import { useQuery } from "@apollo/client";
import { GET_SUBJECTS } from "../../client/queries";
import Table from "../table/Table";

interface ISubject {
  id: string;
  name: string;
  teacher: {
    id: string;
    name: string;
  };
}

const columns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  {
    label: "Teacher",
    key: "teacher",
    renderer: (subject: ISubject) => subject.teacher.name,
  },
];

const SubjectsTable: React.FC = () => {
  const { loading, error, data } = useQuery(GET_SUBJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Subjects</h1>
      <Table<ISubject> columns={columns} data={data.getSubjects} />
    </div>
  );
};

export { SubjectsTable };
