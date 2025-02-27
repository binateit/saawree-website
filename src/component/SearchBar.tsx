import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getReadyStockProducts } from "@/core/requests/productsRequests";
import { BsSearch } from "react-icons/bs";
import { MenuCategoriesResponse } from "@/core/models/homeModel";

interface SearchBarProps {
    menuCategories: MenuCategoriesResponse;
}

const SearchBar: React.FC<SearchBarProps> = ({ menuCategories }) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 300);

    const { data: searchResults } = useQuery({
        queryKey: ["search-product", debouncedQuery],
        queryFn: async () => {
            if (!debouncedQuery) return [];
            const result = await getReadyStockProducts({
                advancedFilter: { field: "name", operator: "contains", value: debouncedQuery },
            });
            return result?.data;
        }
    });

    return (
        <form className="search-form">
            <div className="search-box">
                <select className="search-category">
                    <option value="">All Categories</option>
                    {menuCategories?.rsc?.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.n}</option>
                    ))}
                </select>
                <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Products..." />
                <button type="submit"><BsSearch /></button>
            </div>

            {searchResults?.length > 0 && (
                <ul className="search-dropdown">
                    {searchResults.map((res) => (
                        <li key={res.productId}>{res.productName}</li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default SearchBar;
