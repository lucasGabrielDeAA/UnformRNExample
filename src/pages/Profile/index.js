import React, {useRef, useState, useCallback} from 'react';
import Modal from 'react-native-modal';

import {
  Container,
  UserInfo,
  Avatar,
  NameContainer,
  Label,
  Information,
} from './styles';

import Form from '../../components/Form';
import CustomInput from '../../components/Form/CustomInput';

export default function Profile() {
  const formRef = useRef(null);

  const [inputSelected, setInputSelected] = useState('');

  const scrollToFocusedInput = useCallback(inputName => {
    setInputSelected(inputName);
  }, []);

  const focusNextInput = useCallback(inputName => {
    formRef.current.getFieldRef(inputName).focus();
  }, []);

  const handleSubmit = useCallback(async (data, {reset}) => {
    try {
      reset();
    } catch (err) {}
  }, []);

  return (
    <Container>
      <Form
        formRef={formRef}
        handleSubmit={handleSubmit}
        inputSelected={inputSelected}>
        <UserInfo>
          <Avatar
            source={{
              uri:
                'https://yt3.ggpht.com/a/AATXAJxZIrmTsSyOyg5rXM9PRTmso0d94t44hH9Qbg=s900-c-k-c0xffffffff-no-rj-mo',
            }}
          />
          <NameContainer>
            <CustomInput
              autoCorrect={false}
              name="name"
              placeholder="Nome"
              autoCapitalize="none"
              returnKeyType="next"
              handleFocus={() => scrollToFocusedInput('name')}
              onSubmitEditing={() => focusNextInput('lastname')}
            />
            <CustomInput
              autoCorrect={false}
              name="lastname"
              placeholder="Sobrenome"
              autoCapitalize="none"
              returnKeyType="next"
              handleFocus={() => scrollToFocusedInput('lastname')}
              onSubmitEditing={() => focusNextInput('bio')}
            />
          </NameContainer>
        </UserInfo>

        <CustomInput
          autoCorrect={false}
          name="bio"
          placeholder="Biografia"
          autoCapitalize="none"
          returnKeyType="next"
          handleFocus={() => scrollToFocusedInput('bio')}
          onSubmitEditing={() => focusNextInput('city')}
        />

        <CustomInput
          autoCorrect={false}
          name="city"
          placeholder="Cidade"
          autoCapitalize="none"
          returnKeyType="next"
          handleFocus={() => scrollToFocusedInput('city')}
          onSubmitEditing={() => focusNextInput('state')}
        />

        <CustomInput
          autoCorrect={false}
          name="state"
          placeholder="Estado"
          autoCapitalize="none"
          returnKeyType="next"
          handleFocus={() => scrollToFocusedInput('state')}
          onSubmitEditing={() => focusNextInput('sport')}
        />

        <CustomInput
          autoCorrect={false}
          name="sport"
          placeholder="Esporte principal"
          autoCapitalize="none"
          returnKeyType="next"
          handleFocus={() => scrollToFocusedInput('sport')}
          onSubmitEditing={() => focusNextInput('birthday')}
        />

        <Label>Informações sobre o atleta</Label>

        <CustomInput
          autoCorrect={false}
          name="birthday"
          placeholder="Data de nascimento"
          returnKeyType="done"
          keyboardType="number-pad"
          handleFocus={() => scrollToFocusedInput('birthday')}
          onSubmitEditing={() => focusNextInput('gender')}
        />

        <CustomInput
          autoCorrect={false}
          name="gender"
          placeholder="Sexo"
          autoCapitalize="none"
          returnKeyType="next"
          handleFocus={() => scrollToFocusedInput('gender')}
          onSubmitEditing={() => focusNextInput('weight')}
        />

        <CustomInput
          autoCorrect={false}
          name="weight"
          placeholder="Peso (kg)"
          autoCapitalize="none"
          returnKeyType="next"
          handleFocus={() => scrollToFocusedInput('weight')}
          onSubmitEditing={() => focusNextInput('cardio')}
        />

        <Information>
          Usadas para calcular calorias, potência e mais.
        </Information>

        <Label>Potencial de desempenho</Label>

        <CustomInput
          autoCorrect={false}
          name="cardio"
          placeholder="Frequência cardíaca máxima"
          returnKeyType="done"
          keyboardType="number-pad"
          handleFocus={() => scrollToFocusedInput('cardio')}
          onSubmitEditing={() => focusNextInput('distance')}
        />

        <CustomInput
          autoCorrect={false}
          name="distance"
          placeholder="Distância"
          returnKeyType="done"
          keyboardType="number-pad"
          handleFocus={() => scrollToFocusedInput('distance')}
          onSubmitEditing={() => focusNextInput('time')}
        />

        <CustomInput
          autoCorrect={false}
          name="time"
          placeholder="Tempo de prova"
          returnKeyType="done"
          keyboardType="number-pad"
          handleFocus={() => scrollToFocusedInput('time')}
          onSubmitEditing={() => focusNextInput('ftp')}
        />

        <CustomInput
          autoCorrect={false}
          name="ftp"
          placeholder="Limite de Potência Funcional (FTP)"
          returnKeyType="done"
          handleFocus={() => scrollToFocusedInput('ftp')}
          onSubmitEditing={() => handleSubmit()}
        />

        <Information>
          Usadas para definir a frquência cardíaca, as zonas de ritmo de corrida
          e as zonas de potência.
        </Information>
      </Form>
    </Container>
  );
}
