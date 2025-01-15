import { http } from "../../config";

export const managerUser = {
  layDanhSachNguoiDung: () => {
    return http.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`);
  },
  xoaNguoiDung: (taiKhoan, token) => {
    return http.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  capNhatNguoiDung: (token, data) => {
    return http.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  themnNguoiDung: (token, data) => {
    return http.post("QuanLyNguoiDung/ThemNguoiDung", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
