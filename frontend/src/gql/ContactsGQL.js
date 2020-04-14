import { gql } from "apollo-boost";

export const ALL_CONTACTS_QUERY = gql`
  query {
    contacts {
      id
      firstName
      lastName
      company
      title
      email
      phoneNumber
    }
  }
`;

export const CONTACT_QUERY = gql`
  query($id: Int!) {
    contact(id: $id) {
      id
      firstName
      lastName
      company
      title
      email
      phoneNumber
      notes
      rentalProjects {
        id
        project {
          id
          title
        }
      }
    }
  }
`;

// Mutations

export const CREATE_CONTACT = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String
    $phoneNumber: String
    $company: String
    $title: String
    $country: String
    $notes: String
  ) {
    createContact(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      company: $company
      title: $title
      country: $country
      notes: $notes
    ) {
      contact {
        id
        firstName
        lastName
        company
        title
        email
        phoneNumber
        notes
        rentalProjects {
          id
          project {
            id
            title
          }
        }
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation($contactId: Int!) {
    deleteContact(contactId: $contactId) {
      contactId
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation(
    $id: Int!
    $company: String
    $country: String
    $email: String
    $firstName: String
    $lastName: String
    $notes: String
    $phoneNumber: String
    $title: String
  ) {
    updateContact(
      id: $id
      company: $company
      country: $country
      email: $email
      firstName: $firstName
      lastName: $lastName
      notes: $notes
      phoneNumber: $phoneNumber
      title: $title
    ) {
      contact {
        id
        firstName
        lastName
        company
        title
        email
        phoneNumber
        notes
        rentalProjects {
          id
          project {
            id
            title
          }
        }
      }
    }
  }
`;
