import React from "react";
import InputCustom from "../../../components/Input/InputCustom";
import { ButtonDangKy } from "../../../components/Button/ButtonCustom";
import CybersoftVideo from "../../../assets/video/cybersoftVideo.mp4";
const FooterTemplate = () => {
  return (
    <div className="container">
      <div className=" container grid bg-gray-800 mt-5 pt-10 pb-10 ">
        <div className=" grid grid-cols-1 lg:grid-cols-3 space-y-2 justify-center mb-10">
          <form action="" className="text-center">
            <div className="ml-3 space-y-4 flex flex-col items-center">
              <h4 className=" mt-4 text-2xl font-semibold text-center  text-yellow-500">
                Đăng ký nhận ưu đãi
              </h4>
              <p className="text-white">
                CyberSoft sẽ gởi các khóa học trực tuyến & các chương trình
                CyberLive hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp
                dẫn đến các bạn.
              </p>
              <div className="w-2/3 text-center  space-y-2">
                <InputCustom
                  labelContent={"Đăng ký ngay"}
                  placeholder={"Vui lòng nhập email"}
                />
                <InputCustom
                  type={"number"}
                  placeholder={"Vui lòng nhập Số điện thoại"}
                />
                <div className="grid grid-cols-1 ">
                  <ButtonDangKy content={"Đăng ký"} />
                </div>
              </div>
            </div>
          </form>

          <div className="flex lg:col-span-2  justify-center items-center flex-col">
            <h4 className=" mt-4 text-2xl font-semibold text-center  text-yellow-500">
              Giới thiệu về Cybersoft
            </h4>
            <video
              muted
              controls
              autoPlay
              src={CybersoftVideo}
              className="rounded-md mt-4 w-2/3"
            ></video>
            <div className="mt-4 ">
              <a
                target="_blank"
                href="https://www.facebook.com/messages/t/231169113737422"
              >
                <ButtonDangKy content={"Tư vấn khóa học"} />
              </a>
            </div>
          </div>
        </div>
        <h3 className="text-white text-2xl font-medium mt-5 mb-5  pl-5">
          HỒ CHÍ MINH
        </h3>
        <div className="  space-y-4 grid-cols-1 lg:grid lg:grid-cols-4 text-white justify-center pl-5">
          <div className="  space-y-1 lg:space-y-3  ">
            <h5 className="font-semibold text-base lg:text-lg mt-3  lg:text-start">
              Trụ sở: 112 Cao Thắng, Quận 3
            </h5>
            <p className="text-sm lg:text-base">Hotline: 096.105.1014</p>
            <p className="text-sm lg:text-base">
              Địa chỉ: Tầng 5, toà nhà Suri, 112 Cao Thắng, Quận 3, TPHCM
            </p>
          </div>
          <div className=" space-y-1 lg:space-y-3  lg:pl-3 ">
            <h5 className="font-semibold text-base lg:text-lg mt-3  lg:text-start">
              124 Điện Biên Phủ, Quận 1
            </h5>

            <p className="text-sm lg:text-base">Hotline: 096.105.1014</p>
            <p className="text-sm lg:text-base">
              Địa chỉ: 124 Điện Biên Phủ, P. Đa Kao, Quận 1, TPHCM
            </p>
          </div>
          <div className=" space-y-1 lg:space-y-3 lg:pl-3 ">
            <h5 className="font-semibold text-base lg:text-lg mt-3  lg:text-start">
              P3-00.05 Chung cư Cityland Park Hills, Phường 10, Quận Gò Vấp
            </h5>
            <p className="text-sm lg:text-base">Hotline: 096.105.1014</p>
            <p className="text-sm lg:text-base">
              Địa chỉ: P3-00.05 Chung cư Cityland Park Hills, Phường 10, Quận Gò
              Vấp, TP.HCM
            </p>
          </div>
          <div className=" space-y-1 lg:space-y-3 lg:pl-3 ">
            <h5 className="font-semibold text-base lg:text-lg mt-3  lg:text-start">
              6C Đường số 8, Linh Tây, Thủ Đức (gần ĐH Cảnh Sát)
            </h5>
            <p className="text-sm lg:text-base">Hotline: 096.105.1014</p>
            <p className="text-sm lg:text-base">
              Địa chỉ: 6C Đường số 8, Linh Tây, Thủ Đức, TPHCM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTemplate;
