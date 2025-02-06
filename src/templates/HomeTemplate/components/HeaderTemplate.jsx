import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import useViewport from "./../../../hooks/UseViewport";
import { pathDefault } from "../../../common/path";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon";
import { AlignCenterOutlined, DownOutlined } from "@ant-design/icons";
import InputSearch from "../../../components/Input/InputSearch";
import { useDebounce } from "use-debounce";
import {
  ButtonGhost,
  ButtonHover,
} from "../../../components/Button/ButtonCustom";
import DropdownHeader from "../../../components/Dropdown/DropdownHeader";
import { timKiemKhoaHoc } from "../../../services/Module/User/timKiem.service";
import DropdownSearch from "../../../pages/DropdownSearch/DropdownSearch";
import { Button, Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteUser } from "./../../../redeux/User.Slice";
import { NotificationContext } from "../../../App";

const HeaderTemplate = () => {
  const [open, setOpen] = useState(false);
  const { width } = useViewport();
  console.log(width);
  const [keyword, setKeyword] = useState("");
  // debounce
  const [debouncekeyWord] = useDebounce(keyword, 500);
  // state quản lý dữ liệu thanh search
  const [litSearch, setListSearch] = useState([]);
  const [errApi, setErrApi] = useState("");
  // gọi APi theo Debounce
  useEffect(() => {
    if (debouncekeyWord) {
      timKiemKhoaHoc
        .layKhoaHocTheoTen(debouncekeyWord)
        .then((res) => {
          console.log(res);
          setListSearch(res.data);
        })
        .catch((err) => {
          console.log(err);
          setErrApi(err.response.data);
          setListSearch([]);
        });
    } else {
      setListSearch([]);
      setErrApi("");
    }
  }, [debouncekeyWord]);

  const itemListSearch = useMemo(() => {
    if (!litSearch || litSearch.length === 0) {
      return [
        {
          key: "no-data",
          label: <p className="text-red-500">{errApi}</p>,
        },
      ];
    }
    return litSearch.slice(0, 4).map((item, index) => {
      return {
        key: item.maKhoaHoc,
        label: (
          <Link
            to={"/all-course/:id"}
            className="flex gap-3 place-items-center"
          >
            <img
              className="h-20 w-20"
              src={item.hinhAnh}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://thumbs.dreamstime.com/b/error-page-not-found-lost-sorry-network-erro-concept-vector-illustration-design-193782462.jpg";
              }}
              alt=""
            />
            <div className=" flex-grow space-y-2">
              <h3 className=" text-sm lg:text-base font-medium">
                {item.tenKhoaHoc}
              </h3>
              <p className="text-right  text-xs lg:text-sm">
                Lượt xem {item.luotXem}
              </p>
            </div>
          </Link>
        ),
      };
    });
  }, [litSearch]);

  const navigate = useNavigate();
  // handle change keyword
  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value);
    setShowDropdown(true);
  };
  // user
  const handleNotification = useContext(NotificationContext);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    handleNotification("success", "Đăng xuất thành công");
    dispatch(handleDeleteUser());
  };
  //khai báo
  const items = [
    {
      label: (
        <Button>
          <Link to={"/update"}>Cập nhật và tra cứu khóa học</Link>
        </Button>
      ),
      key: "0",
    },
    {
      label: <Button onClick={handleLogout}> Đăng Xuất</Button>,
      key: "1",
    },
    {
      type: "divider",
    },
  ];

  // handle click inputSearch
  const [showDropdown, setShowDropdown] = useState(false);
  const handleClick = (searchId) => {
    navigate(`/all-course/${searchId}`);
    setShowDropdown(false);
  };

  const handleClickInputSearch = () => {
    setOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && keyword.trim()) {
      navigate(`/search-results?keyword=${encodeURIComponent(keyword)}`);
    }
  };
  return (
    <header className="py-4 px-4 border-b-gray-200 bg-gray-800  ">
      <div className="container ">
        <div className="header_content flex justify-evenly items-center  ">
          <div className="flex items-center  space-x-3 ">
            {/* logo và danh mục khóa học */}
            <Link
              to={pathDefault.homePage}
              className="flex space-x-2 items-center"
            >
              <Icon />
              <p className=" lg:block hidden lg:text-xl text-xs  lg:font-medium font-normal text-white  ">
                CYBERSOFT
              </p>
            </Link>

            <DropdownHeader />
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-2 items-center gap-6">
            <div className="w-full hidden col-span-1 lg:col-span-2 lg:block">
              <Dropdown
                menu={{
                  items: itemListSearch,
                  onMouseLeave: () => {
                    setOpen(false);
                  },
                }}
                open={open}
                trigger={["click"]}
              >
                <InputSearch
                  onKeyDown={handleKeyDown}
                  handleClick={handleClickInputSearch}
                  value={keyword}
                  handleChange={handleChangeKeyword}
                  placeholder={"Tìm khóa học"}
                />
              </Dropdown>
              <div />
            </div>
            <div className="lg:col-span-1 col-span-2 grid grid-cols-1 lg:grid-cols-2 ">
              {user ? (
                <div className="text-white ">
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space className=" text-xs lg:text-sm ">
                        xin chào,
                        <span className="font-semibold"> {user.hoTen}</span>
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              ) : (
                <>
                  <ButtonGhost
                    content={"Đăng nhập"}
                    onClick={() => {
                      navigate(pathDefault.signIn);
                    }}
                  />

                  <ButtonHover
                    content={"Đăng kí"}
                    onClick={() => {
                      navigate(pathDefault.logIn);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTemplate;
