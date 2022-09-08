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

export interface Game extends GameInfo {
	letters: Letters
}

export interface Player extends PlayerInfo {
	words: Word[]
}