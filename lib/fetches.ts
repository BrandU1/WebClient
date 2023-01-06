import client from "@lib/api";

// export async function getAddresses() {
//   const response = await client.get("accounts/addresses");
//   return response.data;
// }

export async function getAddress() {
  const response = await client.get("accounts/addresses");
  return response.data;
}
