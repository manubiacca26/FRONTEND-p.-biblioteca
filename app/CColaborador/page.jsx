'use client';  // Especifica que este componente será renderizado no lado do cliente

import { useState } from "react";
import { useRouter } from 'next/navigation';  // Importa o hook useRouter do Next.js para redirecionamento de página
import styles from '@/app/CColaborador/colaborador.module.css';

// Função principal que define o componente da página de criação de usuário
export default function CreateUserPage() {
  const [telefone, setTelefone] = useState("");
  const [Dnasc, setDnasc] = useState("");
  const [CPF, setCPF] = useState("");
  const [name, setName] = useState('');  // Declara o estado para o nome do usuário, inicialmente vazio
  const [email, setEmail] = useState('');  // Declara o estado para o email do usuário, inicialmente vazio
  const router = useRouter();  // Instancia o hook useRouter para permitir navegação programática entre páginas

  // Função assíncrona para criar um novo usuário ao submeter o formulário
  const createUser = async (e) => {
    e.preventDefault();  // Previne o comportamento padrão do formulário (recarregar a página)

    await fetch('http://localhost:3001/registrarusuario', {  // Faz uma requisição POST para o backend com os dados do usuário
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

    router.push('/users');  // Redireciona para a página de listagem de usuários após a criação bem-sucedida
  };

  return (

    <>
    <p className={styles.title} >
        <label>Cadastro de Colaborador</label>
    </p>
    
    <form onSubmit={createUser}  className={styles.form}>
    <br></br>
    <label>Nome Completo:</label>
    <input type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} required />

    <br />

    <label>Telefone:</label>
                <input type="number"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)} required />

                <br />

        
                <label>CPF:</label>
                <input type="number"
                    value={CPF}
                    onChange={(e) => setCPF(e.target.value)} required />

                <br />

                <label>Data de Nascimento:</label>
                <input type="date"
                    value={Dnasc}
                    onChange={(e) => setDnasc(e.target.value)} required />

                <br />

        <input
          type="email"
          placeholder="Email"
          value={email}  // O valor do campo é controlado pelo estado email
          onChange={(e) => setEmail(e.target.value)}  // Atualiza o estado email com o valor digitado pelo usuário
          className={styles.input}  /* Aplica o estilo de input definido no CSS Module */
        />
        <br></br>

        <label>Tipo de empréstimo:</label>
        <select className={styles.option}>
            <option value="Normal">Empréstimo Normal</option>
            <option value="Especial">Empréstimo Especial</option>
        </select>

        <br></br>

        <label>Categoria do usuário:</label>
        <select className={styles.option}>
            <option value="Aluno">Aluno</option>
            <option value="Tercerizado">Tercerizado</option>
            <option value="Funcionário">Funcionário</option>
        </select>

        <br />
        <div className={styles.inputContainer}>

        <button type="submit" className={styles.inputButton}>Criar</button> 

        </div>
      </form>
    </>
  );
}