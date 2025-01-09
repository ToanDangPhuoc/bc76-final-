import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../App";
import { authService } from "../../services/Module/User/auth.service";
import { Input } from "antd";

const ThongTinCaNhan = () => {
  const [info, setInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleNotification = useContext(NotificationContext);
  const data = JSON.parse(localStorage.getItem("userInfo"));
  console.log(data);
  const token = data.accessToken;
  console.log(token);
  const layThongTinNguoiDung = (token) => {
    authService
      .Update(token)
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

  return (
    <div className="container">
      <form action="">
        <h2 className="font-medium mb-3 text-center">Thông tin cá nhân</h2>
        <div className="grid grid-cols-6">
          <input
            type="text"
            value={info.taiKhoan}
            readOnly
            className="rounded-md border"
          />
        </div>
      </form>
    </div>
  );
};

export default ThongTinCaNhan;
