import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import * as yup from 'yup';
import api from '../../services/api';
import logo from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  TitleLogon,
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles';

interface DataSignUp {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleCreateAccount = useCallback(
    async (data: DataSignUp) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório'),
          email: yup
            .string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: yup.string().required().min(6, 'No mínimo 6 digitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);
        Alert.alert(
          'Cadastro realizado com sucesso !',
          'Voce já pode logar na aplicação',
        );

        navigation.goBack();
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao realizar seu cadastro na aplicação',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={logo} />
            <View>
              <TitleLogon> Crie sua conta</TitleLogon>
            </View>
            <Form ref={formRef} onSubmit={handleCreateAccount}>
              <Input
                autoCapitalize="words"
                placeholder="Nome"
                name="name"
                icon="user"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="E-mail"
                name="email"
                icon="mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                secureTextEntry
                ref={passwordInputRef}
                textContentType="newPassword"
                placeholder="Senha"
                name="password"
                icon="lock"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignInButton onPress={() => navigation.goBack()}>
        <Icon size={20} name="arrow-left" color="#fff" />
        <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
      </BackToSignInButton>
    </>
  );
};

export default SignUp;
