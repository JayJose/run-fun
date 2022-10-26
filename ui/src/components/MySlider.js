import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb
} from '@chakra-ui/react';

export default function MySlider(props) {
  return (
    <RangeSlider
      aria-label={['min', 'max']}
      colorScheme="pink"
      defaultValue={[10, 30]}
      {...props}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  );
}
