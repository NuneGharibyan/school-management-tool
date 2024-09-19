import { ApolloProvider } from "@apollo/client";
import "./App.css";
import client from "./client/apollo-client";
import { TeachersTable } from "./components/teachers-table/TeachersTable";

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <TeachersTable />
      </div>
    </ApolloProvider>
  );
}

export default App;
