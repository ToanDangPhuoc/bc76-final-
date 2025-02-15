import { Navigate, useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import "./index.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense, CreateContext, createContext } from "react";
import SignIn from "./pages/SignIn/SignIn";
import HomePage from "./pages/HomePage";
import DanhSachKhoaHoc from "./pages/DanhSachKhoaHoc/DanhSachKhoaHoc";
import ToanBoDanhSachKhoaHoc from "./pages/DanhSachKhoaHoc/ToanBoDanhSachKhoaHoc";
import ChiTietKhoaHoc from "./pages/ChiTietKhoaHoc/ChiTietKhoaHoc";
import CapnhatThongTin from "./pages/CapNhatThongTin/CapnhatThongTin";
import ThongTinCaNhan from "./pages/CapNhatThongTin/ThongTinCaNhan";
import QuanLyKhoaHoc from "./pages/CapNhatThongTin/QuanLyKhoaHoc";
import QuanLyNguoiDung from "./templates/AdminTemplate/components/QuanLyNguoiDung";
import QuanLyKhoaHocAdmin from "./templates/AdminTemplate/components/QuanLyKhoaHocAdmin";
import LogIn from "./pages/LogIn/LogIn";
export const NotificationContext = createContext();

const Homtemplate = React.lazy(() =>
  import("./templates/HomeTemplate/HomeTemplate")
);
const AdminTemplate = React.lazy(() =>
  import("./templates/AdminTemplate/AdminTemplate")
);
const data = JSON.parse(localStorage.getItem("userInfo"));
const user = data?.maLoaiNguoiDung;
const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: (
      <Suspense fallback={<div>home</div>}>
        <Homtemplate />
      </Suspense>
    ),
    children: [
      {
        path: pathDefault.homePage,
        element: <HomePage />,
      },
      {
        path: pathDefault.course,
        element: <DanhSachKhoaHoc />,
      },
      {
        path: pathDefault.allCourse,
        element: <ToanBoDanhSachKhoaHoc />,
      },
      {
        path: pathDefault.allCourseDetail,
        element: <ChiTietKhoaHoc />,
      },
      {
        path: pathDefault.update,
        element: <CapnhatThongTin />,
        children: [
          {
            index: true,
            element: <Navigate to={pathDefault.Info} replace />,
          },
          {
            path: "Info",
            element: <ThongTinCaNhan />,
          },
          {
            path: "manager-course",
            element: <QuanLyKhoaHoc />,
          },
        ],
      },
    ],
  },
  {
    index: true,
    path: pathDefault.signIn,
    element: <SignIn />,
  },
  {
    index: true,
    path: pathDefault.logIn,
    element: <LogIn />,
  },

  {
    path: pathDefault.admin,
    element: (
      <Suspense fallback={<div>admin</div>}>
        {user === "GV" ? (
          <AdminTemplate />
        ) : (
          <Navigate to={pathDefault.homePage} />
        )}
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={pathDefault.quanlyNguoiDung} replace />,
      },
      {
        path: "manager-course",
        element: <QuanLyKhoaHocAdmin />,
      },
      {
        path: "manager-user",
        element: <QuanLyNguoiDung />,
      },
    ],
  },
];
function App() {
  const routes = useRoutes(arrRoutes);
  const handleNotification = (type, content, timeClose = 3000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  return (
    <>
      <NotificationContext.Provider value={handleNotification}>
        {routes}
        <ToastContainer />
      </NotificationContext.Provider>
    </>
  );
}

export default App;
