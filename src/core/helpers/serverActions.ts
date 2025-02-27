import { getMenuCategories } from "@/core/requests/homeRequests";

/**
 * Fetches menu categories from the API on the server-side.
 * This function can be used in `getServerSideProps` or API routes.
 */
export async function fetchMenuCategories() {
  try {
    const data = await getMenuCategories();
    return data;
  } catch (error) {
    console.error("Error fetching menu categories:", error);
    return null;
  }
}
