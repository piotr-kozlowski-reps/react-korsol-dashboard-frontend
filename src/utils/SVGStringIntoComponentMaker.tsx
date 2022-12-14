import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { TbPlant2 } from "react-icons/tb";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { BiBuildingHouse, BiRectangle } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { TbTractor } from "react-icons/tb";
import { TbCalendar } from "react-icons/tb";
import { TbLayoutKanban } from "react-icons/tb";
import { AiOutlineStock } from "react-icons/ai";
import { FiPieChart } from "react-icons/fi";
import { AiOutlineAreaChart } from "react-icons/ai";
import { AiOutlineBarChart } from "react-icons/ai";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { GiGreenhouse } from "react-icons/gi";
import { RiPlantLine } from "react-icons/ri";
import { SiOpenaccess } from "react-icons/si";

const SVGStringIntoComponentMaker = ({
  keyToMap,
}: {
  keyToMap: string;
}): JSX.Element => {
  switch (keyToMap) {
    case "<AiOutlineCalendar />":
      return <AiOutlineCalendar />;

    case "<TbPlant2 />":
      return <TbPlant2 />;

    case "<BiRectangle />":
      return <BiRectangle />;

    case "<BsPeople />":
      return <BsPeople />;

    case "<TbTractor />":
      return <TbTractor />;

    case "<TbCalendar />":
      return <TbCalendar />;

    case "<TbLayoutKanban />":
      return <TbLayoutKanban />;

    case "<AiOutlineStock />":
      return <AiOutlineStock />;

    case "<FiPieChart />":
      return <FiPieChart />;

    case "<AiOutlineAreaChart />":
      return <AiOutlineAreaChart />;

    case "<AiOutlineBarChart />":
      return <AiOutlineBarChart />;

    case "<MdOutlineSupervisorAccount />":
      return <MdOutlineSupervisorAccount />;

    case "<BsBoxSeam />":
      return <BsBoxSeam />;

    case "<FiBarChart />":
      return <FiBarChart />;

    case "<HiOutlineRefresh />":
      return <HiOutlineRefresh />;

    case "<BiBuildingHouse />":
      return <BiBuildingHouse />;

    case "<GiGreenhouse />":
      return <GiGreenhouse />;

    case "<RiPlantLine />":
      return <RiPlantLine />;

    case "<SiOpenaccess />":
      return <SiOpenaccess />;

    default:
      return <MdOutlineImageNotSupported />;
  }
};

export default SVGStringIntoComponentMaker;

// {
//   name: "dost??p do p??l",
//   reactIcon: "<SiOpenaccess />",
//   route: "field-access",
