import React from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { BackToSignIn, BackToSignInText, Container, Title } from './styles';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />
            <Button
              onPress={() => {
                console.log('OnPress');
              }}
            >
              Cadastrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para o login</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
