import React, { useEffect } from "react";
import { authService } from "../../services/Module/User/auth.service";

const QuanLyKhoaHoc = () => {
  const data = JSON.parse(localStorage.getItem("userInfo"));
  const token = data.accessToken;
  console.log(token);
  useEffect((token) => {});

  return (
    <div className="container">
      <form action="">
        <h2 className="font-medium text-xl lg:text-2xl text-center">
          Khóa học đã tham gia
        </h2>

        <div className="grid grid-cols-1 justify-center items-center">
          <div></div>
        </div>
      </form>
    </div>
  );
};

export default QuanLyKhoaHoc;
