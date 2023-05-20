import React, { useState, useMemo, useEffect } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import logo from "../../assets/img/logo.png";
import loader from "../../assets/gif/load.gif";
import search from "../../assets/img/search.png";
import DisplayInfo from "../components/showData/DisplayInfo";
export default function HomePage() {
  const [isValue, setIsValue] = useState(false);
  const [carInfo, setCarInfo] = useState({});
  const [call, setcall] = useState(false)

  const dataView = useMemo(() => {
    if (carInfo?.result?.records[0]) { 
      return <DisplayInfo data={carInfo} isValue={isValue}/>;
    } else if (!isValue) {
      return <img src={search} alt="search info" className="w-[500px]"/>;
    } else {
      return <img src={loader} alt='loader' />;
    }
  }, [carInfo, isValue, setIsValue]);
  const reloadPage = () => {
    window.location.reload()
  }


  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex items-center justify-center bg-gradient-to-t from-[#112a28] to-[#205551]">
        <img onClick={reloadPage} src={logo} alt="logo" className="h-[190px] sm:h-[250px]"/>
      </div>
      <div className="flex items-center justify-center">
        <SearchBar setCarInfo={setCarInfo} setIsValue={setIsValue} />
      </div>
      <div className="flex justify-center items-center">
        {dataView}
      </div>
    </div>
  );
}
