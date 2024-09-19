const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum Role {
    ADMIN
    TEACHER
    PUPIL
  }

  type Teacher {
    id: Int!
    name: String!
    email: String!
    subjects: [Subject!]!
  }

  type Pupil {
    id: Int!
    name: String!
    grade: Int!
    email: String!
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
    teachers: [Teacher!]!
    pupils: [Pupil!]!
    subjects: [Subject!]!
  }

  type Mutation {
    login(email: String!, password: String!): String

    createTeacher(name: String!): Teacher
    updateTeacher(
      id: Int!
      name: String
      email: String
      password: String
    ): Teacher
    deleteTeacher(id: Int!): Teacher

    createPupil(
      name: String!
      grade: Int!
      email: String!
      password: String!
    ): Pupil
    updatePupil(
      id: Int!
      name: String
      grade: Int
      email: String
      password: String
    ): Pupil
    deletePupil(id: Int!): Pupil

    createSubject(name: String!, grade: Int!): Subject
    updateSubject(id: Int!, name: String, grade: Int): Subject
    deleteSubject(id: Int!): Subject
  }
`;

module.exports = { typeDefs };
