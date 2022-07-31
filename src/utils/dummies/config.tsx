import { ConfigFetched } from "../types/app.types";

export const config = {
  userId: "1234",
  fetched: true,
  sidebar: {
    companyLogo:
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1656488020/korsol-dashboard/korsol_logo_sx43pn.png",
    companyName: "Korsol",
    linksGroups: [
      {
        title: "Monitoring",
        links: [
          {
            name: "odmiany",
            reactIcon: "<TbPlant2 />",
            route: "plant_varieties",
            api_route: "api/plant-varietes/[userId]",
          },
          {
            name: "pola",
            reactIcon: "<BiRectangle />",
            route: "fields",
            api_route: "api/fields/[userId]",
          },
          {
            name: "właściciele gospodarstw",
            reactIcon: "<BsPeople />",
            route: "owners",
            api_route: "api/owners/[userId]",
          },
          {
            name: "sadzarki",
            reactIcon: "<TbTractor />",
            route: "planters",
            api_route: "api/planters/[userId]",
          },
        ],
      },
      {
        title: "Aplikacje",
        links: [
          {
            name: "kalendarz",
            reactIcon: "<TbCalendar />",
            route: "calendar",
            api_route: "api/calendar/[userId]",
          },
          {
            name: "kanban",
            reactIcon: "<TbLayoutKanban />",
            route: "kanban",
            api_route: "api/kanban/[userId]",
          },
        ],
      },
      {
        title: "Wykresy",
        links: [
          {
            name: "liniowy",
            reactIcon: "<AiOutlineStock />",
            route: "charts/line",
            api_route: "api/charts/line/[userId]",
          },
          {
            name: "obszarowy",
            reactIcon: "<AiOutlineAreaChart />",
            route: "charts/area",
            api_route: "api/charts/area/[userId]",
          },
          {
            name: "kołowy",
            reactIcon: "<FiPieChart />",
            route: "charts/pie",
            api_route: "api/charts/pie/[userId]",
          },
          {
            name: "słupkowy",
            reactIcon: "<AiOutlineBarChart />",
            route: "charts/stacked",
            api_route: "api/charts/stacked/[userId]",
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
    {
      name: "blue-theme",
      color: "#1A97F5",
    },
    {
      name: "green-theme",
      color: "#03C9D7",
    },
    {
      name: "purple-theme",
      color: "#7352FF",
    },
    {
      name: "red-theme",
      color: "#FF5C8E",
    },
    {
      name: "indigo-theme",
      color: "#1E4DB7",
    },
    {
      color: "#FB9678",
      name: "orange-theme",
    },
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
