// pages/login.tsx
"use client"
import React from 'react';
import { signIn } from "next-auth/react";
import styled from 'styled-components';

const LoginPage: React.FC = () => {
    const credentialsAction = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = event.currentTarget["credentials-email"].value;
        const password = event.currentTarget["credentials-password"].value;
        await signIn("credentials", { email, password, redirect: false });
    }

    return (
        <Container>
            <Form onSubmit={credentialsAction} >
                <Title>Login</Title>
                <Input id="credentials-email" name="email" type="email" placeholder="Email" required />
                <Input type="password" id="credentials-password" name="password" placeholder="Password" required />
                <Button type="submit" >Login</Button>
            </Form>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  background-image: url('https://picsum.photos/1600/900');
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  margin-bottom: 24px;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
    transform: scale(1.05);
    transition: transform 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default LoginPage;