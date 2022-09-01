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

export const JOIN_GAME = gql`
	mutation joinGame($playerId: ID!, $gameId: ID!) {
		joinGame(playerID: $playerId, gameID: $gameId) {
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

export const DECLARE_READINESS = gql`
	mutation declareReadiness($playerId: ID!) {
		declareReadiness(playerID: $playerId) {
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

export const START_GAME = gql`
	mutation startGame($gameId: ID!) {
		startGame(gameID: $gameId) {
			id
    		started
    		players {
      			id
      			name
				ready
    		}
			letters {
				id
				value
				exposed
			}
		}
	}
`