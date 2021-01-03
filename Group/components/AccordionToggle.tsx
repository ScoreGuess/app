import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import tailwind, {getColor} from 'tailwind-rn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';

interface AccordionToggleProps {
  onChange?: React.EventHandler<any>;
  defaultOpen?: boolean;
}

const AccordionToggle = ({onChange, defaultOpen}: AccordionToggleProps) => {
  const [state, setState] = useState(defaultOpen);
  useEffect(() => {
    onChange?.(state);
  }, [onChange, state]);
  const handlePress = () => {
    setState((s?: boolean) => !s ?? false);
  };
  return (
    <Pressable onPress={handlePress}>
      <View
        style={tailwind(
          'w-8 h-8 bg-gray-400 rounded-full flex-row items-center justify-center',
        )}>
        <FontAwesomeIcon
          color={getColor('gray-800')}
          icon={state === true ? faChevronDown : faChevronUp}
          size={16}
        />
      </View>
    </Pressable>
  );
};
AccordionToggle.defaultProps = {
  onChange: () => {},
  defaultOpen: false,
};

export default AccordionToggle;
