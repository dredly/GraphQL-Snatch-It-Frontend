import { gql } from "@apollo/client";

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