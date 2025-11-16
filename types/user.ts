export type User = {
  id: string | number;
  email: string;
  phone?: string;
  address?: string;
  fullname?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  phone: string;
  password: string;
  address: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
