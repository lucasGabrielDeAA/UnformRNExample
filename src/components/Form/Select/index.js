import React, {useState, useCallback} from 'react';
import {Text} from 'react-native';
import Modal from 'react-native-modal';

import {Container, Label, ModalContainer} from './styles';

export default function Select({placeholder}) {
  const [modalShown, setModalShown] = useState(false);

  return (
    <>
      <Container onPress={() => setModalShown(!modalShown)}>
        <Label>{placeholder}</Label>
      </Container>

      <Modal
        isVisible={modalShown}
        onBackdropPress={() => setModalShown(false)}>
        <ModalContainer>
          <Text>testando</Text>
        </ModalContainer>
      </Modal>
    </>
  );
}
