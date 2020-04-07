import React, {useState, useCallback} from 'react';
import {Platform} from 'react-native';
import Modal from 'react-native-modal';

import {
  Container,
  Label,
  Value,
  StyledPicker,
  ModalContainer,
  ModalTitle,
  Buttons,
  Button,
  CancelText,
  ConfirmText,
} from './styles';

export default function Select({placeholder, options}) {
  const [modalShown, setModalShown] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = useCallback(
    (itemValue, itemIndex) => {
      setSelected(options[itemIndex]);
    },
    [options],
  );

  const handleCancel = useCallback(() => {
    setSelected(null);
    setModalShown(false);
  }, []);

  const handlePress = useCallback(() => {
    if (Platform.OS === 'ios') {
      setModalShown(true);
    }
  }, []);

  return (
    <>
      <Container disabled={Platform.OS === 'android'} onPress={handlePress}>
        <Label>{placeholder}</Label>

        {Platform.OS === 'ios' ? (
          <Value>{selected?.label || ''}</Value>
        ) : (
          <StyledPicker
            selectedValue={selected?.value || ''}
            onValueChange={handleSelect}>
            {options.map((option, index) => (
              <StyledPicker.Item
                key={String(index)}
                label={option.label}
                value={option.value}
              />
            ))}
          </StyledPicker>
        )}
      </Container>

      <Modal
        isVisible={modalShown}
        onBackdropPress={() => setModalShown(false)}>
        <ModalContainer>
          <ModalTitle>{placeholder}</ModalTitle>
          <StyledPicker
            selectedValue={selected?.value || ''}
            onValueChange={handleSelect}>
            {options.map((option, index) => (
              <StyledPicker.Item
                key={String(index)}
                label={option.label}
                value={option.value}
              />
            ))}
          </StyledPicker>

          <Buttons>
            <Button onPress={handleCancel}>
              <CancelText>Cancelar</CancelText>
            </Button>

            <Button onPress={() => setModalShown(false)}>
              <ConfirmText>OK</ConfirmText>
            </Button>
          </Buttons>
        </ModalContainer>
      </Modal>
    </>
  );
}

Select.defaultProps = {
  placeholder: '',
  options: [],
};
