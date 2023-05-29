import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Query {
    getComments: GetCommentsReturnType
  }

  type Mutation {
    createComment(postId: String, content: String): Boolean
    deleteComment(commentId: String): Boolean
  }

  type Comment {
    content: String
    author: User
    createdAt: Date
  }

  type User {
    id: String
    name: String
    image: String
  }

  type GetCommentsReturnType {
    comments: [Comment]
  }

  type CommentReturnType {
    success: Boolean
  }
`;

export default typeDefs;
