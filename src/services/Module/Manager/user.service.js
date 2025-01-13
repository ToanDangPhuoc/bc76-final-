import { http } from "../../config";

export const managerUser = {
  layDanhSachNguoiDung: () => {
    return http.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`);
  },
};
