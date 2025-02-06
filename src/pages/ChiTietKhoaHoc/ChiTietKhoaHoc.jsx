import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { timKiemKhoaHoc } from "../../services/Module/User/timKiem.service";
import { ButtonDangKy } from "../../components/Button/ButtonCustom";
import { NotificationContext } from "../../App";

const ChiTietKhoaHoc = () => {
  //thông báo hành động

  const { id } = useParams();
  console.log("ID từ useParams:", id);
  const [data, setData] = useState([]);
  useEffect(() => {
    timKiemKhoaHoc
      .ChitietKhoaHoc(id)
      .then((ress) => {
        console.log(ress);
        setData(ress.data);
        const dataKhoaHoc = data.maKhoaHoc;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  // user Data
  const userDataClone = JSON.parse(localStorage.getItem("userInfo"));
  const token = userDataClone.accessToken;
  const userData = {
    taiKhoan: userDataClone.taiKhoan,
    maKhoaHoc: data.maKhoaHoc,
  };
  console.log("Thông tin userData:", userData);
  console.log("thông tin token", token);

  // handle thông báo
  const handleNotification = useContext(NotificationContext);
  return (
    <div className="container">
      {/* title */}
      <div className="text-center mt-3 mb3 ">
        <span className="font-semibold text-xl">
          {data.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "Không có danh mục"}
        </span>
      </div>
      <div>
        {data ? (
          <div className="flex  flex-col h-full">
            <img
              className="h-96 object-contain mt-3"
              src={
                data.hinhAnh
                  ? data.hinhAnh
                  : "https://thumbs.dreamstime.com/b/error-page-not-found-lost-sorry-network-erro-concept-vector-illustration-design-193782462.jpg"
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://thumbs.dreamstime.com/b/error-page-not-found-lost-sorry-network-erro-concept-vector-illustration-design-193782462.jpg";
              }}
              alt=""
            />
            <div className="flex  justify-between items-center">
              <p className="font-medium ml-10">Mô Tả khóa học</p>
              <p className=" font-medium mr-10">Lượt Xem :{data.luotXem}</p>
            </div>
            <p className="text-left mt-3">{data.moTa}</p>
            <p className="text-right mr-10">Ngày Tạo : {data.ngayTao}</p>
            <div className="text-center space-x-3">
              <ButtonDangKy
                onClick={() => {
                  timKiemKhoaHoc
                    .DangKyKhoaHoc(userData, token)
                    .then((res) => {
                      console.log(res);
                      handleNotification(
                        "success",
                        "bạn đã đăng kí khóa học thành công",
                        3000
                      );
                    })
                    .catch((err) => {
                      console.log(err);
                      handleNotification("error", err.response.data);
                    });
                }}
                content={"Đăng ký khóa học"}
              />
              <a
                target="_blank"
                href="https://www.facebook.com/messages/t/231169113737422"
              >
                <ButtonDangKy content={"Tư vấn  khóa học"} />
              </a>
            </div>
          </div>
        ) : (
          <p>Không có thông tin khóa học</p>
        )}
      </div>
    </div>
  );
};

export default ChiTietKhoaHoc;
