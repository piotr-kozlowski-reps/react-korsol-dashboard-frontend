import { Ajax } from "@syncfusion/ej2-base";
import {
  DataResult,
  DataStateChangeEventArgs,
  Sorts,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { DataUtil, DataManager, Query } from "@syncfusion/ej2-data";
import { isNullOrUndefined } from "@syncfusion/ej2-base";

// /**
//  * OrderData Service.
//  */

export class OrderService {
  public ajax: Ajax = new Ajax({
    type: "GET",
    mode: true,
    onFailure: (e: Error) => {
      return false;
    },
  });
  private BASE_URL: string =
    "https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders";

  // public execute(state: DataStateChangeEventArgs): Promise<DataResult> {
  //   return this.getData(state);
  // }
  // private getData(state: DataStateChangeEventArgs): Promise<DataResult> {
  //     let pageQuery = "";
  //     let sortQuery: string = "";
  //     if (state.take === undefined) {
  //       pageQuery = "";
  //     } else {
  //       pageQuery = `$skip=${state.skip}&$top=${state.take}`;
  //     } // handled the page query
  //     let filterQuery = "";
  //     if ((state.sorted || []).length) {
  //       sortQuery =
  //         `&$orderby=` +
  //         (<any>state).sorted
  //           .map((obj: Sorts) => {
  //             return obj.direction === "descending"
  //               ? `${obj.name} desc`
  //               : obj.name;
  //           })
  //           .reverse()
  //           .join(",");
  //     }
  //     if (state.where) {
  //       filterQuery =
  //         `&$filter=` +
  //         state.where.map((obj) => {
  //           return obj.predicates
  //             .map((predicate) => {
  //               debugger;
  //               return predicate.operator === "equal"
  //                 ? `${predicate.field} eq ${predicate.value}`
  //                 : `${predicate.operator}(tolower(${predicate.field}),'${predicate.value}')`;
  //             })
  //             .reverse()
  //             .join(" and ");
  //         });
  //     }

  //     this.ajax.url = `${this.BASE_URL}?${pageQuery}${filterQuery}${sortQuery}&$inlinecount=allpages&$format=json`;
  //     return this.ajax.send().then((response: any) => {
  // let data: any = JSON.parse(response);
  //       return <DataResult>{
  //         result: data["d"]["results"],
  //         count: parseInt(data["d"]["__count"], 10),
  //       };
  //     });
  // }
}
