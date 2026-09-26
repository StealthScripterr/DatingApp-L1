export interface User {
  id: string;
  displayName: string;
  age: string;
  email: string;
  profileImageUrl?: string;
  token: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
    displayName: string;
    age: string;
    email: string;
    password: string;
    profileImageUrl?: string; // Optional profile picture
};