import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const items = [
  {
    key: 1,
    label: (
      <NavLink
        className={({ isActive }) =>
          `px-3 rounded-md inline-block ${isActive ? "item-active" : ""}`
        }
        to={pathDefault.Info}
      >
        <UserOutlined />
        <span className=" lg:inline-block hidden ">Thông tin cá nhân</span>
      </NavLink>
    ),
  },
  {
    key: 2,
    label: (
      <NavLink
        className={({ isActive }) =>
          `px-3 rounded-md inline-block ${isActive ? "item-active" : ""}`
        }
        to={pathDefault.ManagerCourse}
      >
        <VideoCameraOutlined />
        <span className=" lg:inline-block hidden ">Khóa học của tôi</span>
      </NavLink>
    ),
  },
];
const CapnhatThongTin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </Header>
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default CapnhatThongTin;
