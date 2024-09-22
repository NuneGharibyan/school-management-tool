import { PupilsTable } from "../pupils-table/PupilsTable";
import { SubjectsTable } from "../subjects-table/SubjectsTable";
import { TeachersTable } from "../teachers-table/TeachersTable";

function Dashboard() {
  return (
    <div style={{ margin: "35px" }}>
      <TeachersTable />
      <SubjectsTable />
      <PupilsTable />
    </div>
  );
}

export default Dashboard;
