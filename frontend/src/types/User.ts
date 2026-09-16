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
