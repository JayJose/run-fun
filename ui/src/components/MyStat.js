import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup
} from '@chakra-ui/react';

export default function MyStat({ data }) {
  return (
    <Stat p={1} background={'gray.100'} borderRadius={'0.5em'} boxShadow={'sm'}>
      <StatLabel>{data.field}</StatLabel>
      <StatNumber>{data.value}</StatNumber>
      <StatHelpText m={0}>{data.footer}</StatHelpText>
    </Stat>
  );
}
