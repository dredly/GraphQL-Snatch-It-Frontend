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