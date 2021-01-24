import React, { useCallback, useRef } from 'react';

import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Content, Background, AnimationContent } from './styles';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Senha diferente da confirmação',
          ),
        });
        await schema.validate(data, { abortEarly: false });

        const { password, password_confirmation } = data;

        const token = location.search.replace('?token=', '');

        if (!token) {
          addToast({
            type: 'error',
            title: 'Erro no reset de senha',
            description: 'Token inválido',
          });
          return;
        }

        api.post('/password/reset', {
          token,
          password,
          password_confirmation,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no reset de senha',
          description:
            'Ocorreu um erro ao tentar redefinir sua senha. Tente novamente.',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContent>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Redefinir senha</h1>
            <Input
              name="password"
              type="password"
              placeholder="Nova senha"
              icon={FiLock}
            />
            <Input
              name="password_confirmation"
              type="password"
              placeholder="Confirmação da nova senha"
              icon={FiLock}
            />
            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContent>
      </Content>
      <Background />
    </Container>
  );
};
export default ResetPassword;
