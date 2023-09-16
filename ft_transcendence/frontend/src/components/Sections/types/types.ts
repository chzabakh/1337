export interface Player {
  id: number;
  nickname: string;
  sockerId: string;
  score: number;
}

export class Ball {
  x!: number;
  y!: number;
}

export class GameTable {
  player1: Player | null = null;
  player2: Player | null = null;
  ball: Ball | undefined;
  roomName: string | undefined;
}

export interface Owner {
  FirstLogin: boolean;
  TwoFaAuthEnabled: boolean;
  TwofaAuthSecret: string;
  avatarUrl: string;
  createdaAt: string;
  email: string;
  friendStatus: string;
  hash: string;
  id: number;
  nickname: string;
  provider: string;
  state: string;
  updatedAt: string;
}
export interface Users {
  TwofaAutEnabled: boolean;
  TwofaAutSecret: boolean;
  avatarUrl: string;
  createdAt: string;
  email: string;
  friendStatus: string;
  id: number;
  nickname: string;
  provider: string;
  state: string;
  updatedAt: string;
}

export interface Channel {
  createdAt: string;
  id: number;
  isGroup: boolean;
  isPrivate: boolean;
  isPrivateKey: boolean;
  isProtected: boolean;
  lastMessageAt: string;
  name: string;
  owner: Owner;
  ownerID: number;
  password: string;
  uid: string;
  users: Users[];
}

export type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  nickname: string;
  hash: string;
  TwofaAutSecret: null | string;
  TwofaAutEnabled: boolean;
  FirstLogin: boolean;
  avatarUrl: string;
  state: string;
  provider: string;
  friendStatus: string;
  isChanged: boolean;
};

export interface ChatRoomProps {
  room: Channel;
}

export type Message = {
  content: string;
  roomID: string;
  seen: User[];
  createdAt: string;
  sender: User;
};

export type ChatRoom = {
  id: number;
  createdAt: string;
  lastMessageAt: string;
  name: string;
  isPrivate: null | boolean;
  isPrivateKey: null | boolean;
  isProtected: null | boolean;
  isGroup: boolean;
  password: null | string;
  uid: string;
  ownerID: number;
  users: User[];
  admins: User[];
  owner: User;
  messages: Message[];
};

export type Friend = {
  id: number;
  nickname: string;
  state: string;
  avatarUrl: string;
  provider: string;
};
