import { gql } from "@apollo/client";

export const GAME_ADDED = gql`
	subscription {
		gameAdded {
			id
			started
			players {
				id
				name
				ready
			}
		}
	}
`

export const PLAYER_JOINED = gql`
	subscription {
		playerJoined {
			id
			started
			players {
				id
				name
				ready
			}
		}
	}
`

export const PLAYER_READY = gql`
	subscription {
		playerReady {
			id
			started
			players {
				id
				name
				ready
			}
		}
	}
`

export const GAME_STARTED = gql`
	subscription {
		gameStarted {
			id
			started
			players {
				id
				name
				ready
			}
		}
	}
`