export interface PlayerInfo {
	name: string
	ready: boolean
	id: string
}

export type Status = 'NOT_STARTED' | 'IN_PROGRESS' | 'FINISHED'

export interface GameInfo {
	id: string
	status: Status
	players: PlayerInfo[]
}

export interface Letter {
	id: string
	value: string
	rotation: number
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

export interface Game extends Omit<GameInfo, 'status'> {
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

export interface PlayerScoreWithName extends PlayerScore {
	name: string
}

export interface GameSummaryWithNames {
	id: string
	scoreList: PlayerScoreWithName[]
}

export interface Message {
	text: string
}
