import data from "../data/runsByYear.json";

import { ResponsiveLine } from "@nivo/line";

export function MyResponsiveLine() {
  const myData = data;
  const colors = ["#fcae91", "#fb6a4a", "#cb181d", "#a50f15"];

  return (
    <ResponsiveLine
      data={myData}
      curve={"linear"}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "linear", min: 1, max: 12 }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
      }}
      yFormat=" >-.0f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Cumulative miles",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={colors}
      pointSize={8}
      //pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "top-left",
          direction: "row",
          justify: false,
          translateX: 10,
          translateY: -20,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
