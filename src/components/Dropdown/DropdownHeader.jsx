import React, { useEffect, useState } from "react";
import { AlignCenterOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { timKiemKhoaHoc } from "../../services/Module/User/timKiem.service";
import { Link } from "react-router-dom";

const DropdownHeader = ({ onCategorySelcet }) => {
  const [items, setItems] = useState([]);

  // xử lý khi chọn khóa học
  useEffect(() => {
    timKiemKhoaHoc
      .layDanhMucKhoaHoc()
      .then((res) => {
        console.log(res.data);
        const newItems = res.data.map((item, index) => ({
          key: index + 1,
          label: <Link to={`course/${item.maDanhMuc}`}>{item.tenDanhMuc}</Link>,
        }));
        setItems(newItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space className="text-white hover:text-yellow-500">
          <AlignCenterOutlined className="text-white" />
          Danh sách khóa học
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownHeader;
