import { ApolloProvider } from "@apollo/client";
import "./App.css";
import client from "./client/apollo-client";
import { PupilsTable } from "./components/pupils-table/PupilsTable";
import { SubjectsTable } from "./components/subjects-table/SubjectsTable";
import { TeachersTable } from "./components/teachers-table/TeachersTable";

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <TeachersTable />
        <SubjectsTable />
        <PupilsTable />
      </div>
    </ApolloProvider>
  );
}

export default App;
