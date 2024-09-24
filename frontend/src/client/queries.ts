import { gql } from "@apollo/client";

export const GET_TEACHERS = gql`
  query GetTeachers {
    getTeachers {
      id
      name
      subjects {
        id
        name
      }
    }
  }
`;

export const GET_SUBJECTS = gql`
  query GetSubjects {
    getSubjects {
      id
      name
      grade
      teacher {
        id
        name
      }
    }
  }
`;

export const GET_PUPILS = gql`
  query GetPupils {
    getPupils {
      id
      name
      grade
    }
  }
`;
