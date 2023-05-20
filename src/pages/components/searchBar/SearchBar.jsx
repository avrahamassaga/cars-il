import React, { useState, useRef, useEffect } from "react";
import getData from "../../../apis/findCar";

export default function SearchBar(props) {
  const {setCarInfo, setIsValue} = props;
  const [carId, setcarId] = useState(null);
  
  const searchRef = useRef(null)

  const handleSearchInput =()=>{
    if(searchRef.current.value === ''){
      return
    }
    setCarInfo({})
    setIsValue(true)
    setcarId(searchRef.current.value)
    searchRef.current.value = ''
  }

  useEffect(() => {
    getData(carId, setIsValue).then(value =>setCarInfo(value))
  }, [carId]);
  
  return (
    <div className="flex flex-row-reverse gap-2 h-12 w-full px-4 max-w-[750px]">
      <input
        className="flex-1 border-2 border-black bg-[#ffdd00] text-black font-bold rounded-xl text-center h-full focus:border-black focus:ring-0"
        name="search"
        placeholder="מספר רכב"
        ref={searchRef}
      />
      <button className="flex-none border-none text-white bg-[#2274bb] w-16 h-full rounded-xl"
        onClick={handleSearchInput}
      >
        חפש
      </button>
    </div>
  );
}
