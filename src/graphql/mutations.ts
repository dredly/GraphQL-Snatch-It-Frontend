import { gql } from "@apollo/client";
import { GAME_IN_LOBBY_DETAILS, GAME_DETAILS } from "./fragments";

export const CREATE_PLAYER = gql`
	mutation createPlayer($name: String!) {
		createPlayer(name: $name) {
			id
			name
  		}
	}
`;

export const CREATE_GAME = gql`
	mutation createGame($playerId: ID!) {
		createGame(playerID: $playerId) {
			...GameInLobbyDetails
		}
	}
	${GAME_IN_LOBBY_DETAILS}
`

export const JOIN_GAME = gql`
	mutation joinGame($playerId: ID!, $gameId: ID!) {
		joinGame(playerID: $playerId, gameID: $gameId) {
			...GameInLobbyDetails
		}
	}
	${GAME_IN_LOBBY_DETAILS}
`

export const DECLARE_READINESS = gql`
	mutation declareReadiness($playerId: ID!) {
		declareReadiness(playerID: $playerId) {
			...GameInLobbyDetails
		}
	}
	${GAME_IN_LOBBY_DETAILS}
`

// Might not actually need all this info as it is handled by subscriptions
export const START_GAME = gql`
	mutation startGame($gameId: ID!) {
		startGame(gameID: $gameId) {
			...GameDetails
		}
	}
	${GAME_DETAILS}
`

export const WRITE_WORD = gql`
	mutation writeWord($playerId: ID!, $gameId: ID!, $word: String!) {
		writeWord(playerID: $playerId, gameID: $gameId, word: $word) {
			...GameDetails
		}
	}
	${GAME_DETAILS}
`

export const SNATCH_WORD = gql`
	mutation snatchWord($playerId: ID!, $gameId: ID!, $word: String!, $snatchFromId: ID!) {
		snatchWord(playerID: $playerId, gameID: $gameId, word: $word, snatchFromID: $snatchFromId) {
			...GameDetails
		}
	}
	${GAME_DETAILS}
`