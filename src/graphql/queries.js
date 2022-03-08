import {gql} from "@apollo/client/core";

export const MUTATION_LOGIN = gql`
    mutation Login($jwt: String!) {
        login(jwt: $jwt) {
            success
        }
    }
`
export const MUTATION_SEND_MESSAGE = gql`
    mutation SendMessage($text: String!) {
        sendMessage(text: $text) {
            _id
            text
            timestamp
            type,
            user {
                displayName
            }
        }
    }
`

export const SUBSCRIPTION_MESSAGE_FEED = gql`
    subscription MessageFeed {
        messageFeed {
            _id
            text
            timestamp
            type
            user {
                displayName
            }
        }
    }
`

export const QUERY_MESSAGES = gql`
    query Messages {
        messages {
            _id
            text
            timestamp
            type
            user {
                displayName
            }
        }
    }
`

export const QUERY_ME = gql`
    query Messages {
        me
    }
`

export const QUERY_USER = gql`
    query User {
        user {
            displayName
        }
    }
`