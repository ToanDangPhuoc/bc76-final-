import React, { useEffect, useState } from "react";
import { timKiemKhoaHoc } from "../../services/Module/User/timKiem.service";
import { ButtonDangKy } from "../../components/Button/ButtonCustom";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "antd";

const DanhSachKhoaHoc = ({ categoryId }) => {
  const [course, setCouser] = useState([]);
  const { id } = useParams();

  const [curentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  useEffect(() => {
    timKiemKhoaHoc
      .layDanhSachKhoaHocTheoDanhMuc(id)
      .then((res) => {
        setCouser(res.data);
        console.log(res.data);
      })
      .catch(
        (err) => {
          console.log(err);
        },
        [categoryId]
      );
  }, [id]);
  // lấy khóa học cho trang hiện tại
  const currentCourse = course.slice(
    (curentPage - 1) * pageSize,
    curentPage * pageSize
  );

  //hàm xử lý khi đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // navigate chuyển hướng
  const navigate = useNavigate();
  const hanldeClick = (courseId) => {
    navigate(`/all-course/${courseId}`);
  };

  return (
    <div className="container">
      <div>
        <h3 className="font-medium text-2xl mt-3 text-center lg:text-start">
          {id === "BackEnd"
            ? "Khóa học BackEnd"
            : id === "Design"
            ? "Danh sách khóa học Design"
            : id === "DiDong"
            ? "Danh sách khóa học Di Động"
            : id === "FrontEnd"
            ? "Danh sách khóa học FrontEnd"
            : id === "FullStack"
            ? "Danh sách khóa học FullStack"
            : "Danh sách khóa học Tư duy"}
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {currentCourse.map((item, index) => (
          <div
            onClick={() => {
              hanldeClick(item.maKhoaHoc);
            }}
            key={index}
            className="border p-4 space-y-3 cursor-pointer"
          >
            <img
              className="w-full h-auto lg:h-[250px]"
              src={item.hinhAnh}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://thumbs.dreamstime.com/b/error-page-not-found-lost-sorry-network-erro-concept-vector-illustration-design-193782462.jpg";
              }}
              alt=""
            />
            <h3 className="font-medium text-center text-white bg-gray-800 rounded-sm">
              {item.tenKhoaHoc}
            </h3>
            <div className="flex justify-around items-center">
              <p> Lượt xem {course.luotXem}</p>
              <ButtonDangKy content={"Đăng ký"} />
            </div>
          </div>
        ))}
      </div>
      <Pagination
        current={curentPage}
        pageSize={pageSize}
        total={course.length}
        onChange={handlePageChange}
      ></Pagination>
    </div>
  );
};

export default DanhSachKhoaHoc;
