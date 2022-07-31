import { queryClient } from "../App";
import { Notification } from "../utils/types/app.types";

export const useGetConfigDataWithoutFetching = () => {
  const queryData: any = queryClient.getQueryData(["config"]);

  let userProfileImage: string | undefined;
  let userProfileName: string | undefined;
  let userProfileSurname: string | undefined;
  let userProfileEmail: string | undefined;
  let notifications: Notification[] | undefined;
  if (queryData && queryData.data) {
    console.log(queryData.data);
    userProfileImage = queryData.data.userProfile.img;
    userProfileName = queryData.data.userProfile.name;
    userProfileSurname = queryData.data.userProfile.surname;
    userProfileEmail = queryData.data.userProfile.email;
    notifications = queryData.data.notifications;
  }

  return {
    userProfileImage,
    userProfileName,
    userProfileSurname,
    userProfileEmail,
    notifications,
  };
};
