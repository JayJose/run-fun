import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Heading,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import  MyResponsiveCalendar  from '../components/Calendar'

const Index = () => (
  <Container height="100vh">
<Heading mt={3}>Run 🏃🏃🏃🏃🏃🏃🏃🏃🏃🏃🏃🏃🏃</Heading>
<MyResponsiveCalendar></MyResponsiveCalendar>

  </Container>
)

export default Index
