import { gql } from "apollo-boost";

export const HOME_PAGE_QUERY = gql`
  query($limit: Int, $reverse: Boolean) {
    contacts(limit: $limit, reverse: $reverse) {
      id
      firstName
      lastName
      company
      title
      email
      phoneNumber
    }
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
    drivesAvailable {
      twoFiftyAvailable
      fiveHundredAvailable
      oneTbAvailable
      twoTbAvailable
    }
  }
`;
