import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup
} from '@chakra-ui/react';

const myStatStyles = {
  background: 'gray.200',
  borderRadius: '0.5em',
  boxShadow: 'sm'
};

export default function MyStat({ data, styles = { ...myStatStyles } }) {
  return (
    <Stat p={1} {...styles}>
      <StatLabel>{data.field}</StatLabel>
      <StatNumber>{data.value.toLocaleString()}</StatNumber>
      <StatHelpText m={0}>{data.footer}</StatHelpText>
    </Stat>
  );
}

// export default function MyStat(data, {...statStyles}) {
//   console.log(data);
//   return (
//     <Stat p={1} background={background} borderRadius={'0.5em'} boxShadow={'sm'}>
//       <StatLabel>{data.field}</StatLabel>
//       <StatNumber>{data.value}</StatNumber>
//       <StatHelpText m={0}>{data.footer}</StatHelpText>
//     </Stat>
//   );
// }
