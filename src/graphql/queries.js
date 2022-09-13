import {gql} from "@apollo/client/core";

export const MUTATION_LOGIN = gql`
    mutation Login($jwt: String!) {
        login(jwt: $jwt) {
            success
        }
    }
`

export const MUTATION_MAKE_MOVE = gql`
    mutation MakeMove($gameId: String!, $actions: [Action]) {
        makeMove(gameId: $gameId, actions: $actions)
    }

`

export const QUERY_GAMES = gql`
    query Games {
        games {
            _id
            name
            users {
                _id
                displayName
            }
            state
        }
    }
`

export const SUBSCRIPTION_GAMES_FEED = gql`
    subscription GamesFeed {
        gameFeed {
            _id
            name
            users {
                _id
                displayName
            }
            state
        }
    }
`

export const MUTATION_CREATE_GAME = gql`
    mutation CreateGame($name: String!) {
        createGame(name: $name) {
            _id
            name
            users {
                displayName
            }
            state
        }
    }
`

export const MUTATION_CLOSE_GAME = gql`
    mutation CloseGame($gameId: String!) {
        closeGame(gameId: $gameId) {
            _id
            name
            users {
                displayName
            }
            state
        }
    }
`

export const MUTATION_JOIN_GAME = gql`
    mutation CloseGame($gameId: String!) {
        joinGame(gameId: $gameId) {
            _id
            name
            users {
                displayName
            }
            state
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

export const SUBSCRIPTION_BOARD_UPDATES = gql`
    subscription BoardUpdates($gameId: String!) {
        boardUpdates(gameId: $gameId) {
            connections
            nodes {
                label
                x
                y
            }
            pieces {
                label
                location
            }
            roles {
                role
                user {
                    _id
                    displayName
                }
            }
            turn
        }
    }
`

export const QUERY_BOARD = gql`
    query Board($gameId: String!) {
        board(gameId: $gameId) {
            connections
            nodes {
                label
                x
                y
            }
            pieces {
                label
                location
            }
            roles {
                role
                user {
                    _id
                    displayName
                }
            }
            turn
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

export const QUERY_SESSION = gql`
    query Session {
        session
    }
`

export const QUERY_ME = gql`
    query Me {
        me {
            displayName
            _id
        }
    }
`