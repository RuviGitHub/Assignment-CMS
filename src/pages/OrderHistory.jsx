import React, { useState, useEffect } from "react";
import { SearchOutlined, EyeOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import Header from "../components/Header";
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
  Tooltip,
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

const OrderHistory = () => {
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/orders/all"
      );
      const ordersData = response.data.data.map((order) => ({
        key: order.id,
        id: order.id,
        date: order.orderDate,
        total: order.totalPrice,
        items: order.orderDetails.map(
          (detail) => `Product ${detail.productId}`
        ),
        status: order.status,
        paymentMethod: "Credit Card",
      }));
      setOrders(ordersData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const confirmOrder = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/orders/update/${orderId}`
      );
      if (response.data.statusCode === 200) {
        message.success("Order confirmed successfully!");
        fetchOrders(); // Refresh the list after confirming the order
      } else {
        message.error("Failed to confirm order.");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      message.error("An error occurred while confirming the order.");
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
                <h1 className="text-3xl font-bold mb-6">Order History</h1>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Table
                    dataSource={orders}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    className="w-full"
                  >
                    <Column
                      title="Order ID"
                      dataIndex="id"
                      key="id"
                      {...getColumnSearchProps("id")}
                    />
                    <Column
                      title="Date"
                      dataIndex="date"
                      key="date"
                      sorter={(a, b) => new Date(a.date) - new Date(b.date)}
                    />
                    <Column
                      title="Total"
                      dataIndex="total"
                      key="total"
                      render={(total) => `$${total.toFixed(2)}`}
                      sorter={(a, b) => a.total - b.total}
                    />
                    <Column
                      title="Items"
                      dataIndex="items"
                      key="items"
                      render={(items) => (
                        <Tooltip title={items.join(", ")}>
                          <span>{items.length} item(s)</span>
                        </Tooltip>
                      )}
                    />
                    <Column
                      title="Status"
                      dataIndex="status"
                      key="status"
                      render={(status) => (
                        <Tag
                          color={
                            status === "Delivered"
                              ? "green"
                              : status === "Processing"
                              ? "blue"
                              : "orange"
                          }
                        >
                          {status.toUpperCase()}
                        </Tag>
                      )}
                      filters={[
                        { text: "Delivered", value: "Delivered" },
                        { text: "Processing", value: "Processing" },
                        { text: "Pending", value: "Pending" },
                      ]}
                      onFilter={(value, record) =>
                        record.status.indexOf(value) === 0
                      }
                    />
                    <Column
                      title="Payment Method"
                      dataIndex="paymentMethod"
                      key="paymentMethod"
                    />
                    <Column
                      title="Action"
                      key="action"
                      render={(text, record) => (
                        <Space size="middle">
                          <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            onClick={() => confirmOrder(record.id)}
                            disabled={record.status === "Delivered"} // Disable if already delivered
                          >
                            Confirm Order
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

export default OrderHistory;
