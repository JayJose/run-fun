import {
  Text,
  Heading,
  HStack,
  VStack,
  Stack,
  Divider,
  Box,
  Flex
} from '@chakra-ui/react';

import { Container } from '../components/Container';

// UI
import MyStat from '../components/MyStat';
import MySlider from '../components/MySlider';

// DATABASE
import { mongod, countAgg, statsAgg } from '../lib/mongodb';

// CHARTS
import MyResponsiveCalendar from '../components/Calendar';
import { MyResponsiveLine, MyResponsiveDailyLine } from '../components/Line';
import { MyMap } from '../components/MyMap';

async function getAggregateData(collection, aggregate) {
  cursor = collection.aggregate(aggregate);
  return await cursor.toArray();
}

// STATIC PROPS
export async function getStaticProps() {
  mongod.connect();
  const coll = mongod.db('rundb').collection('runs');

  // TODO fix this...
  //  const counts = getAggregateData(coll, countAgg);
  const cursor1 = coll.aggregate(countAgg);
  const result1 = await cursor1.toArray();

  const cursor2 = coll.aggregate(statsAgg);
  const result2 = await cursor2.toArray();

  return {
    props: {
      count: JSON.parse(JSON.stringify(result1)),
      stats: JSON.parse(JSON.stringify(result2))
    }
  };
}

function Index(props) {
  const totalRuns = props.count[0].totalRuns;
  const totalDistance = props.stats[0].totalDistanceMiles;
  const totalTime = props.stats[0].totalTimeMinutes;
  const maxDistance = props.stats[0].maxDistanceMiles;
  const totalCalories = props.stats[0].totalCalories;

  const avgDistance = totalDistance / totalRuns;
  const avgPace = totalTime / totalDistance;

  return (
    <Container
      maxW="container.xl"
      p={{ base: 0, md: 3 }}
      background={'blue.200'}
    >
      <Heading m={5}>Run.</Heading>
      <Divider width={'90%'}></Divider>
      <VStack height={'100vh'} width={'100%'}>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          width={'75%'}
          p={2}
          spacing={3}
        >
          <MyStat
            data={{ field: 'Activities', value: totalRuns, footer: 'Runs' }}
          />
          <MyStat
            data={{
              field: 'Total Distance',
              value: totalDistance,
              footer: 'Miles'
            }}
          />
          <MyStat
            data={{
              field: 'Avg. Distance',
              value: avgDistance,
              footer: 'Miles'
            }}
          />
          <MyStat
            data={{
              field: 'Avg. Pace',
              value: avgPace,
              footer: 'Min. per mile'
            }}
          />
          <MyStat
            data={{
              field: 'Energy Used',
              value: totalCalories,
              footer: 'Calories'
            }}
          />
        </Stack>
        <HStack width={'50%'} spacing={4}>
          <Text fontSize={'0.75em'} align="right">
            From Date1
          </Text>
          <MySlider />
          <Text fontSize={'0.75em'} align="left">
            To Date2
          </Text>
        </HStack>
        <Divider width={'90%'}></Divider>
        <MyMap></MyMap>
      </VStack>
    </Container>
  );
}

export default Index;
