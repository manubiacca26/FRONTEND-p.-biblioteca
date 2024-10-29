'use client';  // Especifica que este componente será renderizado no lado do cliente

import { useState } from "react";
import styles from '@/app/CColaborador/colaborador.module.css';

// Função principal que define o componente da página de criação de usuário
export default function CreateUserPage() {
  const [telefone, setTelefone] = useState('');
  const [Dnasc, setDnasc] = useState('');
  const [CPF, setCPF] = useState('');
  const [name, setName] = useState('');  // Declara o estado para o nome do usuário, inicialmente vazio
  const [email, setEmail] = useState('');  // Declara o estado para o email do usuário, inicialmente vazio
  

  // Função para lidar com a mudança do telefone
  const testetele = (e) => {
    const value = e.target.value; 
    if (value.length < 15) {
      setTelefone(value);
    }
  };

  const testecpf = (e) => {
    const value = e.target.value;
    if (value.length < 15) {
      setCPF(value)
    }
  };

  // Função assíncrona para criar um novo usuário ao submeter o formulário
  const createUser  = async (e) => {
    e.preventDefault();  // Previne o comportamento padrão do formulário (recarregar a página)

    await fetch('http://localhost:3001/registrarcolaborador', {  // Faz uma requisição POST para o backend com os dados do usuário
      method: 'POST',  // Define o método como POST para criar um novo usuário
      headers: { 'Content-Type': 'application/json' },  // Define o cabeçalho da requisição para enviar dados em JSON
      body: JSON.stringify({ 
        name, 
        email, 
        telefone, 
        CPF, 
        Dnasc 
      }),  // Converte o objeto dos dados do usuário para JSON
    });


  };

  return (
    <>
      <p className={styles.title}>
        <label>Cadastro de Colaborador</label>
      </p>
    
      <form onSubmit={createUser} className={styles.form}>
        <br />
        <label>Nome Completo:</label>
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} required />

        <br />

        <label>Telefone:</label>
        <input type="text"
          value={telefone}
          onChange={testetele}  // Agora testetele está definido no escopo do componente
          required            
          maxLength={15}
          placeholder="Digite seu telefone" />
        <br />

        <label>CPF:</label>
        <input type="text"
          value={CPF}
          onChange={testecpf}
          required 
          maxLength={14}
          placeholder="Digite seu CPF" />

        <br />

        <label>Data de Nascimento:</label>
        <input
          className={styles.inputBox}
          type="date"
          value={Dnasc}
          onChange={(e) => setDnasc(e.target.value)}
          min="1979-12-31"
          max="2020-01-02"
          required
        /> <br/>

        <label>Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}  // O valor do campo é controlado pelo estado email
          onChange={(e) => setEmail(e.target.value)} required // Atualiza o estado email com o valor digitado pelo usuário
          className={styles.input}  /* Aplica o estilo de input definido no CSS Module */
        />
        <br />

       

        <br />
        <div className={styles.inputContainer}>
          <button className={styles.inputButton} onClick={createUser} type="submit">Criar</button> 
        </div>
      </form>
    </>
  );
}