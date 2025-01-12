import { Button, Input } from "antd";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { NotificationContext } from "../../../App";
import { authService } from "../../../services/Module/User/auth.service";
import { use } from "react";
const FormCapNhatThongTin = ({ onCancle }) => {
  const handleNotification = useContext(NotificationContext);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user.accessToken;
  const { handleBlur, handleChange, touched, handleSubmit, values, errors } =
    useFormik({
      initialValues: {
        taiKhoan: user.taiKhoan,
        matKhau: "",
        hoTen: user.hoTen,
        maLoaiNguoiDung: "HV",
        soDT: "",
        maNhom: "GP01",
        email: "",
      },
      onSubmit: (data) => {
        const payload = {
          taiKhoan: user.taiKhoan,
          matKhau: data.matKhau,
          hoTen: data.hoTen,
          soDT: data.soDT,
          maLoaiNguoiDung: "HV",
          maNhom: "GP01",
          email: data.email,
        };
        authService
          .Update(token, payload)
          .then((res) => {
            console.log(res);
            handleNotification(
              "success",
              "Cập nhật thông tin thành công",
              3000
            );
            onCancle();
          })
          .catch((err) => {
            console.log(err.response.data);
            handleNotification("error", err.response.data, 3000);
          });
      },
      //validation
      validationSchema: Yup.object({
        // taiKhoan: Yup.string().required("Vui lòng không để trống"),
        matKhau: Yup.string().required("Vui lòng không để trống"),
        // hoTen: Yup.string().required("Vui lòng không để trống"),
        email: Yup.string()
          .email("Vui lòng nhập đúng định dạng email")
          .required("Vui lòng không để trống"),
        soDT: Yup.string().required("Vui lòng không để trống"),
      }),
    });

  return (
    <div>
      <form
        className="space-y-3 mt-10 flex flex-1 justify-center"
        onSubmit={handleSubmit}
      >
        <div className="w-2/3 space-y-3  ">
          <div>
            <label htmlFor="">Tài khoản</label>
            <Input
              readOnly
              placeholder="Vui lòng nhập họ tên"
              name="taiKhoan"
              value={user.taiKhoan}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {/* {errors.taiKhoan && touched.taiKhoan && (
              <p className="text-red-500 text-sm mt-1"> {errors.taiKhoan}</p>
            )} */}
          </div>
          <div>
            <label htmlFor="">Họ tên</label>
            <Input
              readOnly
              placeholder="Vui lòng nhập họ tên"
              name="hoTen"
              value={user.hoTen}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {/* {errors.hoTen && touched.hoTen && (
              <p className="text-red-500 text-sm mt-1"> {errors.hoTen}</p>
            )} */}
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

          <div className="flex  justify-center">
            <Button
              htmlType="submit"
              variant="solid"
              className="bg-blue-600 text-white items-center "
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCapNhatThongTin;
