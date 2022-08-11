import { AxisModel } from "@syncfusion/ej2-react-charts";

//formik
export interface LoginFormValues {
  email: string;
  password: string;
}

//authentication
export interface AuthResponse {
  authToken: string;
}

//localStorage
export interface LocalStorageUserDataInterface {
  isLoggedIn: boolean;
  expirationDate: string;
  token: string;
  userId: string;
}

////navBar
export interface NavbarMenuIsClicked {
  userProfile: boolean;
  notification: boolean;
}
export type WhichMenuItemClicked = "userProfile" | "notification";

////fetchedData
//Config
export interface Link {
  name: string;
  route: string;
  reactIcon: string;
  api_route: string;
}

export interface LinksGroups {
  title: string;
  links: Link[];
}

export interface Notification {
  notificationId: string;
  message: string;
  description: string;
  creationTime: string;
  alreadyRead: boolean;
}

export interface ConfigFetched {
  userId: string;
  fetched: boolean;
  sidebar: {
    companyLogo: string;
    companyName: string;
    linksGroups: LinksGroups[];
  };
  userProfile: {
    name: string;
    surname: string;
    img: string;
    lang: string;
    email: string;
  };
  themeColors: ThemeColor[];
  notifications: Notification[];
}

export interface ThemeColor {
  name: string;
  color: ColorsAvailable;
}

export type ColorsAvailable =
  | "#1A97F5"
  | "#03C9D7"
  | "#7352FF"
  | "#FF5C8E"
  | "#1E4DB7"
  | "#FB9678";

//dashboard
export interface DashboardFetched {
  userId: string;
  totalEarnings: number;
  userData: DashboardItem[];
  sparklineAreaData: any[];
  stackedData: DashboardFetchedStackedData;
}
export interface DashboardItem {
  icon: string;
  amount: string;
  percentage: string;
  title: string;
  iconColor: string;
  iconBg: string;
  pcColor: string;
}

export interface DashboardFetchedStackedData {
  stackedPrimaryXAxis: AxisModel | undefined;
  stackedPrimaryYAxis: AxisModel | undefined;
  stackedCustomSeries: any[];
}

//plant-varities
export type PlantVariety = {
  plantId: string;
  name: string;
  varietyCode: string;
};
//fields
export type Field = {
  fieldId: string;
  name: string;
  fieldNumber: number;
  area: string;
  details: string;
  planter: string;
  owner: string;
};
//owners
export type Owner = {
  ownerId: string;
  name: string;
};
//planters
export type Planter = {
  planterId: string;
  name: string;
};

//companies
export type Company = {
  id: string;
  name: string;
};
