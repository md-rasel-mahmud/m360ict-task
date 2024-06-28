import { Outlet } from "react-router-dom";
import SidebarLayout from "./components/sidebar/Sidebar";

const App = () => {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
};

export default App;
