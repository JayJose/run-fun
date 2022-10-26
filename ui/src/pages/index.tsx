import {
  Text,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react'

import { Container } from '../components/Container'
import  MyResponsiveCalendar  from '../components/Calendar'
import  MyResponsiveLine  from '../components/Line'
import MyStat from '../components/MyStat'

const Index = () => (
  <Container height="100vh" width="container.xl">
    <Heading mt={3}>🏃 Run 🏃</Heading>
    <VStack height={'100vh'} width={'100%'}>
    <HStack p={2} spacing={5}>
    <MyStat/>
    <MyStat/>
    <MyStat/>
    <MyStat/>
    </HStack>
     <MyResponsiveCalendar/>
    <MyResponsiveLine/>
    </VStack>
  </Container>
)

export default Index
