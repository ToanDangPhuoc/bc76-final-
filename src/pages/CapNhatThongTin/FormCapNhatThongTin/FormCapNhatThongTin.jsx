import { Input } from "antd";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { NotificationContext } from "../../../App";
const FormCapNhatThongTin = () => {
  const handleNotification = useContext(NotificationContext);
  const { handleBlur, handleChange, touched, handleSubmit, values, errors } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        soDT: "",
        maNhom: "GP01",
        email: "",
      },
      onSubmit: (data) => {
        authService
          .logIn(data)
          .then((res) => {
            console.log(res);
            handleNotification(
              "success",
              "Cập nhật thông tin thành công",
              3000
            );
          })
          .catch((err) => {
            console.log(err.response.data);
            handleNotification("error", err.response.data, 3000);
          });
      },
      //validation
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
    <div>
      <form action="">
        <form className="space-y-3 mt-10" onSubmit={handleSubmit}>
          <div className="w-2/3 space-y-3">
            <div>
              <label htmlFor="">Tài khoản</label>
              <Input
                placeholder="Vui lòng nhập họ tên"
                name="taiKhoan"
                value={values.taiKhoan}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.taiKhoan && touched.taiKhoan && (
                <p className="text-red-500 text-sm mt-1"> {errors.taiKhoan}</p>
              )}
            </div>
            <div>
              <label htmlFor="">Họ tên</label>
              <Input
                placeholder="Vui lòng nhập họ tên"
                name="hoTen"
                value={values.hoTen}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.hoTen && touched.hoTen && (
                <p className="text-red-500 text-sm mt-1"> {errors.hoTen}</p>
              )}
            </div>
            <div>
              <label htmlFor="">Số điện thoại</label>
              <Input
                type="number"
                name="soDT"
                value={values.soDT}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập số điện thoại"
              />
              {errors.soDT && touched.soDT && (
                <p className="text-red-500 text-sm mt-1"> {errors.soDT}</p>
              )}
            </div>

            <div>
              <label htmlFor="">Email</label>
              <Input
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập email"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1"> {errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="">Password</label>
              <Input
                type="password"
                name="matKhau"
                value={values.matKhau}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập mật khẩu"
              />
              {errors.matKhau && touched.matKhau && (
                <p className="text-red-500 text-sm mt-1">{errors.matKhau}</p>
              )}
            </div>
          </div>
        </form>
      </form>
    </div>
  );
};

export default FormCapNhatThongTin;
