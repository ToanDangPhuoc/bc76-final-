import { useFormik } from "formik";
import React, { useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NotificationContext } from "../../App";
import { authService } from "../../services/Module/User/auth.service";
import AnimationData from "../../assets/animation/AnimationSignIn.json";
import Lottie from "react-lottie";
import Icon from "../../components/Icon";
import { pathDefault } from "../../common/path";
import { LeftOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ButtonDangKy } from "../../components/Button/ButtonCustom";
import * as Yup from "yup";
import { handleUpdateUser } from "../../redeux/User.Slice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNotification = useContext(NotificationContext);
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      onSubmit: (data) => {
        authService
          .signIn(data)
          .then((res) => {
            console.log(res);
            // tạo biến lưu user Data
            const userData = {
              taiKhoan: res.data.taiKhoan,
              email: res.data.email,
              hoTen: res.data.hoTen,
              maLoaiNguoiDung: res.data.maLoaiNguoiDung,
              maNhom: res.data.maNhom,
              soDT: res.data.soDT,
            };
            console.log("User data to update Redux:", userData);
            handleNotification("success", "Đăng nhập thành công", 3000);
            // Lưu thông tin vào localStorage
            localStorage.setItem("userInfo", JSON.stringify(res.data));

            // dispath để lưu vào state
            dispatch(handleUpdateUser(userData));
            setTimeout(() => {
              navigate(pathDefault.homePage);
            }, 1500);
          })
          .catch((err) => {
            console.error("Chi tiết lỗi:", err);
            handleNotification("error", err.response.data, 3000);
          });
      },
      // validationSchema
      validationSchema: Yup.object({
        taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
        matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });

  const defaultOptions = useMemo(
    () => ({
      loop: true,
      autoPlay: true,
      animationData: AnimationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }),
    []
  );
  return (
    <div className="container grid lg:grid-cols-3 ">
      <div className="SignIn_animation col-span-2 mt-10 ">
        <Lottie options={defaultOptions} height={"80%"} width={"80%"} />
      </div>
      <div>
        <div className=" w-full flex justify-start ml-20 mb-1 items-center mt-10">
          <Icon />
          <div className="text-sm">
            <Link to={pathDefault.homePage}>
              <LeftOutlined /> Về trang chủ
            </Link>
          </div>
        </div>
        {/* form */}
        <div className=" grid mt-10 lg:mt-0 justify-center">
          <h1 className="text-3xl font-bold">Trang đăng nhập</h1>
          <p className="font-semibold text-sm text-gray-500">
            Nhập Tài khoản để bắt đầu truy cập
          </p>
          <form className="space-y-3 mt-10" onSubmit={handleSubmit}>
            <div className="w-2/3 space-y-3">
              <div>
                <label htmlFor="">Tài Khoản</label>
                <Input
                  name="taiKhoan"
                  value={values.taiKhoan}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Vui lòng nhập email"
                />
                {errors.taiKhoan && touched.taiKhoan && (
                  <p className="text-red-500 text-sm mt-1">{errors.taiKhoan}</p>
                )}
              </div>
              <div>
                <label htmlFor="">Mật Khẩu</label>
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
              <ButtonDangKy type="submit" content={"Đăng nhập"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
