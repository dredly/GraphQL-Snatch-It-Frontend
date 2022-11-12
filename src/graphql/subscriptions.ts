import { gql } from "@apollo/client";
import { GAME_IN_LOBBY_DETAILS, GAME_DETAILS } from "./fragments";

export const GAME_INFO_ADDED = gql`
	subscription {
		gameAdded {
			...GameInLobbyDetails
		}
	}
	${GAME_IN_LOBBY_DETAILS}
`

export const GAME_INFO_UPDATED = gql`
	subscription {
		gameUpdated {
			...GameInLobbyDetails
		}
	}
	${GAME_IN_LOBBY_DETAILS}
`

export const GAME_STARTED_LOBBY = gql`
	subscription {
		gameStarted {
			...GameInLobbyDetails
		}
	}
	${GAME_IN_LOBBY_DETAILS}
`

export const GAME_STARTED = gql`
	subscription {
		gameInProgressStarted {
			...GameDetails
		}
	}
	${GAME_DETAILS}
`

export const GAME_UPDATED = gql`
	subscription {
		gameInProgressUpdated {
			...GameDetails
		}
	}
	${GAME_DETAILS}
`

export const GAME_ENDED = gql`
	subscription {
		gameEndedSummary {
			id
			# TODO: complete the rest of this once we know the GQL type
		}
	}
`