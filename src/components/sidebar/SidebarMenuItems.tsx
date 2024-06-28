import { UserOutlined } from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

export const SidebarMenuItems: ItemType<MenuItemType>[] = [
  {
    key: "/",
    label: "Products",
    icon: <UserOutlined />,
  },
];
