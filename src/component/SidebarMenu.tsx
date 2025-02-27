import { Sidebar } from "primereact/sidebar";

interface SidebarMenuProps {
    visible: boolean;
    setVisible: (value: boolean) => void;
    menuCategories: any; // Adjust type based on API response
    authStatus: string;
    session: any; // Adjust to match your session type
  }
  
  const SidebarMenu: React.FC<SidebarMenuProps> = ({
    visible,
    setVisible,
    menuCategories,
    authStatus,
    session,
  }) => {
  return (
    <Sidebar visible={visible} position="left" onHide={() => setVisible(false)}>
      <ul>
        <li><a href="/">Home</a></li>
        {menuCategories?.rsc?.map((cat) => (
          <li key={cat.id}><a href={`/category/${cat.id}`}>{cat.n}</a></li>
        ))}
        {authStatus === "authenticated" && <li><a href={`/${session?.user?.userType}`}>Dashboard</a></li>}
      </ul>
    </Sidebar>
  );
};

export default SidebarMenu;
