import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

export default {
  Query: {
    getSkills: async (_: any, args: { userId?: string }, context: Context) => {
      const { session, prisma } = context;
      const { userId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        let skills;

        if (userId) {
          skills = await prisma.userSkill.findMany({
            where: {
              userId,
            },
            include: {
              skill: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          });

          skills = skills.map((skill) => ({
            id: skill.skill?.id,
            name: skill.skill?.name,
          }));
        } else {
          skills = await prisma.skill.findMany();
        }

        return {
          skills,
        };
      } catch (error: any) {
        console.log("Error getting skills :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
  Mutation: {
    addSkill: async (_: any, args: { name: string }, context: Context) => {
      const { session, prisma } = context;
      const { name } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const existingSkill = await prisma.skill.findFirst({
          where: { slug: name.toLowerCase() },
        });

        if (existingSkill) {
          console.log("exists : ", existingSkill.name);

          await prisma.userSkill.create({
            data: {
              skillId: existingSkill.id,
              userId: session.user.id,
            },
          });
        } else {
          await prisma.user.update({
            where: { id: session.user.id },
            data: {
              skills: {
                create: {
                  skill: {
                    create: {
                      name,
                      slug: name.toLowerCase(),
                    },
                  },
                },
              },
            },
          });
        }

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error adding skill :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },

    deleteSkill: async (
      _: any,
      args: { skillId: string },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { skillId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.userSkill.delete({
          where: {
            userId_skillId: {
              userId: session.user.id,
              skillId,
            },
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error deleting skill :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
};
