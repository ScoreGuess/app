import tailwind from 'tailwind-rn';
import {Card, Paragraph, Text, Title} from 'react-native-paper'
 import React from 'react';

const AloneDisclaimer = ({group}) => {
  return (
    <Card >
        <Card.Content>

      <Title>
        😅 Tu te sens un peu seul ?
      </Title>
      <Paragraph>
        Invite tes potes en leur envoyant le lien suivant. ils rejoindront
        directement {group.name}
      </Paragraph>
        </Card.Content>

    </Card>
  );
};

export default AloneDisclaimer;
