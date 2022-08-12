import { gql } from "@apollo/client";

export const ALL_GAMES= gql`
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