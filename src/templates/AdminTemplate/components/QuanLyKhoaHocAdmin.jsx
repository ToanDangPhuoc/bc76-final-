import React from "react";

const QuanLyKhoaHocAdmin = ({
  layDanhSachNguoiDung,
  setModalOpen,
  editUser,
}) => {
  // lấy thông tin user
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const token = userData.accessToken;
  console.log(token);
  return <div>QuanLyKhoaHoc</div>;
};

export default QuanLyKhoaHocAdmin;
