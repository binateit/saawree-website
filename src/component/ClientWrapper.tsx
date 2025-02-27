"use client"; // This makes the component a Client Component

import { useEffect, useState } from "react";
import Header from "@/component/Header";
import { fetchMenuCategories } from "@/core/helpers/serverActions";
import { useSession } from "next-auth/react";
import { MenuCategoriesResponse } from "@/core/models/homeModel";

const ClientWrapper = ({ children, menuCategories: initialMenuCategories }: { 
    children: React.ReactNode;
    menuCategories: MenuCategoriesResponse;
  }) => {
  const { data: session, status: authStatus } = useSession();
  const [menuCategories, setMenuCategories] = useState<MenuCategoriesResponse | null>(initialMenuCategories); // Set proper type instead of any

  useEffect(() => {
    async function loadMenu() {
      const categories = await fetchMenuCategories();
      setMenuCategories(categories);
    }

    loadMenu(); // Initial load

    if (authStatus === "authenticated") {
      loadMenu(); // Refetch after login
    }
  }, [authStatus]);

  return (
    <>
      <Header menuCategories={menuCategories} />
      {children}
    </>
  );
};

export default ClientWrapper;
