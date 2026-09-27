export type Address = {
  id: number;
  userUUID: string;
  title: string;
  city: string;
  district: string;
  neighborhood: string;
  postalCode: string;
  addressLine: string;
};

export type SaveAddress = {
  title: string;
  city: string;
  district: string;
  neighborhood: string;
  postalCode: string;
  addressLine: string;
};

export type User = {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  telephone: string;
  birthday: string;
  active: boolean;
  mailActivation: boolean;
  createdAt: string;
  updatedAt: string;
};