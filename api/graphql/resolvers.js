const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getTeachers: () => {
      return prisma.teacher.findMany();
    },
    getPupils: () => {
      return prisma.pupil.findMany();
    },
    getSubjects: () => {
      return prisma.subject.findMany();
    },
  },

  Mutation: {
    // Admin login
    login: async (_, { email, password }) => {
      const admin = await prisma.admin.findUnique({ where: { email } });
      if (!admin) {
        throw new Error("Admin not found");
      }
      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) {
        throw new Error("Incorrect password");
      }
      const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return token;
    },

    // CRUD for Teacher
    addTeacher: (_, { name }) => {
      return prisma.teacher.create({ data: { name } });
    },
    editTeacher: (_, { id, name }) => {
      return prisma.teacher.update({
        where: { id: parseInt(id) },
        data: { name },
      });
    },
    deleteTeacher: (_, { id }) => {
      return prisma.teacher.delete({ where: { id: parseInt(id) } });
    },

    // CRUD for Pupil
    addPupil: (_, { name, grade }) => {
      return prisma.pupil.create({ data: { name, grade } });
    },
    editPupil: (_, { id, name, grade }) => {
      return prisma.pupil.update({
        where: { id: parseInt(id) },
        data: { name, grade },
      });
    },
    deletePupil: (_, { id }) => {
      return prisma.pupil.delete({ where: { id: parseInt(id) } });
    },

    // CRUD for Subject
    addSubject: (_, { name, teacherId }) => {
      return prisma.subject.create({
        data: {
          name,
          teacher: { connect: { id: parseInt(teacherId) } },
        },
      });
    },
    editSubject: (_, { id, name, teacherId }) => {
      return prisma.subject.update({
        where: { id: parseInt(id) },
        data: {
          name,
          teacher: { connect: { id: parseInt(teacherId) } },
        },
      });
    },
    deleteSubject: (_, { id }) => {
      return prisma.subject.delete({ where: { id: parseInt(id) } });
    },
  },

  Teacher: {
    subjects: (parent) => {
      return prisma.subject.findMany({ where: { teacherId: parent.id } });
    },
  },

  Pupil: {
    subjects: (parent) => {
      return prisma.subject.findMany({
        where: { pupils: { some: { id: parent.id } } },
      });
    },
  },

  Subject: {
    teacher: (parent) => {
      return prisma.teacher.findUnique({ where: { id: parent.teacherId } });
    },
    pupils: (parent) => {
      return prisma.pupil.findMany({
        where: { subjects: { some: { id: parent.id } } },
      });
    },
  },
};

module.exports = { resolvers };
