import React, { useEffect, useState } from "react";
import { authService } from "../../services/Module/User/auth.service";
import { timKiemKhoaHoc } from "../../services/Module/User/timKiem.service";
import { Button } from "antd";

const QuanLyKhoaHoc = () => {
  const data = JSON.parse(localStorage.getItem("userInfo"));
  const taiKhoan = data.taiKhoan;
  console.log(taiKhoan);
  const token = data.accessToken;
  const [khoaHocDaThamGia, setKhoaHocDaThamGia] = useState([]);
  const xuLyDuLieu = (data) => {
    return data.map((khoaHoc) => ({
      id: khoaHoc.maKhoaHoc,
      name: khoaHoc.tenKhoaHoc,
      description: khoaHoc.moTa,
      views: khoaHoc.luotXem,
    }));
  };
  console.log(token);
  useEffect(() => {
    timKiemKhoaHoc
      .QuanLyKhoaHoc(taiKhoan, token)
      .then((res) => {
        console.log(res);
        const duLieuDaXuLy = xuLyDuLieu(res.chiTietKhoaHocGhiDanh);
        setKhoaHocDaThamGia(duLieuDaXuLy);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [taiKhoan, token]);
  console.log(khoaHocDaThamGia);

  return (
    <div className="container">
      <form action="">
        <h2 className="font-medium text-xl lg:text-2xl text-center">
          Khóa học đã tham gia
        </h2>

        <div className="grid grid-cols-1 gap-4 justify-center items-center">
          {khoaHocDaThamGia.length > 0 ? (
            khoaHocDaThamGia.map((khoaHoc) => (
              <div key={khoaHoc.id} className="">
                <div className="flex">
                  <img src={khoaHoc.hinhAnh} alt="" />
                  <div>
                    <h4>{khoaHoc.name}</h4>
                    <p>{khoaHoc.description}</p>
                  </div>
                </div>
                <Button> Hủy </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Bạn chưa tham gia khóa học nào.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuanLyKhoaHoc;
