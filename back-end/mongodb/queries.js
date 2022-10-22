// identify documents where the sport is not equal to running
import { MongoClient } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

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

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

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
