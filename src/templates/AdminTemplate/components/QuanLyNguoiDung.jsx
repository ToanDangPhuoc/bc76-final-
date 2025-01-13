import React, { useEffect, useState } from "react";
import { managerUser } from "../../../services/Module/Manager/user.service";
import { Button, Table } from "antd";

const QuanLyNguoiDung = () => {
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const layDanhSachNguoiDung = () => {
    managerUser
      .layDanhSachNguoiDung()
      .then((res) => {
        setListNguoiDung(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    layDanhSachNguoiDung();
  }, []);
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "1",
    },

    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "2",
    },
    {
      title: "Loại tài khoản",
      dataIndex: "maLoaiNguoiDung",
      key: "3",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "4",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "5",
    },
    {
      title: "Hành động",
      key: "6",
      render: (text) => (
        <div className="space-x-2">
          <Button className="bg-red-500  text-white border-red-500">Xóa</Button>
          <Button className="bg-yellow-500  text-white border-yellow-500">
            Sửa
          </Button>
        </div>
      ),
    },
  ];
  console.log(listNguoiDung);
  return (
    <div className="container space-y-3">
      <h1 className="text-xl lg:text-3xl font-medium mb-3 ">
        Danh sách người dùng
      </h1>
      <Button variant="soild" size="large" className="bg-green-500 text-white">
        Thêm người dùng
      </Button>
      <Table dataSource={listNguoiDung} columns={columns} />
    </div>
  );
};

export default QuanLyNguoiDung;
