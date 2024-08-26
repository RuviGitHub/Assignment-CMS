import React from "react";
import { Layout, Menu } from "antd";
import { Home, NotebookTabs, ShoppingCart, BarChart2, TicketCheck } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";

const { Sider, Content } = Layout;

const Dashboard = () => {
  const menuItems = [
   
    {
      key: "2",
      icon: <NotebookTabs size={20} />,
      label: <Link to="/inquiry">Inquiry</Link>,
    },
    {
      key: "3",
      icon: <ShoppingCart size={20} />,
      label: <Link to="/order-history">Orders</Link>,
    },
    {
      key: "4",
      icon: <BarChart2 size={20} />,
      label: <Link to="/item">Item</Link>,
    },
    {
      key: "5",
      icon: <TicketCheck size={20} />,
      label: <Link to="/reservations">Reservation</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen bg-white border-none">
      <div className="bg-white flex flex-col w-full h-full">
        <Header />
        <div className="flex flex-row">
          <Sider className="bg-white h-full border-none">
            <Menu mode="inline" defaultSelectedKeys={["1"]} items={menuItems} />
          </Sider>
          <Content className="m-6">
            <Outlet />
          </Content>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
