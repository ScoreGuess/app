import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import React from 'react';

interface FixtureSectionHeaderProps {
  section: {
    title: string;
  };
}
const FixtureSectionHeader = ({
  section: {title},
}: FixtureSectionHeaderProps): React.ReactElement<any> => (
  <View style={tailwind('bg-gray-100 p-4 border-b-2 mb-2 border-gray-200')}>
    <Text style={tailwind('font-bold')}>{title}</Text>
  </View>
);

export default FixtureSectionHeader;
