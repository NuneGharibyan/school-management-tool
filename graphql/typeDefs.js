// graphql/typeDefs.js
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum Role {
    ADMIN
    TEACHER
    PUPIL
  }

  type User {
    id: Int!
    email: String!
    role: Role!
  }

  type Teacher {
    id: Int!
    name: String!
    subjects: [Subject!]!
  }

  type Pupil {
    id: Int!
    name: String!
    grade: Int!
    subjects: [Subject!]!
  }

  type Subject {
    id: Int!
    name: String!
    grade: Int!
    teachers: [Teacher!]!
    pupils: [Pupil!]!
  }

  type Query {
    me: User
    teachers: [Teacher!]!
    pupils: [Pupil!]!
    subjects: [Subject!]!
  }

  type Mutation {
    login(email: String!, password: String!): String
    createTeacher(name: String!): Teacher
    createPupil(name: String!, grade: Int!): Pupil
    createSubject(name: String!, grade: Int!): Subject
    updateTeacher(id: Int!, name: String!): Teacher
    updatePupil(id: Int!, name: String!, grade: Int!): Pupil
    updateSubject(id: Int!, name: String!, grade: Int!): Subject
    deleteTeacher(id: Int!): Teacher
    deletePupil(id: Int!): Pupil
    deleteSubject(id: Int!): Subject
  }
`;

module.exports = { typeDefs };
