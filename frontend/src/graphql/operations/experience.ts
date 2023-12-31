import { gql } from "@apollo/client";

export default {
  Queries: {
    getExperiences: gql`
      query GetExperiences {
        getExperiences {
          experiences {
            id
            title
            description
            startDate
            endDate
            location
            present
            company
          }
        }
      }
    `,
  },
  Mutations: {
    addExperience: gql`
      mutation AddExperience(
        $title: String!
        $description: String!
        $location: String!
        $company: String!
        $startDate: String!
        $endDate: String
        $present: Boolean!
      ) {
        addExperience(
          title: $title
          description: $description
          location: $location
          company: $company
          startDate: $startDate
          endDate: $endDate
          present: $present
        ) {
          success
        }
      }
    `,

    deleteExperience: gql`
      mutation DeleteExperience($experienceId: String!) {
        deleteExperience(experienceId: $experienceId) {
          success
        }
      }
    `,
  },
};
