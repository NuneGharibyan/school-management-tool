import { useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { GET_TEACHERS } from "../../client/queries";
import { ITeacher } from "../../interfaces";
import Table from "../table/Table";
import UpdateTeacherDialog from "../update-teacher-dialog/UpdateTeacherDialog";

const TeachersTable: React.FC = () => {
  const { loading, error, data } = useQuery<{ getTeachers: ITeacher[] }>(
    GET_TEACHERS
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null);

  const columns = useMemo(
    () => [
      { label: "ID", key: "id" },
      { label: "Name", key: "name" },
      {
        label: "Subjects",
        key: "subjects",
        renderer: (teacher: ITeacher): string => {
          return teacher.subjects.map((subject) => subject.name).join(", ");
        },
      },
      {
        label: "Actions",
        key: "actions",
        renderer: (teacher: ITeacher) => {
          return <button onClick={() => handleEdit(teacher)}>Edit</button>;
        },
      },
    ],
    []
  );

  const handleEdit = (teacher: ITeacher) => {
    setSelectedTeacher(teacher);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedTeacher(null);
    setDialogOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Teachers</h1>
      <Table<ITeacher> columns={columns} data={data?.getTeachers || []} />
      {selectedTeacher && (
        <UpdateTeacherDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          teacher={selectedTeacher}
        />
      )}
    </div>
  );
};

export { TeachersTable };
