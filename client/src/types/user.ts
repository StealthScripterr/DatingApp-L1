export interface User {
  id: string;
  displayName: string;
  email: string;
  age?: number | null;
  profileImageUrl?: string;
  token: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
    displayName: string;
    age: number;
    email: string;
    password: string;
    profileImageUrl?: string; // Optional profile picture
};