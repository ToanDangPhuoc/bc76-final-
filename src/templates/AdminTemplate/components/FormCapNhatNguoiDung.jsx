import React, { useContext } from "react";
import { NotificationContext } from "../../../App";
import { useFormik } from "formik";
import * as Yup from "yup";
import { data } from "autoprefixer";
import { managerUser } from "../../../services/Module/Manager/user.service";
const FormCapNhatNguoiDung = ({ editUser }) => {
  // thonng tin token user
  const token = JSON.parse(localStorage.getItem("userInfo"));
  // thong bao hanh dong
  const handleNotification = useContext(NotificationContext);
  //formik '
  const { handleBlur, handleChange, errors, touched, handleSubmit, values } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        soDT: "",
        maLoaiNguoiDung: "",
        maNhom: "GP01",
        email: "",
      },
      onSubmit: (data) => {
        managerUser
          .themnNguoiDung(data, token)
          .then((res) => {
            console.log(res);
            handleNotification("success", "Thêm người dùng thành công", 3000);
          })
          .catch((err) => {
            console.log(err);
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

  return <div>FormCapNhatNguoiDung</div>;
};

export default FormCapNhatNguoiDung;
