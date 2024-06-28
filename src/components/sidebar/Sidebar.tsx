import React, { ReactNode, useState } from "react";
import { Layout, Menu, MenuProps, theme } from "antd";
import Title from "antd/es/typography/Title";
import { SidebarMenuItems } from "./SidebarMenuItems";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const SidebarLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [responsiveBreakpoint, setResponsiveBreakpoint] = useState(false);

  // -> THEME CONFIG
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // -> GET NAVIGATE
  const navigate = useNavigate();

  // -> HANDLE MENU CLICK
  const handleMenuItemClick: MenuProps["onClick"] = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={
          responsiveBreakpoint // -> RESPONSIVE BREAKPOINT
            ? { padding: "2rem 0" }
            : {
                padding: "2rem 0",
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
              }
        }
        onBreakpoint={(broken) => {
          // -> SET RESPONSIVE BREAKPOINT
          setResponsiveBreakpoint(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          onClick={handleMenuItemClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={SidebarMenuItems}
        />
      </Sider>

      {/* MAKE MAKE MAIN CONTENT RESPONSIVE */}
      <Layout {...(!responsiveBreakpoint && { style: { marginLeft: 200 } })}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Title level={4} style={{ margin: "1rem" }}>
            M360ICT TASK
          </Title>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              minHeight: "95%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* MAIN CONTENT */}
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
