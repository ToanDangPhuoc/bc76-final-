import { http } from "../../config";
export const timKiemKhoaHoc = {
  layKhoaHocTheoTen: (keyword) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${keyword}&MaNhom=GP01`
    );
  },
  layDanhMucKhoaHoc: () => {
    return http.get(`/QuanLyKhoaHoc/LayDanhMucKhoaHoc`);
  },
  layDanhSachKhoaHoc: () => {
    return http.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`);
  },
  layDanhSachKhoaHocTheoDanhMuc: (data) => {
    return http.get(
      `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${data}&MaNhom=GP01`
    );
  },
  ChitietKhoaHoc: (data) => {
    console.log("ID Khoa Hoc:", data);
    return http.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${data}`);
  },
};
