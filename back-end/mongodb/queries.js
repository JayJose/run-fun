// identify documents where the sport is not equal to running
import { MongoClient } from "mongodb";

const filter = {
  "lap.sport": {
    $ne: "running",
  },
};
const projection = {
  username: 1,
  timestamp: 1,
  total_timer_time: 1,
  "lap.avg_speed": 1,
  "lap.total_calories": 1,
  "lap.sport": 1,
};
const sort = {
  local_timestamp: -1,
};

const client = await MongoClient.connect(
  "mongodb://root:rootpassword@localhost:27017/?authMechanism=DEFAULT",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db("rundb").collection("runs");
const cursor = coll.find(filter, { projection, sort });
const result = await cursor.toArray();
await client.close();

// aggregate by run (activity with a sport = 'running')
import { MongoClient } from "mongodb";

const agg = [
  {
    $unwind: {
      path: "$lap",
    },
  },
  {
    $match: {
      "lap.sport": {
        $eq: "running",
      },
    },
  },
  {
    $group: {
      _id: "$activity_id",
      date: {
        $first: "$local_timestamp",
      },
      sport: {
        $first: "$lap.sport",
      },
      totalDistanceMeters: {
        $sum: "$lap.total_distance",
      },
      totalTimeSeconds: {
        $sum: "$lap.total_elapsed_time",
      },
      totalCalories: {
        $sum: "$lap.total_calories",
      },
      totalStrides: {
        $sum: "$lap.total_strides",
      },
    },
  },
  {
    $project: {
      _id: 1,
      date: {
        $toDate: "$date",
      },
      sport: 1,
      totalTimeMinutes: {
        $round: [
          {
            $divide: ["$totalTimeSeconds", 60],
          },
          1,
        ],
      },
      totalDistanceMiles: {
        $round: [
          {
            $divide: ["$totalDistanceMeters", 1609],
          },
          1,
        ],
      },
    },
  },
];

const client = await MongoClient.connect(
  "mongodb://root:rootpassword@localhost:27017/?authMechanism=DEFAULT",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db("rundb").collection("runs");
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();

// aggregate by date (for calendar view)
import { MongoClient } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $addFields: {
      day: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: {
            $toDate: "$local_timestamp",
          },
        },
      },
    },
  },
  {
    $unwind: {
      path: "$lap",
    },
  },
  {
    $match: {
      "lap.sport": {
        $eq: "running",
      },
    },
  },
  {
    $group: {
      _id: "$day",
      sport: {
        $first: "$lap.sport",
      },
      totalDistanceMeters: {
        $sum: "$lap.total_distance",
      },
      totalTimeSeconds: {
        $sum: "$lap.total_elapsed_time",
      },
      totalCalories: {
        $sum: "$lap.total_calories",
      },
      totalStrides: {
        $sum: "$lap.total_strides",
      },
    },
  },
  {
    $project: {
      _id: 0,
      day: "$_id",
      value: {
        $round: [
          {
            $divide: ["$totalDistanceMeters", 1609],
          },
          1,
        ],
      },
      totalTimeMinutes: {
        $round: [
          {
            $divide: ["$totalTimeSeconds", 60],
          },
          1,
        ],
      },
      totalDistanceMiles: {
        $round: [
          {
            $divide: ["$totalDistanceMeters", 1609],
          },
          1,
        ],
      },
    },
  },
];

const client = await MongoClient.connect(
  "mongodb://root:rootpassword@localhost:27017/?authMechanism=DEFAULT",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db("rundb").collection("runs");
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();

// cumulative miles by year and month
import { MongoClient } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $unset: [
      "record",
      "username",
      "total_timer_time",
      "event",
      "event_type",
      "type",
      "num_sessions",
      "timestamp",
    ],
  },
  {
    $unwind: {
      path: "$lap",
    },
  },
  {
    $match: {
      "lap.sport": {
        $eq: "running",
      },
    },
  },
  {
    $addFields: {
      year: {
        $year: {
          $toDate: "$local_timestamp",
        },
      },
      month: {
        $month: {
          $toDate: "$local_timestamp",
        },
      },
      miles: {
        $divide: ["$lap.total_distance", 1609],
      },
    },
  },
  {
    $group: {
      _id: {
        year: "$year",
        month: "$month",
      },
      totalMiles: {
        $sum: "$miles",
      },
    },
  },
  {
    $setWindowFields: {
      partitionBy: "$_id.year",
      sortBy: {
        "_id.month": 1,
      },
      output: {
        cumTotalMiles: {
          $sum: "$totalMiles",
          window: {
            documents: ["unbounded", "current"],
          },
        },
      },
    },
  },
  {
    $sort: {
      "_id.year": 1,
      "_id.month": 1,
    },
  },
  {
    $group: {
      _id: "$_id.year",
      data: {
        $addToSet: {
          x: "$_id.month",
          y: "$cumTotalMiles",
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      id: "$_id",
      data: 1,
    },
  },
  {
    $sort: {
      id: 1,
    },
  },
];

const client = await MongoClient.connect(
  "mongodb://root:rootpassword@localhost:27017/?authMechanism=DEFAULT",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db("rundb").collection("runs");
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
