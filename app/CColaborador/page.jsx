'use client';  // Especifica que este componente será renderizado no lado do cliente

// Importa as bibliotecas necessárias
import { useState } from "react"; // Importa useState para gerenciar estados
import Styles from '@/app/CColaborador/colaborador.module.css'; // Importa os estilos CSS
import Link from "next/link"; // Importa o componente Link do Next.js para navegação
import Image from "next/image";

// Função principal que define o componente da página de criação de usuário
export default function CreateColaborador() {
    // Declaração dos estados usando useState para armazenar dados do colaborador
    const [telefone, setTelefone] = useState(''); // Estado para o telefone
    const [dataNasc, setDataNasc] = useState(''); // Estado para a data de nascimento
    const [cpf, setCPF] = useState(''); // Estado para o CPF
    const [nome, setNome] = useState('');  // Estado para o nome do usuário, inicialmente vazio
    const [email, setEmail] = useState('');  // Estado para o email do usuário, inicialmente vazio
    const [mensagemErro, setMensagemErro] = useState(''); // Estado para mensagens de erro
    const [mensagemSucesso, setMensagemSucesso] = useState(''); // Estado para mensagens de sucesso

    // Função para lidar com a mudança do telefone
    const testetele = (e) => {
        const value = e.target.value; // Obtém o valor do input
        // Permite apenas até 15 caracteres no telefone
        if (value.length < 15) {
            setTelefone(value); // Atualiza o estado do telefone
        }
    };

    // Função para lidar com a mudança do CPF
    const testecpf = (e) => {
        const value = e.target.value; // Obtém o valor do input
        // Permite apenas até 14 caracteres no CPF
        if (value.length < 15) {
            setCPF(value); // Atualiza o estado do CPF
        }
    };

    // Função assíncrona para criar um novo usuário ao submeter o formulário
    const createUser  = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        try {
            // Formata a data para o formato desejado
            const formattedDataNasc = new Date(dataNasc).toISOString().replace('T', ' ').replace('Z', '');

            // Faz uma requisição para registrar o colaborador
            const response = await fetch('http://localhost:3001/registrarcolaborador', {
                method: 'POST', // Método POST para criação
                headers: { 'Content-Type': 'application/json' }, // Define o cabeçalho como JSON
                body: JSON.stringify({
                    nome,
                    email,
                    telefone,
                    cpf,
                    dataNasc: formattedDataNasc // Envia os dados formatados
                }),
            });

            // Verifica se a resposta foi bem-sucedida
            if (response.ok) {
                setMensagemSucesso('Usuário criado com sucesso!'); // Mensagem de sucesso
                setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem após 3 segundos
            } else {
                const errorMessage = `Erro ao criar usuário, dados inválidos`; // Mensagem de erro
                setMensagemErro(errorMessage);
                setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            // Captura e exibe erros que ocorrerem durante a criação
            setMensagemErro('Erro ao criar usuário: ' + error);
            setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    // Renderização do componente
    return (
        <>
             <div className={Styles.retornar}>
                <Link href="/PagInicial">
                    <Image
                        width={50}
                        height={50}
                        src='/retornar.png'
                        alt="Retornar"
                    />
                </Link>
            </div>
            <p className={Styles.title}>
                <label>Cadastro de Colaborador</label>
            </p>

            <form className={Styles.form} onSubmit={createUser }> {/* Chama createUser  ao enviar o formulário */}
                {/* Exibe mensagem de sucesso, se houver */}
                {mensagemSucesso && (
                    <div className={Styles.notificacao}>
                        {mensagemSucesso}
                    </div>
                )}
                {/* Exibe mensagem de erro, se houver */}
                {mensagemErro && (
                    <div className={Styles.notificacaoErro}>
                        {mensagemErro}
                    </div>
                )}
                <br />
                <label >Nome Completo:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)} // Atualiza o estado do nome
                    required // Campo obrigatório
                />

                <br />

                <label>Telefone:</label>
                <input
                    type="text"
                    value={telefone}
                    onChange={testetele}  // Agora testetele está definido no escopo do componente
                    required // Campo obrigatório
                    maxLength={15} // Limite de caracteres para o telefone
                    placeholder="Digite seu telefone"
                />
                <br />

                <label>CPF:</label>
                <input
                    type="text"
                    value={cpf}
                    onChange={testecpf}
                    required // Campo obrigatório
                    maxLength={14} // Limite de caracteres para o CPF
                    placeholder="Digite seu CPF"
                />

                <br />

                <label>Data de Nascimento:</label>
                <input
                    className={Styles.inputBox}
                    type="date"
                    value={dataNasc}
                    onChange={(e) => setDataNasc(e.target.value)} // Atualiza o estado da data de nascimento
                    min="1979-12-31"
                    max="2020-01-02"
                    required // Campo obrigatório
                />
                <br />

                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}  // O valor do campo é controlado pelo estado email
                    onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
                    required // Campo obrigatório
                    className={Styles.input}  /* Aplica o estilo de input definido no CSS Module */
                />
                <br />

                <br />
                <div className={Styles.inputContainer}>
                    <button className={Styles.inputButton} type="submit">Criar</button>
                </div>
            </form>
        </>
    );
}