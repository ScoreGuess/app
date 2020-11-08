import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import AttributeView from './AttributeView';
import React from 'react';

const ResultListView = ({style, prediction}) => {
  const {attributes} = prediction;
  const [first, ...rest] = attributes;
  if (first == null) return null;
  return (
    <View style={{...tailwind('pt-2 pb-2'), ...style}}>
      <View style={tailwind('flex-row justify-between pt-2 pb-2')}>
        <Text style={tailwind('font-bold pr-1')}>Résultats</Text>
        {first && <AttributeView attribute={first} />}
      </View>
      {rest.map((attribute, i) => (
        <View key={i} style={tailwind('flex-row justify-end pt-2 pb-2')}>
          <AttributeView attribute={attribute} />
        </View>
      ))}
    </View>
  );
};

export default ResultListView;
