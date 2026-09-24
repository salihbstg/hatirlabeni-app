import api from "./ApiClient";
import type { Address, SaveAddress } from "../types/User";

// ─── Address Management ──────────────────────────────────

export const getAddresses = async (): Promise<Address[]> => {
  const response = await api.get<Address[]>("/address");

  return response.data;
};

export const saveAddress = async (
  formData: SaveAddress,
): Promise<Address> => {
  const response = await api.post<Address>("/address", formData);

  return response.data;
};

export const updateAddress = async (
  id: number,
  address: SaveAddress,
): Promise<Address> => {
  const response = await api.put<Address>(
    `/address?addressId=${id}`,
    address,
  );

  return response.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
  await api.delete(`/address?addressId=${id}`);
};