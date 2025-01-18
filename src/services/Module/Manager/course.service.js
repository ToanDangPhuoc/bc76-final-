import { http } from "../../config";

export const managerCourse = {
  layDanhSachKhoaHoc: () => {
    return http.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`);
  },
};
