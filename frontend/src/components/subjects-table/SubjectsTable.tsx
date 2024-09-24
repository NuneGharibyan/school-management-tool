import { useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { GET_SUBJECTS } from "../../client/queries";
import { ISubject } from "../../interfaces";
import Table from "../table/Table";
import UpdateSubjectDialog from "../update-subject-dialog/UpdateSubjectDialog";

const SubjectsTable: React.FC = () => {
  const { loading, error, data } = useQuery<{ getSubjects: ISubject[] }>(
    GET_SUBJECTS
  );

  const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null);
  const columns = useMemo(
    () => [
      { label: "ID", key: "id" },
      { label: "Name", key: "name" },
      { label: "Grade", key: "grade" },
      {
        label: "Teacher",
        key: "teacher",
        renderer: (subject: ISubject) => subject.teacher.name,
      },
      {
        label: "Actions",
        key: "actions",
        renderer: (subject: ISubject) => (
          <button onClick={() => openEditDialog(subject)}>Edit</button>
        ),
      },
    ],
    []
  );

  const openEditDialog = (subject: ISubject) => {
    setSelectedSubject(subject);
  };

  const closeDialog = () => {
    setSelectedSubject(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Subjects</h1>
      <Table<ISubject> columns={columns} data={data?.getSubjects || []} />
      {selectedSubject && (
        <UpdateSubjectDialog
          open={!!selectedSubject}
          onClose={closeDialog}
          subject={selectedSubject}
        />
      )}
    </div>
  );
};

export { SubjectsTable };
