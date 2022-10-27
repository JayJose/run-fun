import {
  Text,
  Heading,
  HStack,
  VStack,
  Stack,
  Divider
} from '@chakra-ui/react';

import { Container } from '../components/Container';

// UI
import MyStat from '../components/MyStat';
import MySlider from '../components/MySlider';

// CHARTS
import MyResponsiveCalendar from '../components/Calendar';
import MyResponsiveLine from '../components/Line';

const textData = { field: 'Activities', value: 100, footer: 'Runs' };
const textData1 = { field: 'Total Distance', value: 100, footer: 'Miles' };
const textData2 = { field: 'Avg. Distance', value: 100, footer: 'Miles' };
const textData3 = { field: 'Avg. Pace', value: 100, footer: 'Min. per mile' };

const Index = () => (
  <Container maxW="container.xl" p={{ base: 0, md: 3 }} background={'blue.200'}>
    <Heading m={5}>Run.</Heading>
    <Divider width={'90%'}></Divider>
    <VStack height={'100vh'} width={'100%'}>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        width={'75%'}
        p={2}
        spacing={3}
      >
        <MyStat data={textData} />
        <MyStat data={textData1} />
        <MyStat data={textData2} />
        <MyStat data={textData3} />
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
      <MyResponsiveCalendar />
      <MyResponsiveLine />
    </VStack>
  </Container>
);

export default Index;
