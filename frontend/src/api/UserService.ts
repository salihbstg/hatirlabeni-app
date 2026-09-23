import api from "./ApiClient";
import type { Address, SaveAddress } from "../types/User";

export const saveAddress = async (formData:SaveAddress) => {
  const response = await api.post("/address", formData);
  return response.data;
}

export const getAddresses = async (): Promise<Address[]> => {
  const response = await api.get("/address");
  return response.data;
}

export const deleteAddress = async (id: Number) => {
  await api.delete(`/address?addressId=${id}`);
}

export const updateAddress = async (
  id: number,
  address: SaveAddress
): Promise<Address> => {
  const response = await api.put(
    `/address?addressId=${id}`,
    address
  );

  return response.data;
};