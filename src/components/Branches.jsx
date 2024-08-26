import React, { useState } from "react";
import { Row, Col } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const branches = [
  {
    index: 1,
    name: "Kandy Branch",
    address: "123, New Kandy Road, Kandy",
  },
  {
    index: 2,
    name: "Colombo Branch",
    address: "123, New Galle Road, Colombo",
  },
  {
    index: 3,
    name: "Galle Branch",
    address: "123, New Galle Road, Galle",
  },
];

const Branches = () => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto">
        <Row gutter={[24, 24]} justify="center">
          {branches.map((branch) => (
            <Col
              xs={24}
              md={8}
              key={branch.index}
              onClick={() => setSelected(branch.index)}
            >
              <div
                className={`bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center relative cursor-pointer ${
                  branch.index === selected
                    ? "border-b-4 border-[#ea7c69]"
                    : ""
                }`}
              >
                <div className="bg-[#ea7c69] text-white rounded-full p-3 text-3xl mb-4">
                  <EnvironmentOutlined />
                </div>
                <h3 className="text-xl font-semibold mb-2">{branch.name}</h3>
                <p className="text-gray-500">{branch.address}</p>
                {branch.index !== branches.length && (
                  <div className="absolute inset-y-0 right-0 w-px bg-gray-300" />
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Branches;
