export type RegisterForm = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  telephone: string;
  birthday: string;
};

export type RegisterResponse = {
  authUserResponse: {
    uuid: string;
    username: string;
    email: string;
    role: string;
  };
  userResponse: {
    id: number;
    uuid: string;
    firstName: string;
    lastName: string;
    nationalId: string;
    telephone: string;
    birthday: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

type User = {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  telephone: string;
  birthday: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type Auth = {
  uuid: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
};

export type MeResponse = {
  user: User;
  auth: Auth;
};

export type ForgotPasswordRequest = {
  identifier: String;
};

export type ResetPasswordRequest = {
  token: String;
  newPassword: String;
};
