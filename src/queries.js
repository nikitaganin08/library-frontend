import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query getAuthors {
        allAuthors {
            name,
            born,
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query getBooks {
        allBooks {
            title,
            author,
            published
        }
    }
`