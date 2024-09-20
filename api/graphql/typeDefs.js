const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Admin {
    id: ID!
    email: String!
  }

  type Teacher {
    id: ID!
    name: String!
    subjects: [Subject!]!
  }

  type Pupil {
    id: ID!
    name: String!
    grade: Int!
    subjects: [Subject!]!
  }

  type Subject {
    id: ID!
    name: String!
    teacher: Teacher!
    pupils: [Pupil!]!
  }

  type Query {
    getTeachers: [Teacher!]!
    getPupils: [Pupil!]!
    getSubjects: [Subject!]!
  }

  type Mutation {
    login(email: String!, password: String!): String!
    addTeacher(name: String!): Teacher!
    editTeacher(id: ID!, name: String!): Teacher!
    deleteTeacher(id: ID!): Boolean!

    addPupil(name: String!, grade: Int!): Pupil!
    editPupil(id: ID!, name: String!, grade: Int!): Pupil!
    deletePupil(id: ID!): Boolean!

    addSubject(name: String!, teacherId: ID!): Subject!
    editSubject(id: ID!, name: String!, teacherId: ID!): Subject!
    deleteSubject(id: ID!): Boolean!
  }
`;

module.exports = { typeDefs };
