import { gql } from "@apollo/client";

export const GAME_IN_LOBBY_DETAILS = gql`
    fragment GameInLobbyDetails on Game {
        id
    	started
    	players {
      		id
      		name
      		ready
    	}
    }
`

export const GAME_DETAILS = gql`
    fragment GameDetails on Game {
        id
    	started
    	players {
      		id
      		name
			ready
			words {
				id
				letters {
					id
					value
				}
			}
    	}
		letters {
			unflipped {
				id
				value
			}
			flipped {
				id
				value
			}
		}
    }
`