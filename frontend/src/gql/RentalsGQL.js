import { gql } from "apollo-boost";

export const GET_RENTALS_QUERY = gql`
  query {
    rentalProjects {
      id
      title
      abbreviation
      season
      primaryRoom {
        id
        room {
          id
          name
        }
      }
      totalDrives
      channelConfig
      filesLink
    }
  }
`;

export const GET_RENTAL_QUERY = gql`
  query($id: Int!) {
    rentalProject(id: $id) {
      id
      title
      abbreviation
      season
      primaryRoom {
        id
        room {
          id
          name
        }
      }
      totalDrives
      channelConfig
      filesLink
      driveUser
      drivePass
      msUser
      msPass
      additionalInfo
      startDate
      mixingCompleteDate
      projectCompleteDate
      totalStorage
      rentalClients {
        id
        client {
          id
          firstName
          lastName
        }
        clientRole
      }
      rentalDrives {
        id
        drive {
          id
          driveNumber
          driveCapacityGb
        }
      }
    }
  }
`;

export const GET_PRIMARY_ROOM_QUERY = gql`
  query($id: Int!) {
    primaryRoom(id: $id) {
      id
      room {
        id
        name
        mediaShuttleConnectionIp
        mediaShuttleSubnet
        mediaShuttleHost
        mediaShuttleIpRange
      }
      msClients {
        id
        clientMs
        projectClient {
          id
          client {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export const GET_ROOMS_QUERY = gql`
  query($id: Int!) {
    projectRooms(id: $id) {
      id
      primaryRoom
      room {
        id
        name
      }
    }
  }
`;

// Mutations

export const CREATE_RENTAL = gql`
  mutation(
    $title: String!
    $season: Int
    $abbreviation: String!
    $channelConfig: String!
    $startDate: Date
    $filesLink: String!
  ) {
    createRentalProject(
      title: $title
      season: $season
      abbreviation: $abbreviation
      channelConfig: $channelConfig
      startDate: $startDate
      filesLink: $filesLink
    ) {
      project {
        id
        title
        abbreviation
        season
        primaryRoom {
          id
          room {
            id
            name
          }
        }
        totalDrives
        channelConfig
        filesLink
      }
    }
  }
`;

export const DELETE_RENTAL = gql`
  mutation($projectId: Int!) {
    deleteRentalProject(projectId: $projectId) {
      projectId
    }
  }
`;

export const EDIT_BASIC_INFO = gql`
  mutation(
    $id: Int!
    $title: String
    $season: Int
    $abbreviation: String
    $channelConfig: String
    $driveUser: String
    $drivePass: String
    $msUser: String
    $msPass: String
    $filesLink: String
  ) {
    updateRentalProject(
      id: $id
      title: $title
      season: $season
      abbreviation: $abbreviation
      channelConfig: $channelConfig
      driveUser: $driveUser
      drivePass: $drivePass
      msUser: $msUser
      msPass: $msPass
      filesLink: $filesLink
    ) {
      project {
        id
        title
        season
        abbreviation
        channelConfig
        driveUser
        drivePass
        msUser
        msPass
        filesLink
      }
    }
  }
`;

export const EDIT_RENTAL_NOTES = gql`
  mutation($id: Int!, $notes: String) {
    updateRentalProject(id: $id, additionalInfo: $notes) {
      project {
        id
        additionalInfo
      }
    }
  }
`;

export const CREATE_RENTAL_CLIENT = gql`
  mutation($clientId: Int!, $projectId: Int!, $clientRole: String) {
    createProjectClient(
      clientId: $clientId
      projectId: $projectId
      clientRole: $clientRole
    ) {
      projectClient {
        id
        client {
          id
          name
        }
        clientRole
      }
    }
  }
`;
