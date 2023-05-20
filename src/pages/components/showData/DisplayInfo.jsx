import React, { useState, useEffect, useMemo } from "react";
import { checkDate, calcAge, memuzaKilometerMumlaz } from "./utils";
import { cardata } from "../../../consts/cardataConst";

export default function DisplayInfo(props) {
  const { data } = props;
  const [car, setCar] = useState({});
  const [achrayut, setAchrayut] = useState("");

  useEffect(() => {
    setCar(data.result?.records[0]);
  }, [data]);

  useEffect(() => {
    setCar((prevCar) => {
      const updatedCar = { ...prevCar };

      if (achrayut !== updatedCar["ahrayut"]) {
        const gil = calcAge(updatedCar.shnat_yitzur);
        updatedCar["gil"] = gil;
        updatedCar["ahrayut"] =
          checkDate(updatedCar.moed_aliya_lakvish) || "אין אחריות";
        updatedCar["memuza_kilometer"] = memuzaKilometerMumlaz(
          updatedCar.baalut,
          gil
        );
      }
      return updatedCar;
    });
  }, [data]);

  const keyOrder = Object.keys(cardata);

  const setInfo = useMemo(
    () =>
      Object.entries(car)
        .filter(([key, value]) => cardata[key]) // Filter keys based on the presence of corresponding key in cardata object
        .sort(
          ([key1], [key2]) => keyOrder.indexOf(key1) - keyOrder.indexOf(key2)
        ) // Sort keys according to the order in keyOrder array
        .map(([key, value]) => {
          // Check if the value is a date string and convert it to the desired format
          if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
            value = new Date(value).toLocaleDateString("en-GB");
          }

          return (
            <div key={key} className="flex flex-col-reverse w-full">
              <div className="bg-[#2c6460] text-[#ffffff] text-[32px] font-bold drop-shadow-lg">
                <p>
                  {value !== undefined && value !== null
                    ? value.toString()
                    : "לא צויין"}
                </p>
              </div>
              <div className="bg-[#e0e0e0] text-[#172436] font-bold p-2 rounded-t-xl drop-shadow-lg w-full text-[22px]">
                <p>{cardata[key] || key}</p>
              </div>
            </div>
          );
        }),
    [car, cardata]
  );

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full sm:w-[780px]">
      <div className="flex flex-col items-end gap-5 w-full px-2">
        {setInfo}
        <div className="flex flex-col-reverse w-full">
        <a href="https://www.gov.il/apps/mot/carlistprice/" target="_blank">
          <div className="bg-[#1b7346] text-[#ffffff] text-[32px] font-bold drop-shadow-lg">
            <p>לחץ כאן לקבלת מחירון</p>
          </div>
          </a>
          <div className="bg-[#e0e0e0] text-[#172436] font-bold p-2 rounded-t-xl drop-shadow-lg w-full text-[22px]">
            <p>מחירון רכב</p>
          </div>
        </div>
      </div>
      <button
        onClick={handleScrollToTop}
        className="w-full h-12 bg-[#FFC000] font-bold text-2xl mt-8 border-t-2 border-[#163c39]"
      >
        חזור למעלה
      </button>
    </div>
  );
}
