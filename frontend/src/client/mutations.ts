import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
      admin {
        id
        email
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      admin {
        id
        email
      }
    }
  }
`;

export const UPDATE_TEACHER = gql`
  mutation EditTeacher($id: ID!, $name: String!) {
    editTeacher(id: $id, name: $name) {
      id
      name
      subjects {
        id
        name
      }
    }
  }
`;

export const UPDATE_SUBJECT = gql`
  mutation EditSubject($id: ID!, $name: String!, $teacherId: ID!) {
    editSubject(id: $id, name: $name, teacherId: $teacherId) {
      id
      name
      teacher {
        id
        name
      }
    }
  }
`;
