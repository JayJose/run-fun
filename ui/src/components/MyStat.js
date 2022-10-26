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
    <Stat>
      <StatLabel>{data.field}</StatLabel>
      <StatNumber>{data.value}</StatNumber>
      <StatHelpText>{data.footer}</StatHelpText>
    </Stat>
  );
}
