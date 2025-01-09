import React, { useEffect, useState } from "react";
import AnimationData from "../../../assets/animation/AnimationHomeTemplace.json";
import Lottie from "react-lottie";
import { ButtonDangKy } from "../../../components/Button/ButtonCustom";
import { timKiemKhoaHoc } from "../../../services/Module/User/timKiem.service";
import { Link, useNavigate } from "react-router-dom";
import ToanBoDanhSachKhoaHoc from "../../../pages/DanhSachKhoaHoc/ToanBoDanhSachKhoaHoc";
import Item from "antd/es/list/Item";

const BodyTemplace = () => {
  const defaultOption = {
    loop: true,
    autoPlay: true,
    animationData: JSON.parse(JSON.stringify(AnimationData)),
    renderSetting: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    timKiemKhoaHoc
      .layDanhSachKhoaHoc()
      .then((res) => {
        setData(res.data.slice(8, 16));
        console.log(data.maKhoaHoc);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/all-course/${id}`);
  };
  return (
    <div className="container mb-20">
      <div className="lg:h-screen grid grid-cols-1 lg:grid-cols-2 justify-between items-center  ">
        <div>
          <Lottie options={defaultOption} height={"50%"} width={"100%"} />
        </div>
        <div className=" space-y-3 text-center mt-7 lg:mt-0">
          <h2 className="text-3xl font-bold">Khởi đầu sự nghiệp của bạn </h2>
          <div className=" space-y-3">
            <h4 className="text-2xl font-medium">
              Trở thành lập trình viên chuyên nghiệp tại Cybersoft
            </h4>
            <div className="space-x-3">
              <Link to={"/all-course"}>
                <ButtonDangKy content={"Xem Khóa Học"} />
              </Link>
              <a
                target="_blank"
                href="https://www.facebook.com/messages/t/231169113737422"
              >
                <ButtonDangKy content={"Tư vấn trực tiếp"} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold mt-5 mb-5 text-center">
          Danh sách khóa học
        </h3>
        <div className=" mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 cursor-pointer ">
            {data.map((item, index) => (
              <div
                key={index}
                className="border p-4 space-y-3"
                onClick={() => {
                  handleClick(item.maKhoaHoc);
                }}
              >
                <img
                  src={
                    item.hinhAnh
                      ? item.hinhAnh
                      : "https://thumbs.dreamstime.com/b/error-page-not-found-lost-sorry-network-erro-concept-vector-illustration-design-193782462.jpg"
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://thumbs.dreamstime.com/b/error-page-not-found-lost-sorry-network-erro-concept-vector-illustration-design-193782462.jpg";
                  }}
                  alt={item.tenKhoaHoc}
                  className="w-full h-auto lg:h-[250px]"
                />

                <h3 className="bg-gray-800 text-white text-xl  mt-2 text-center font-medium rounded-sm">
                  {item.tenKhoaHoc}
                </h3>
                <div className="flex justify-around items-center">
                  <p>Lượt xem {item.luotXem}</p>

                  <ButtonDangKy content={"Đăng ký"} />
                </div>
              </div>
            ))}
          </div>
          <div className="font-medium text-right mr-5 mt-3">
            <Link to={"/all-course"}>Xem thêm </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyTemplace;
