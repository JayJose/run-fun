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
        $sum: '$lap.total_timer_time'
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

// CUMULATIVE MILES BY DAY
export const dayCumAgg = [
  {
    $unset: [
      'record',
      'username',
      'total_timer_time',
      'event',
      'event_type',
      'type',
      'num_sessions',
      'timestamp'
    ]
  },
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
    $addFields: {
      date: {
        $toDate: '$local_timestamp'
      },
      miles: {
        $divide: ['$lap.total_distance', 1609]
      }
    }
  },
  {
    $group: {
      _id: '$date',
      totalMiles: {
        $sum: '$miles'
      }
    }
  },
  {
    $setWindowFields: {
      partitionBy: null,
      sortBy: {
        _id: 1
      },
      output: {
        cumTotalMiles: {
          $sum: '$totalMiles',
          window: {
            documents: ['unbounded', 'current']
          }
        }
      }
    }
  },
  {
    $group: {
      _id: '$_id.year',
      data: {
        $addToSet: {
          x: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$_id'
            }
          },
          y: '$cumTotalMiles'
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      id: '$_id',
      data: {
        $sortArray: {
          input: '$data',
          sortBy: {
            x: 1
          }
        }
      }
    }
  },
  {
    $sort: {
      id: 1
    }
  }
];
