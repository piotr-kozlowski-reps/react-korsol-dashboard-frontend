import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../contexts/theme-context";
import Button from "../components/Button";
import { useDashboardGetData } from "../hooks/useDashboardGetData";
import { GoPrimitiveDot } from "react-icons/go";
// import Sparkline from "../components/charts-components/Sparkline";
import SVGStringIntoComponentMaker from "../utils/SVGStringIntoComponentMaker";
// import Stacked from "../components/charts-components/Stacked";

const Dashboard = () => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();

  ////fetching data
  const { data, isFetching, isError, error } = useDashboardGetData();

  ////JSX
  return (
    <div className="mt-12">
      <div className="absolute w-full h-full bg-main-bg opacity-80 z-50 p-44 pt-20 dark:bg-main-dark-bg">
        <p className="font-bold text-3xl text-black dark:text-white">
          Przykładowe rzeczy, wstawię tu co sobie życzysz .....
        </p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-52 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div className="bg-white bg-opacity-80 p-4 rounded-2xl">
              <p className="font-bold text-gray-600">
                Przewidywany zwrot z jarzyn:
              </p>
              <p className="text-2xl">{`${data?.data.totalEarnings} PLN`}</p>
              <div className="mt-3">
                <Button
                  disabled={false}
                  type="submit"
                  color="white"
                  bgColor={currentColor}
                  text={t("common:finances")}
                  borderRadius="10px"
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {data?.data.userData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                <SVGStringIntoComponentMaker keyToMap={item.icon} />
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* //wykresy */}
      {/* <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Roczne wydatki</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Wydatki</span>
              </p>
              <p className="flex items-center gap-2 text-green-600">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Budżet</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className="border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">22 430.32 PLN</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budżet</p>
              </div>

              <div className="mt-5">
                <p>
                  <span className="text-3xl font-semibold">58 430.52 PLN</span>
                </p>
                <p className="text-gray-500 mt-1">Wydatki</p>
              </div>

              <div className="mt-5">
                {data?.data.sparklineAreaData && (
                  <Sparkline
                    currentColor={currentColor}
                    id="line-sparkline"
                    type="Line"
                    height="80px"
                    width="250px"
                    data={data.data.sparklineAreaData}
                    color={currentColor}
                  />
                )}
              </div>

              <div className="mt-10">
                <Button
                  disabled={false}
                  type="button"
                  color="white"
                  bgColor={currentColor}
                  text="Ściągnij raport"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div className="">
              <Stacked
                width="320px"
                height="360px"
                stackedData={data?.data.stackedData}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
