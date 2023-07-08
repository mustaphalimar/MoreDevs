import { gql } from "@apollo/client";

export default {
  Queries: {
    getOffers: gql`
      query GetOffers($companyId: String) {
        getOffers(companyId: $companyId) {
          offers {
            id
            title
            description
            taken
            type
            location
            company {
              id
              name
              location
              avatar
            }
            createdAt
          }
        }
      }
    `,
    getOffer: gql`
      query GetOffers($id: String!) {
        getOffer(id: $id) {
          offer {
            id
            title
            description
            taken
            type
            location
            company {
              id
              name
              location
              avatar
            }
            skills {
              skill {
                id
                name
              }
            }
            createdAt
          }
        }
      }
    `,
  },
  Mutations: {
    createOffer: gql`
      mutation CreateOffer(
        $companyId: String!
        $title: String!
        $description: String!
        $location: String!
        $skillsIds: [String]!
        $type: String!
      ) {
        createOffer(
          companyId: $companyId
          title: $title
          description: $description
          location: $location
          skillsIds: $skillsIds
          type: $type
        ) {
          success
        }
      }
    `,
  },
};
