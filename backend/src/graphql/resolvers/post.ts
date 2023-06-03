import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";
import jwt from "jsonwebtoken";

export default {
  Query: {
    getPosts: async (_: any, args: {}, context: Context) => {
      const { session, prisma } = context;

      if (!session?.token) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const decodedToken = jwt.verify(
          session.token,
          process.env.JWT_SECRET as string
        );
        const sessionId = (<any>decodedToken).id;
        const posts = await prisma.post.findMany({
          where: {
            authorId: sessionId,
          },
        });

        return {
          posts,
        };
      } catch (error: any) {
        console.log("Error getting posts :", error.message);
        throw new GraphQLError("Error querying posts", {
          extensions: { code: 500 },
        });
      }
    },
  },
  Mutation: {
    createPost: async (_: any, args: { content: string }, context: Context) => {
      const { session, prisma } = context;
      const { content } = args;

      if (!session?.token) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const decodedToken = jwt.verify(
          session.token,
          process.env.JWT_SECRET as string
        );
        const sessionId = (<any>decodedToken).id;
        await prisma.post.create({
          data: {
            content,
            authorId: sessionId,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error creating post :", error.message);
        throw new GraphQLError("Error creating post", {
          extensions: { code: 500 },
        });
      }
    },

    updatePost: async (
      _: any,
      args: { postId: string; content: string },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { postId, content } = args;

      if (!session?.token) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            content,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error updating post :", error.message);
        throw new GraphQLError("Error updating post", {
          extensions: { code: 500 },
        });
      }
    },

    deletePost: async (_: any, args: { postId: string }, context: Context) => {
      const { session, prisma } = context;
      const { postId } = args;

      if (!session?.token) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        await prisma.post.delete({ where: { id: postId } });
        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error deleting post :", error.message);
        throw new GraphQLError("Error deleting post", {
          extensions: { code: 500 },
        });
      }
    },
  },
};