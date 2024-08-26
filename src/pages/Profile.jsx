import React, { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Avatar, Card, message } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import MyFooter from "../components/MyFooter";
import Header from "../components/Header";

const { Content } = Layout;

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = [
      "email",
      "password",
      "avatarUrl",
      "name",
      "mobile",
      "addressLine1",
      "addressLine2",
      "country",
      "cardName",
      "cardHolder",
      "cardNumber",
      "cardExp",
      "cardCvv",
    ];

    const initialValues = userData.reduce((acc, key) => {
      acc[key] = localStorage.getItem(key) || "";
      return acc;
    }, {});

    form.setFieldsValue(initialValues);
  }, [form]);

  const onFinish = (values) => {
    setLoading(true);
    // Simulating an API call
    setTimeout(() => {
      Object.entries(values).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
      setLoading(false);
      message.success("Profile updated successfully!");
    }, 1500);
  };

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="container mx-auto px-4 py-8">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <Avatar
              src={"src/assets/images/user.png"} // Sample avatar if no URL
              alt={"Avatar"}
              className="w-24 h-auto"
            />
          </div>

          <Card
            title="Personal Information"
            className="mb-8"
            extra={<UserOutlined />}
          >
            <Form.Item name="avatarUrl" label="Avatar URL" className="hidden">
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="mobile" label="Mobile Number">
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
          </Card>

          <Card title="Address" className="mb-8" extra={<HomeOutlined />}>
            <Form.Item name="addressLine1" label="Address Line 1">
              <Input />
            </Form.Item>
            <Form.Item name="addressLine2" label="Address Line 2">
              <Input />
            </Form.Item>
            <Form.Item name="country" label="Country">
              <Input />
            </Form.Item>
          </Card>

          <Card
            title="Payment Information"
            className="mb-8"
            extra={<CreditCardOutlined />}
          >
            <Form.Item name="cardName" label="Card Name">
              <Input />
            </Form.Item>
            <Form.Item name="cardHolder" label="Card Holder">
              <Input />
            </Form.Item>
            <Form.Item name="cardNumber" label="Card Number">
              <Input />
            </Form.Item>
            <div className="flex space-x-4">
              <Form.Item
                name="cardExp"
                label="Expiration Date"
                className="flex-1"
              >
                <Input />
              </Form.Item>
              <Form.Item name="cardCvv" label="CVV" className="flex-1">
                <Input />
              </Form.Item>
            </div>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button onClick={() => form.resetFields()}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Profile
            </Button>
          </div>
        </Form>
      </Content>
      <MyFooter />
    </Layout>
  );
};

export default Profile;
