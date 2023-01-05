import client from "@lib/api";

export async function getAddresses() {
  const response = await client.get("accounts/addresses");
  return response.data;
}
