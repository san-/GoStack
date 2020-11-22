import React from 'react';

import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="GoBarber" />
      <form>
        <h1>Faça seu login</h1>
        <Input name="email" type="text" placeholder="Nome" icon={FiUser} />
        <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          icon={FiLock}
        />
        <Button type="submit">Cadastrar</Button>
      </form>
      <a href="login">
        <FiArrowLeft /> Voltar para logon
      </a>
    </Content>
  </Container>
);
export default SignUp;
