import { Outlet } from "react-router-dom";
import SidebarLayout from "./components/sidebar/Sidebar";

const App = () => {
  return (
    <div>
      <SidebarLayout>
        <Outlet />
      </SidebarLayout>
    </div>
  );
};

export default App;
