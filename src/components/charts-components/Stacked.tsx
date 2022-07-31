import React from "react";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { DashboardFetchedStackedData } from "../../utils/types/app.types";

interface Props {
  width: string;
  height: string;
  stackedData: DashboardFetchedStackedData | undefined;
}

const Stacked = ({ width, height, stackedData }: Props) => {
  let content = <p className="font-loading">Fetching data ...</p>;
  if (stackedData) {
    content = (
      <ChartComponent
        width={width}
        height={height}
        id="charts"
        primaryXAxis={stackedData.stackedPrimaryXAxis}
        primaryYAxis={stackedData.stackedPrimaryYAxis}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        legendSettings={{ background: "white" }}
      >
        <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
        <SeriesCollectionDirective>
          {stackedData.stackedCustomSeries.map((item: any[], index: number) => (
            <SeriesDirective key={index} {...item} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
    );
  }

  return content;
};

export default Stacked;
