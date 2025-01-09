import { http } from "../../config";

export const authService = {
  signIn: (data) => {
    return http.post("/QuanLyNguoiDung/DangNhap", data);
  },
  logIn: (data) => {
    return http.post("/QuanLyNguoiDung/DangKy", data);
  },
  Update: (token, data) => {
    return http.post("/QuanLyNguoiDung/ThongTinTaiKhoan", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      GetInfo: (token) => {
        return http.post("/QuanLyNguoiDung/ThongTinTaiKhoan", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      },
    });
  },
};
