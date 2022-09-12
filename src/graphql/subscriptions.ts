import { gql } from "@apollo/client";
import { GAME_IN_LOBBY_DETAILS, GAME_DETAILS } from "./fragments";

export const GAME_ADDED = gql`
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

export const GAME_STARTED = gql`
	subscription {
		gameStarted {
			...GameInLobbyDetails
		}
	}
	${GAME_IN_LOBBY_DETAILS}
`

export const GAME_UPDATED = gql`
	subscription {
		gameUpdated {
			...GameDetails
		}
	}
	${GAME_DETAILS}
`