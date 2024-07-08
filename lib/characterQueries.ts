import { gql } from '@apollo/client';
import client from './apollo-client';

// Fetches a list of characters with id, name, status, species, gender, and image fields based on a specified page.
export const GET_CHARACTERS_QUERY = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

// Retrieves details of a character by id, including name, status, species, gender, and image.
export const GET_CHARACTER_QUERY = gql`
    query GetCharacter($id: ID!) {
        character(id: $id) {
            id
            name
            status
            species
            gender
            image
        }
    }
`;

// Retrieves the total number of pages available for characters.
export const GET_CHARACTERS_TOTAL_PAGES_QUERY = gql`
  query GetCharactersTotalPages {
    characters {
      info {
        pages
      }
    }
  }
`;

/*
  - Asynchronously fetches characters using client.query with GET_CHARACTERS_QUERY.
  - Accepts pageNumber as a parameter to specify the page of characters to fetch.
  - Uses fetchPolicy: 'no-cache' to ensure fresh data retrieval from the server.
  - Returns an object with data, status (200 for success), and statusMessage ('OK' for success or 'Bad Request' for failure).
*/
export const getCharacters = async (pageNumber: number): Promise<any> => {
    try {
      const { data } = await client.query({
        query: GET_CHARACTERS_QUERY,
        variables: { page: pageNumber },
        fetchPolicy: 'no-cache',
      });

      return {
        data,
        status: 200,
        statusMessage: 'OK',
      };
    } catch (error) {
      return {
        data: {},
        status: 400,
        statusMessage: 'Bad Request',
      };
    }
  };

  /*
  - Asynchronously fetches total pages of characters using client.query with GET_CHARACTERS_TOTAL_PAGES_QUERY.
  - Uses fetchPolicy: 'no-cache' to ensure fresh data retrieval from the server.
  - Returns an object with data, status (200 for success), and statusMessage ('OK' for success or 'Bad Request' for failure).
  */
  export const getCharacterTotalPages = async (): Promise<any> => {
    try {
      const { data } = await client.query({
        query: GET_CHARACTERS_TOTAL_PAGES_QUERY,
        fetchPolicy: 'no-cache',
      });

      return {
        data,
        status: 200,
        statusMessage: 'OK',
      };
    } catch (error) {
      return {
        data: {},
        status: 400,
        statusMessage: 'Bad Request',
      };
    }
  };
