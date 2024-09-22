import { useQuery } from "@apollo/client";
import { GET_TEACHERS } from "../../client/queries";
import Table from "../table/Table";

interface ITeacher {
  id: string;
  name: string;
  subjects: { id: string; name: string }[];
}

const columns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  {
    label: "Subjects",
    key: "subjects",
    renderer: (teacher: ITeacher): string => {
      return teacher.subjects.map((subject) => subject.name).join(", ");
    },
  },
];

const TeachersTable: React.FC = () => {
  const { loading, error, data } = useQuery<{ getTeachers: ITeacher[] }>(
    GET_TEACHERS
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Teachers</h1>
      <Table<ITeacher> columns={columns} data={data?.getTeachers || []} />
    </div>
  );
};

export { TeachersTable };
