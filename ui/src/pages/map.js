import { Container } from '@chakra-ui/react';
import { MyMap } from '../components/MyMap';

export default function Map() {
  return (
    <Container maxW="container.xl" height={'80vh'} bg={'blackAlpha.800'}>
      <MyMap></MyMap>
    </Container>
  );
}
