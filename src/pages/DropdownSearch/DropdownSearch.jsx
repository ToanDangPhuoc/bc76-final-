import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DropdownSearch = ({ results = [], showResults, handleClick }) => {
  if (!results.length || !showResults)
    return (
      <div className="container">
        <ul className="dropdown-search absolute bg-white shadow-lg rounded-md mt-2 h-96   overflow-y-auto z-50">
          {results.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleClick(item.maKhoaHoc)}
            >
              <div className="flex gap-4 justify-center w-72 h-full">
                <div>
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
                </div>
                <div className=" flex-grow space-y-2">
                  <h3 className=" text-sm lg:text-base font-medium">
                    {item.tenKhoaHoc}
                  </h3>
                  <p className="text-right  text-xs lg:text-sm">
                    Lượt xem {item.luotXem}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default DropdownSearch;
