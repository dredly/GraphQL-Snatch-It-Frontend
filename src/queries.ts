import { gql } from "@apollo/client";

export const ALL_GAMES = gql`
  	query {
    	allGames {
    		id
    		started
    		players {
      			id
      			name
      			ready
    		}
  		}
  	}
`;

export const GAME_BY_ID = gql`
	query gameById($gameId: ID!) {
		gameById(gameID: $gameId) {
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
	}
`