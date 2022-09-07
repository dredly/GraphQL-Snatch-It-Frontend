export interface Player {
	name: string
	ready: boolean
	id: string
}

export interface GameInfo {
	players: Player[]
	id: string
}

export interface Letter {
	id: string
	value: string
}

export interface Letters {
	unflipped: Letter[]
	flipped: Letter[]
  }

export interface Game extends GameInfo {
	letters: Letters
}