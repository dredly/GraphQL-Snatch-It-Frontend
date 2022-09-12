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