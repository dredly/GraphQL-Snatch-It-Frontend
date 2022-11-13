export interface PlayerInfo {
	name: string
	ready: boolean
	id: string
}

export interface GameInfo {
	players: PlayerInfo[]
	id: string
}

export interface Letter {
	id: string
	value: string
}

export interface Word {
	id: string
	letters: Letter[]
}

export interface Letters {
	unflipped: Letter[]
	flipped: Letter[]
  }

export interface Player extends PlayerInfo {
	words: Word[]
}

export interface Game extends GameInfo {
	players: Player[]
	letters: Letters
}

export interface PlayerScore {
	id: string
	score: number
}

export interface GameSummary {
	id: string
	scoreList: PlayerScore[]
}
