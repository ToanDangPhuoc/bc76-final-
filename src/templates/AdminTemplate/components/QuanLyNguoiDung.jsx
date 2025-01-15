import React, { useContext, useEffect, useState } from "react";
import { managerUser } from "../../../services/Module/Manager/user.service";
import { Button, Modal, Popconfirm, Table } from "antd";
import { NotificationContext } from "../../../App";
import FromThemNguoiDung from "./FromThemNguoiDung";
import FormCapNhatNguoiDung from "./FormCapNhatNguoiDung";
import InputSearch from "../../../components/Input/InputSearch";
import GhiDanhKhoaHoc from "./GhiDanhKhoaHoc";

const QuanLyNguoiDung = () => {
  // lấy thông tin người dug
  const dataUser = JSON.parse(localStorage.getItem("userInfo"));
  const token = dataUser.accessToken;
  // thong bao hanh đong
  const handleNotification = useContext(NotificationContext);
  // state Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editUser, setEditUser] = useState(null);
  // lay danh sach va hien thi nguoi dung
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const layDanhSachNguoiDung = () => {
    managerUser
      .layDanhSachNguoiDung()
      .then((res) => {
        setListNguoiDung(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // thong bao hanh dong
  const confirm = (e) => {
    console.log(e);
  };
  const cancel = (e) => {
    console.log(e);
  };
  // goi api va hien thi
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
      render: (text, record, index) => (
        <div className="space-x-2">
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setModalType("learn");
              setEditUser(record);
            }}
            className="bg-green-500 text-white"
          >
            Ghi danh
          </Button>
          <Popconfirm
            title="Xóa người dùng ?"
            description="Bạn có muốn xóa người dùng không ?"
            onConfirm={() => {
              managerUser
                .xoaNguoiDung(record.taiKhoan, token)
                .then((res) => {
                  console.log(res);
                  layDanhSachNguoiDung();
                  handleNotification("success", res.data);
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification("error", err.response.data);
                });
            }}
            onCancel={cancel}
            okText="Xóa"
            cancelText="Không xóa"
          >
            <Button className="bg-red-500  text-white border-red-500">
              Xóa
            </Button>
          </Popconfirm>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setModalType("edit");
              setEditUser(record);
            }}
            className="bg-yellow-500  text-white border-yellow-500"
          >
            Sửa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container space-y-3">
      <div className="flex justify-between">
        <h1 className="text-xl lg:text-3xl font-medium mb-3 ">
          Danh sách người dùng
        </h1>
        <div className="w-2/5">
          <InputSearch />
        </div>
      </div>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setModalType("add");
          setEditUser(null);
        }}
        variant="soild"
        size="large"
        className="bg-green-500 text-white"
      >
        Thêm người dùng
      </Button>
      <Modal
        footer={null}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setModalType("");
        }}
      >
        {modalType === "add" ? (
          <FromThemNguoiDung
            setIsModalOpen={setIsModalOpen}
            layDanhSachNguoiDung={layDanhSachNguoiDung}
          />
        ) : modalType === "edit" ? (
          <FormCapNhatNguoiDung
            layDanhSachNguoiDung={layDanhSachNguoiDung}
            editUser={editUser}
            setIsModalOpen={setIsModalOpen}
          />
        ) : modalType === "learn" ? (
          <GhiDanhKhoaHoc
            layDanhSachNguoiDung={layDanhSachNguoiDung}
            editUser={editUser}
          />
        ) : null}
      </Modal>
      <Table dataSource={listNguoiDung} columns={columns} />
    </div>
  );
};

export default QuanLyNguoiDung;
