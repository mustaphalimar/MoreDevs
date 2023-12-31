import { gql } from "@apollo/client";

const profileOperations = {
  Queries: {
    getProfile: gql`
      query GetProfile($userId: String!) {
        getProfile(userId: $userId) {
          profile {
            first_name
            last_name
            email
            city
            bio
            isFollowed
            educations {
              endedAt
              startedAt
              id
              level
              description
              title
            }
            experiences {
              id
              location
              description
              startDate
              endDate
              title
              company
              present
            }
            following {
              id
              name
            }
            followers {
              id
              name
            }
            id
            image
            location
            name
            job_type
            job_title
            skills {
              id
              name
            }
          }
        }
      }
    `,
  },
  Mutations: {
    setUpProfile: gql`
      mutation SetUpProfile(
        $id: String
        $first_name: String
        $last_name: String
        $job_title: String
        $job_type: String
        $bio: String
        $city: String
      ) {
        setUpProfile(
          id: $id
          first_name: $first_name
          last_name: $last_name
          job_title: $job_title
          job_type: $job_type
          bio: $bio
          city: $city
        ) {
          success
        }
      }
    `,
  },
};

export default profileOperations;
