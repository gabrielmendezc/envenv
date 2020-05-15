import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    getEnvironments: [Environment]
  }

  extend type Mutation {
    createEnvironment(data: CreateEnvironmentInput): Environment
  }

  type Environment @key(fields: "id") {
    id: Int!
    name: String!
    owner: User!
    members: [EnvironmentMember]
  }

  type EnvironmentMember @key(fields: "id") {
    id: Int!
    environment: Environment
    environmentRole: EnvironmentRole
    user: User!
  }

  input CreateEnvironmentInput {
    name: String!
    userCreatingEnvironmentId: Int!
  }

  enum EnvironmentRole {
    ADMIN
    CONTRIBUTOR
  }

  extend type User @key(fields: "id") {
    id: Int! @external
    environments: [Environment]
  }
`;

export default typeDefs;
