import React, { useState, useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import Header from "../components/Header";
import MyFooter from "../components/MyFooter";
import {
  Table,
  Tag,
  Space,
  Input,
  Button,
  Modal,
  Form,
  message,
  Layout,
  Menu,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import {
  BarChart2,
  Home,
  NotebookTabs,
  ShoppingCart,
  TicketCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const { Column } = Table;

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/reservations/all"
      );
      const reservationsData = response.data.data.map((reservation) => ({
        key: reservation.id,
        id: reservation.id,
        customerName: reservation.customerName,
        date: reservation.date,
        headCount: reservation.headCount,
        buffet: reservation.buffet,
        branch: reservation.branch,
        status: reservation.status,
      }));
      setReservations(reservationsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setLoading(false);
    }
  };

  const confirmReservation = async (reservationId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/reservations/update/${reservationId}`
      );
      if (response.data.statusCode === 200) {
        message.success("Reservation confirmed successfully!");
        fetchReservations(); // Refresh the list after confirming the reservation
      } else {
        message.error("Failed to confirm reservation.");
      }
    } catch (error) {
      console.error("Error confirming reservation:", error);
      message.error("An error occurred while confirming the reservation.");
    }
  };

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
            <div className="min-h-screen flex flex-col bg-gray-100">
              <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Reservations</h1>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Table
                    dataSource={reservations}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    className="w-full"
                  >
                    <Column title="Reservation ID" dataIndex="id" key="id" />
                    <Column
                      title="Customer Name"
                      dataIndex="customerName"
                      key="customerName"
                    />
                    <Column
                      title="Date"
                      dataIndex="date"
                      key="date"
                      sorter={(a, b) => new Date(a.date) - new Date(b.date)}
                    />
                    <Column
                      title="Head Count"
                      dataIndex="headCount"
                      key="headCount"
                    />
                    <Column title="Buffet" dataIndex="buffet" key="buffet" />
                    <Column title="Branch" dataIndex="branch" key="branch" />
                    <Column
                      title="Status"
                      dataIndex="status"
                      key="status"
                      render={(status) => (
                        <Tag color={status === "ACTIVE" ? "green" : "orange"}>
                          {status.toUpperCase()}
                        </Tag>
                      )}
                      filters={[
                        { text: "Active", value: "ACTIVE" },
                        { text: "Inactive", value: "INACTIVE" },
                      ]}
                      onFilter={(value, record) =>
                        record.status.indexOf(value) === 0
                      }
                    />
                    <Column
                      title="Action"
                      key="action"
                      render={(text, record) => (
                        <Space size="middle">
                          <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            onClick={() => confirmReservation(record.id)}
                            disabled={record.status === "ACTIVE"} // Disable if already confirmed
                          >
                            Confirm Reservation
                          </Button>
                        </Space>
                      )}
                    />
                  </Table>
                </div>
              </main>
            </div>
          </Content>
        </div>
      </div>
    </Layout>
  );
};

export default Reservations;
