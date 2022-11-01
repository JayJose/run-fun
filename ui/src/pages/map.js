import { Container } from '@chakra-ui/react';
import { MyMap } from '../components/MyMap';

export default function Map() {
  return (
    <Container height={'80vh'} width={'100%'} bg={'yellow.100'}>
      <MyMap></MyMap>
    </Container>
  );
}
