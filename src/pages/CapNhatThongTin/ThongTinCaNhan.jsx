import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../App";
import { authService } from "../../services/Module/User/auth.service";
import { Button, Input, Modal } from "antd";
import FormCapNhatThongTin from "./FormCapNhatThongTin/FormCapNhatThongTin";

const ThongTinCaNhan = () => {
  const [info, setInfo] = useState([]);

  const handleNotification = useContext(NotificationContext);
  const data = JSON.parse(localStorage.getItem("userInfo"));
  console.log(data);
  const token = data.accessToken;
  console.log(token);
  const layThongTinNguoiDung = (token) => {
    authService
      .GetInfo(token)
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (token) {
      layThongTinNguoiDung(token);
    }
  }, [token]);
  useEffect(() => {
    if (info) {
      console.log(info, "lấy dữ liệu thành công");
    }
  }, [info]);
  const maLoaiNguoiDung =
    info.maLoaiNguoiDung === "GV" ? "Giáo viên" : "Học viên";
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="container">
      <form action="">
        <h2 className="font-medium mb-3 text-center  text-xl lg:;text-3xl">
          Thông tin cá nhân
        </h2>
        <div className="grid  grid-cols-1 lg:grid-cols-3  space-y-3 ">
          <div className="flex  lg:justify-items-start justify-items-center ">
            <p>
              <span className="font-medium">Tài khoản: </span> {info.taiKhoan}
            </p>
          </div>
          <div className="flex  lg:justify-items-start justify-items-center ">
            <p>
              <span className="font-medium">Email:</span> {info.email}
            </p>
          </div>
          <div className="flex   lg:justify-items-start justify-items-center ">
            <p>
              <span className="font-medium">Họ tên:</span> {info.hoTen}
            </p>
          </div>
          <div className="flex   lg:justify-items-start justify-items-center">
            <p>
              <span className="font-medium">Số điện thoại:</span> {info.soDT}
            </p>
          </div>
          <div className="flex   lg:justify-items-start justify-items-center">
            <p>
              <span className="font-medium">Nhóm người dùng: </span>
              {maLoaiNguoiDung}
            </p>
          </div>
          <div className="flex  mt-4  lg:justify-start justify-center">
            <>
              <Button type="primary" onClick={showModal}>
                Cập nhật
              </Button>
              <Modal
                footer={null}
                title="Cập nhật thông tin"
                open={isModalOpen}
                onCancel={handleCancel}
              >
                <FormCapNhatThongTin onCancle={handleCancel} />
              </Modal>
            </>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ThongTinCaNhan;
