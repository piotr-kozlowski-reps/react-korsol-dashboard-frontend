import { ConfigFetched } from "../types/app.types";

export const dummyConfigData: ConfigFetched = {
  userId: "1234",
  fetched: true,
  sidebar: {
    companyLogo:
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1656488020/korsol-dashboard/korsol_logo_sx43pn.png",
    companyName: "Korsol",
    linksGroups: [
      {
        title: "Słowniki",
        links: [
          {
            name: "firmy",
            reactIcon: "<BiBuildingHouse />",
            route: "companies",
          },
          {
            name: "szklarnie",
            reactIcon: "<GiGreenhouse />",
            route: "greenhouses",
          },
          {
            name: "produkty",
            reactIcon: "<RiPlantLine />",
            route: "products",
          },
          {
            name: "odmiany",
            reactIcon: "<TbPlant2 />",
            route: "varieties",
          },
          {
            name: "dostęp do pól",
            reactIcon: "<SiOpenaccess />",
            route: "field-access",
          },
        ],
      },
      {
        title: "Monitoring",
        links: [
          {
            name: "Calendar",
            reactIcon: "<TbCalendar />",
            route: "calendar",
          },
          {
            name: "Kanban",
            reactIcon: "<TbLayoutKanban />",
            route: "kanban",
          },
        ],
      },
    ],
  },
  userProfile: {
    name: "Jan",
    surname: "Rolnik",
    email: "jan.rolnik@przyklad.pl",
    img: "https://res.cloudinary.com/dn8l30dkf/image/upload/v1656488020/korsol-dashboard/avatar_nla788.jpg",
    lang: "pl",
  },
  themeColors: [
    { name: "blue-theme", color: "#1A97F5" },
    { name: "green-theme", color: "#03C9D7" },
    { name: "purple-theme", color: "#7352FF" },
    { name: "red-theme", color: "#FF5C8E" },
    { name: "indigo-theme", color: "#1E4DB7" },
    { color: "#FB9678", name: "orange-theme" },
  ],
  notifications: [
    {
      notificationId: "cioa8sd7fvsndfvosdf7",
      message: "Zbierz truskawki",
      description: "Opis pierwszej wiadomości pierwszej.",
      creationTime: "2022-07-11T17:18:15.780Z",
      alreadyRead: false,
    },
    {
      notificationId: "cioa8sd7fvsndsdcfvosdf7",
      message: "Znajdź zaskrońce",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quisquam nesciunt delectus numquam quidem inventore autem, ...",
      creationTime: "2022-07-09T17:18:15.780Z",
      alreadyRead: false,
    },
    {
      notificationId: "cioa8asdcsd7fvsndfvosdf7",
      message: "Wiadomość 3",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio quos velit ipsam iure error voluptates...",
      creationTime: "2022-06-11T17:18:15.780Z",
      alreadyRead: true,
    },
  ],
};
