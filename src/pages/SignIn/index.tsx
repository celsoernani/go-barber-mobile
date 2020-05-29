import React, { useRef, useCallback } from 'react';
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
import * as yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import logo from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  TitleLogon,
  ForgotPassword,
  TextForgotPassword,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SignInDataObject {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { signIn } = useAuth();
  const handleSubmitSingIn = useCallback(async (data: SignInDataObject) => {
    try {
      formRef.current?.setErrors({});
      const schema = yup.object().shape({
        email: yup
          .string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: yup.string().required('Senha obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      await signIn({ email: data.email, password: data.password });
      // history.push('/dashboard');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const erros = getValidationErrors(error);
        formRef.current?.setErrors(erros);
        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais',
      );
    }
  }, []);

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
              <TitleLogon> Faça seu logon</TitleLogon>
            </View>
            <Form ref={formRef} onSubmit={handleSubmitSingIn}>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="E-mail"
                name="email"
                icon="mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                returnKeyType="send"
                placeholder="Senha"
                name="password"
                icon="lock"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
            <ForgotPassword>
              <TextForgotPassword>Esqueci minha senha </TextForgotPassword>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon size={20} name="log-in" color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
