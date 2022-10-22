import { ResponsiveCalendar } from "@nivo/calendar";

import runs from "../data/runsByDay.json";

const theme = {
  theme: {
    fontSize: 10,
    textColor: "white",
  },
  tooltip: {
    container: {
      background: "#ffffff",
      color: "#333333",
      fontSize: 11,
    },
  },
  legends: {
    text: {
      fontSize: 12,
      color: "#ffffff",
    },
  },
};
//
//       legend: {
//         text: {
//           fontSize: 11,
//         },
//       },
//       ticks: {
//         line: {
//           stroke: "#777777",
//           strokeWidth: 0,
//         },
//         text: {
//           fontSize: 10,
//           fill: "white",
//         },
//       },
//     },
//     legends: {
//       text: {
//         fontSize: 12,
//       },
//     },
//     },
//   },

export default function MyResponsiveCalendar() {
  const data = runs;
  const colors = ["#f2f0f7", "#cbc9e2", "#9e9ac8", "#6a51a3"];
  return (
    <ResponsiveCalendar
      theme={theme}
      data={data}
      from="2019-07-01"
      to="2022-12-31"
      emptyColor="#eeeeee"
      colors={colors}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
}
