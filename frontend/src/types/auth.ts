export type RegisterForm = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  telephone: string;
  city: string;
  address: string;
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
    city: string;
    address: string;
    birthday: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
