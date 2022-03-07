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
            messageId
            text
            timestamp
            type
        }
    }
`

export const SUBSCRIPTION_MESSAGE_FEED = gql`
    subscription MessageFeed {
        messageFeed {
            messageId
            text
            timestamp
            type
        }
    }
`

export const QUERY_MESSAGES = gql`
    query Messages {
        messages {
            messageId
            text
            timestamp
            type
        }
    }
`

export const QUERY_ME = gql`
    query Messages {
        me
    }
`