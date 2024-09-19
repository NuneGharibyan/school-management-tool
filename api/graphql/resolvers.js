const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

const resolvers = {
  Query: {
    // me: async (_, __, { prisma, user }) => {
    //   if (!user) throw new Error("Not authenticated");
    //   return await prisma.user.findUnique({ where: { id: user.id } });
    // },
    teachers: (_, __, { prisma }) => prisma.teacher.findMany(),
    pupils: (_, __, { prisma }) => prisma.pupil.findMany(),
    subjects: (_, __, { prisma }) => prisma.subject.findMany(),
  },
  Mutation: {
    login: async (_, { email, password }, { prisma }) => {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }

      return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
        expiresIn: "1h",
      });
    },
    createTeacher: async (_, { name }, { prisma, user }) => {
      //   if (!user || user.role !== "ADMIN") throw new Error("Not authorized");

      return await prisma.teacher.create({
        data: {
          name,
          email: `${name}@example.com`,
          password: "password",
        },
      });
    },
    createPupil: async (_, { name, grade }, { prisma, user }) => {
      if (!user || user.role !== "ADMIN") throw new Error("Not authorized");

      return await prisma.pupil.create({
        data: {
          name,
          grade,
          user: {
            create: {
              email: `${name}@example.com`,
              password: "password",
              role: "PUPIL",
            },
          },
        },
      });
    },
    createSubject: async (_, { name, grade }, { prisma }) => {
      return await prisma.subject.create({
        data: { name, grade },
      });
    },
    updateTeacher: async (_, { id, name }, { prisma, user }) => {
      if (!user || user.role !== "ADMIN") throw new Error("Not authorized");
      return await prisma.teacher.update({
        where: { id },
        data: { name },
      });
    },
    updatePupil: async (_, { id, name, grade }, { prisma, user }) => {
      if (!user || user.role !== "ADMIN") throw new Error("Not authorized");
      return await prisma.pupil.update({
        where: { id },
        data: { name, grade },
      });
    },
    updateSubject: async (_, { id, name, grade }, { prisma }) => {
      return await prisma.subject.update({
        where: { id },
        data: { name, grade },
      });
    },
    deleteTeacher: async (_, { id }, { prisma, user }) => {
      if (!user || user.role !== "ADMIN") throw new Error("Not authorized");
      return await prisma.teacher.delete({
        where: { id },
      });
    },
    deletePupil: async (_, { id }, { prisma, user }) => {
      if (!user || user.role !== "ADMIN") throw new Error("Not authorized");
      return await prisma.pupil.delete({
        where: { id },
      });
    },
    deleteSubject: async (_, { id }, { prisma }) => {
      return await prisma.subject.delete({
        where: { id },
      });
    },
  },
};

module.exports = { resolvers };
