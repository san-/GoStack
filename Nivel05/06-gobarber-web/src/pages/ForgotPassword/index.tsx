import React, { useCallback, useRef, useState } from 'react';

import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Container, Content, Background, AnimationContent } from './styles';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [loading, setLoaging] = useState(false);

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      setLoaging(true);
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
        });
        await schema.validate(data, { abortEarly: false });

        // await signIn({ email: data.email, password: data.password });
        await api.post('/password/forgot', { email: data.email });
        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Um e-mail de recuperação de senha foi enviado. Cheque sua caixa de entrada.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      } finally {
        setLoaging(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContent>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input
              name="email"
              type="text"
              placeholder="E-mail"
              icon={FiMail}
            />
            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiArrowLeft /> Voltar ao login
          </Link>
        </AnimationContent>
      </Content>
      <Background />
    </Container>
  );
};
export default ForgotPassword;
