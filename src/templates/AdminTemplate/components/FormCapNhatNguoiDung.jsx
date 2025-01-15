import React, { useContext } from "react";
import { NotificationContext } from "../../../App";
import { useFormik } from "formik";
import * as Yup from "yup";
import { managerUser } from "../../../services/Module/Manager/user.service";
import { Input, Select } from "antd";
import { ButtonDangKy } from "../../../components/Button/ButtonCustom";
const FormCapNhatNguoiDung = ({
  editUser,
  layDanhSachNguoiDung,
  setIsModalOpen,
}) => {
  // thonng tin token user
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const token = userData.accessToken;
  console.log(token);
  // thong bao hanh dong
  const handleNotification = useContext(NotificationContext);
  //formik '
  const {
    handleBlur,
    handleChange,
    errors,
    touched,
    handleSubmit,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      taiKhoan: `${editUser.taiKhoan}`,
      matKhau: "",
      hoTen: "",
      soDT: "",
      maLoaiNguoiDung: "HV",
      maNhom: "GP01",
      email: "",
    },
    onSubmit: (data) => {
      if (!token) {
        handleNotification(
          "error",
          "Không tìm thấy token. Vui lòng đăng nhập lại.",
          3000
        );
        return;
      }
      managerUser
        .capNhatNguoiDung(token, data)
        .then((res) => {
          console.log(res);
          handleNotification("success", "Cập nhật người dùng thành công", 3000);
          setIsModalOpen(false);
          layDanhSachNguoiDung();
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", err.response.data);
        });
    },
    // validation
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Vui lòng không để trống"),
      matKhau: Yup.string().required("Vui lòng không để trống"),
      hoTen: Yup.string().required("Vui lòng không để trống"),
      email: Yup.string()
        .email("Vui lòng nhập đúng định dạng email")
        .required("Vui lòng không để trống"),
      soDT: Yup.string().required("Vui lòng không để trống"),
    }),
  });

  return (
    <div className="container space-y-3">
      <h1 className="font-medium text-xl lg:text-3xl text-center">
        Cập nhật người dùng
      </h1>
      <form className="space-y-3 mt-10 " onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Tài khoản</label>
          <Input
            readOnly
            value={values.taiKhoan}
            name="taiKhoan"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Vui lòng nhập tài khoản"
          />
          {errors.taiKhoan && touched.taiKhoan && (
            <p className="text-red-500 text-sm mt-1">{errors.taiKhoan}</p>
          )}
        </div>
        <div>
          <label htmlFor="">Họ tên</label>
          <Input
            value={values.hoTen}
            name="hoTen"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Vui lòng nhập họ tên"
          />
          {errors.hoTen && touched.hoTen && (
            <p className="text-red-500 text-sm mt-1">{errors.hoTen}</p>
          )}
        </div>
        <div>
          <label htmlFor="">Số điện thoại</label>
          <Input
            value={values.soDT}
            type="number"
            name="soDT"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Vui lòng nhập số điện thoại"
          />
          {errors.soDT && touched.soDT && (
            <p className="text-red-500 text-sm mt-1">{errors.soDT}</p>
          )}
        </div>
        <div>
          <label htmlFor="">Email</label>
          <Input
            value={values.email}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Vui lòng nhập Email"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="">Password</label>
          <Input
            value={values.matKhau}
            type="password"
            name="matKhau"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Vui lòng nhập mật khẩu"
          />
          {errors.matKhau && touched.matKhau && (
            <p className="text-red-500 text-sm mt-1">{errors.matKhau}</p>
          )}
        </div>
        <div className="space-y-3 ">
          <label htmlFor="">Chức vụ</label>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-3">
            <Select
              value={values.maLoaiNguoiDung}
              defaultValue={"HV"}
              onBlur={handleBlur}
              onChange={(value) => {
                setFieldValue("maLoaiNguoiDung", value);
              }}
              placeholder="Vui lòng chọn chức vụ "
              options={[
                {
                  value: "HV",
                  label: "Học viên",
                },
                {
                  value: "GV",
                  label: "Giảng viên",
                },
              ]}
            />
            <ButtonDangKy type="submit" content={"Xác nhận"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCapNhatNguoiDung;
