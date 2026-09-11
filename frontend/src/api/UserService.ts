import api from "./axios";
import type { Address, saveAddress } from "../types/User";

export const saveAddress= async(formData:Address)=>{
    const response = await api.post("/address",formData);
    return response.data;
}

export const getAddresses = async():Promise<Address[]> =>{
    const response = await api.get("/address");
    return response.data;
}

export const deleteAddress=async(id:Number)=>{
    await api.delete(`/address?addressId=${id}`);
}

export const updateAddress = async (
  id: number,
  address: saveAddress
): Promise<Address> => {
  const response = await api.put(
    `/address?addressId=${id}`,
    address
  );

  return response.data;
};