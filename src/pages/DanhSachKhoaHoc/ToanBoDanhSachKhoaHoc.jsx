import React, { useEffect, useState } from "react";
import { timKiemKhoaHoc } from "../../services/Module/User/timKiem.service";
import { ButtonDangKy } from "../../components/Button/ButtonCustom";
import { Pagination } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const ToanBoDanhSachKhoaHoc = () => {
  const [course, setCouser] = useState([]);
  const [pageSize] = useState(12);
  const [curentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    timKiemKhoaHoc
      .layDanhSachKhoaHoc()
      .then((res) => {
        setCouser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const currentCourse = course.slice(
    (curentPage - 1) * pageSize,
    curentPage * pageSize
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleClik = (courseId) => {
    navigate(`/all-course/${courseId}`);
  };
  return (
    <div className="container">
      <div>
        <h3 className="font-semibold text-2xl mt-4">
          Các khóa học của Crybersoft
        </h3>
      </div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-5 mb-5 ">
        {currentCourse.map((item, index) => (
          <div
            className="space-y-4 cursor-pointer"
            key={index}
            onClick={() => {
              handleClik(item.maKhoaHoc);
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
              className="w-full h-auto lg:h-[250px]"
              alt=""
            />
            <h3 className="font-medium text-center text-white bg-gray-800 rounded-sm">
              {item.tenKhoaHoc}
            </h3>
            <div className="flex justify-around items-center">
              <p> lượt xem {item.luotXem}</p>
              <ButtonDangKy content={"Đăng Ký"} />
            </div>
          </div>
        ))}
      </div>
      <Pagination
        current={curentPage}
        pageSize={pageSize}
        total={course.length}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default ToanBoDanhSachKhoaHoc;
