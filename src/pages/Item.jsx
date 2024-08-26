import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Table, Tag, Space, Input, Button, Modal, Form, message, Layout, Menu, Select } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { BarChart2, Home, NotebookTabs, ShoppingCart, TicketCheck } from "lucide-react";
import { Link } from "react-router-dom";

const { Option } = Select;
const { Column } = Table;

const Item = () => {
  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/item/all-items"
      );
      setItems(response.data.data);
    } catch (error) {
      message.error("Failed to fetch items");
    }
    setLoading(false);
  };

  const handleAddItem = async (values) => {
    try {
      // Prepare the payload with the values from the form
      const payload = {
        itemName: values.itemName,
        itemDescription: values.itemDescription,
        status: "ACTIVE", // Default status as "ACTIVE"
        itemPrice: parseFloat(values.itemPrice), // Convert price to a float
        size: values.size,
        category: values.category,
      };

      // Make the API request to create a new item
      const response = await axios.post(
        "http://localhost:8080/api/v1/item/create-item",
        payload
      );

      // Check if the response status code indicates success
      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 201
      ) {
        // If successful, close the modal
        setIsModalVisible(false);

        // Reset the form fields
        form.resetFields();

        // Refresh the list of items
        fetchItems();

        // Display a success message
        message.success("Item created successfully!");
      } else {
        // If the API returned an error, display the error message
        console.error("Failed to create item:", response.data.message);
        message.error(response.data.message);
      }
    } catch (error) {
      // If there was an error in the API request, display a failure message
      message.error("Failed to create item");
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
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold">Item Management</h1>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                  >
                    Add Item
                  </Button>
                </div>
                <Table dataSource={items} loading={loading} rowKey="id">
                  <Column
                    title="Item Name"
                    dataIndex="itemName"
                    key="itemName"
                  />
                  <Column
                    title="Description"
                    dataIndex="itemDescription"
                    key="itemDescription"
                  />
                  <Column
                    title="Price"
                    dataIndex="itemPrice"
                    key="itemPrice"
                    render={(price) => (price ? `$${price.toFixed(2)}` : "N/A")}
                  />
                  <Column title="Size" dataIndex="size" key="size" />
                  <Column
                    title="Category"
                    dataIndex="category"
                    key="category"
                  />
                  <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    render={(status) => (
                      <span
                        className={`text-${
                          status === "ACTIVE" ? "green" : "red"
                        }-500`}
                      >
                        {status}
                      </span>
                    )}
                  />
                </Table>
              </main>

              {/* Add Item Modal */}
              <Modal
                title="Add New Item"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
              >
                <Form form={form} layout="vertical" onFinish={handleAddItem}>
                  <Form.Item
                    name="itemName"
                    label="Item Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the item name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="itemDescription"
                    label="Item Description"
                    rules={[
                      {
                        required: true,
                        message: "Please input the item description!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="itemPrice"
                    label="Item Price"
                    rules={[
                      {
                        required: true,
                        message: "Please input the item price!",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    name="size"
                    label="Size"
                    rules={[
                      {
                        required: true,
                        message: "Please select the item size!",
                      },
                    ]}
                  >
                    <Select placeholder="Select size">
                      <Option value="SMALL">Small</Option>
                      <Option value="MEDIUM">Medium</Option>
                      <Option value="LARGE">Large</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                      {
                        required: true,
                        message: "Please select the item category!",
                      },
                    ]}
                  >
                    <Select placeholder="Select category">
                      <Option value="PIZZA">Pizza</Option>
                      <Option value="FRIED_RICE">Fried Rice</Option>
                      <Option value="KOTTU">Kottu</Option>
                      <Option value="BURGER">Burger</Option>
                      <Option value="NOODLES">Noodles</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </Content>
        </div>
      </div>
    </Layout>
  );
};

export default Item;
