import { LocalStorageUserDataInterface } from "./types/app.types";

export const getDataFromLocalStorage = ():
  | LocalStorageUserDataInterface
  | undefined => {
  const dataFromLocalStorage = localStorage.getItem("userData");
  let dataFromLocalStorageAsObject: LocalStorageUserDataInterface | undefined =
    undefined;

  if (dataFromLocalStorage) {
    dataFromLocalStorageAsObject = JSON.parse(dataFromLocalStorage);
  }

  if (
    !dataFromLocalStorageAsObject ||
    !dataFromLocalStorageAsObject.isLoggedIn ||
    !dataFromLocalStorageAsObject.expirationDate ||
    !dataFromLocalStorageAsObject.token ||
    !dataFromLocalStorageAsObject.userId
  ) {
    return undefined;
  }

  return dataFromLocalStorageAsObject;
};
