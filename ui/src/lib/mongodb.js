import { MongoClient } from 'mongodb';

export const mongod = new MongoClient(
  'mongodb://root:rootpassword@localhost:27017/?authMechanism=DEFAULT',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// TOTAL COUNT
export const countAgg = [
  {
    $match: {
      'lap.sport': {
        $eq: 'running'
      }
    }
  },
  {
    $group: {
      _id: null,
      count: {
        $sum: {
          $sum: 1
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      totalRuns: '$count'
    }
  }
];

// STATS AGG
export const statsAgg = [
  {
    $unwind: {
      path: '$lap'
    }
  },
  {
    $match: {
      'lap.sport': {
        $eq: 'running'
      }
    }
  },
  {
    $group: {
      _id: null,
      sport: {
        $first: '$lap.sport'
      },
      totalDistanceMeters: {
        $sum: '$lap.total_distance'
      },
      totalTimeSeconds: {
        $sum: '$lap.total_elapsed_time'
      },
      totalCalories: {
        $sum: '$lap.total_calories'
      },
      totalStrides: {
        $sum: '$lap.total_strides'
      }
    }
  },
  {
    $project: {
      _id: 0,
      totalTimeMinutes: {
        $round: [
          {
            $divide: ['$totalTimeSeconds', 60]
          },
          1
        ]
      },
      totalDistanceMiles: {
        $round: [
          {
            $divide: ['$totalDistanceMeters', 1609]
          },
          1
        ]
      },
      totalCalories: {
        $round: ['$totalCalories', 1]
      }
    }
  }
];
