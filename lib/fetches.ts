import client from "@lib/api";

export async function getAddress() {
  const response = await client.get("accounts/addresses");
  return response.data;
}
