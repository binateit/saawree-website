import { MenuCategoriesResponse } from "@/core/models/homeModel";
import Link from "next/link";

interface NavigationMenuProps {
  menuCategories: MenuCategoriesResponse; // Replace 'any' with actual category type
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ menuCategories }) => {
  return (
    <div className="header-navbar">
      <div className="container">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            {/* {menuCategories?.map((cat) => (
              <li key={cat.id}><Link href={`/category/${cat.id}`}>{cat.n}</Link></li>
            ))} */}
            <li><Link href="/contact-us">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavigationMenu;
