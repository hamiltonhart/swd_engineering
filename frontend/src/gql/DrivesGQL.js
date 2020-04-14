import { gql } from "apollo-boost";

export const ALL_DRIVES_QUERY = gql`
  query {
    drives {
      id
      driveNumber
      driveCapacityGb
      rentalProjects {
        id
        project {
          id
          title
        }
      }
      currentProject {
        id
        title
        season
      }
    }
    drivesAvailable {
      twoFiftyAvailable
      fiveHundredAvailable
      oneTbAvailable
      twoTbAvailable
    }
  }
`;

export const GET_LAST_DRIVE = gql`
  query {
    lastDrive {
      id
      driveNumber
    }
  }
`;

// Mutations

export const CREATE_DRIVE = gql`
  mutation(
    $driveCapacityGb: String!
    $driveNumber: Int!
    $numberOfDrives: Int
  ) {
    createDrive(
      driveCapacityGb: $driveCapacityGb
      driveNumber: $driveNumber
      numberOfDrives: $numberOfDrives
    ) {
      drives {
        id
        driveNumber
        driveCapacityGb
      }
    }
  }
`;

export const DELETE_DRIVE = gql`
  mutation($driveId: Int!) {
    deleteDrive(driveId: $driveId) {
      driveId
    }
  }
`;

export const UPDATE_DRIVE = gql`
  mutation($id: Int!, $driveNumber: Int, $driveCapacityGb: String) {
    updateDrive(
      id: $id
      driveNumber: $driveNumber
      driveCapacityGb: $driveCapacityGb
    ) {
      drive {
        id
        driveNumber
        driveCapacityGb
      }
    }
  }
`;

export const RELEASE_DRIVE = gql`
  mutation($driveId: Int!) {
    releaseDrive(driveId: $driveId) {
      driveId
    }
  }
`;
