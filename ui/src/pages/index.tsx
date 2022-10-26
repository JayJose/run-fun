import {
  Text,
  Heading,
  HStack,
  VStack,
  Divider,
} from '@chakra-ui/react'

import { Container } from '../components/Container'

// UI
import MyStat from '../components/MyStat'
import MySlider from '../components/MySlider'

// CHARTS
import  MyResponsiveCalendar  from '../components/Calendar'
import  MyResponsiveLine  from '../components/Line'

const textData = {field: 'Runs', value: 100, footer: ''}
const textData1 = {field: 'Total Distance', value: 100, footer: 'miles'}
const textData2 = {field: 'Avg. Distance', value: 100, footer: 'miles'}
const textData3 = {field: 'Avg. Pace', value: 100, footer: 'min./mi.'}

const Index = () => (
  <Container height="100vh" width="container.xl">
    <Heading m={5}>I am the header.</Heading>
    <Divider width={"90%"}></Divider>
    <VStack height={'100vh'} width={'100%'}>
    <HStack width={'75%'}  p={2} spacing={0}>
    <MyStat data={textData}/>
    <MyStat data={textData1}/>
    <MyStat data={textData2}/>
    <MyStat data={textData3}/>
    </HStack>
    <HStack width={"50%"} spacing={4}>
      <Text fontSize={'0.75em'} align='right'>From Date1</Text>
      <MySlider/>
      <Text fontSize={'0.75em'} align='left'>To Date2</Text>
    </HStack>
    <Divider width={"90%"}></Divider>
     <MyResponsiveCalendar/>
    <MyResponsiveLine/>
    </VStack>
  </Container>
)

export default Index
