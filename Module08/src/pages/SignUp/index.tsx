import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utls/getValidationErrors';
import { Background, Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
});

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: any) => {
    formRef.current?.setErrors({});

    try {
      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      console.log(err);

      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça seu Cadastro</h1>

          <Input name="name" placeholder="Nome" icon={FiUser} />
          <Input name="email" placeholder="E-mail" icon={FiMail} />

          <Input
            name="password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="login">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
