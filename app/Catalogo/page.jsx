"use client"; // Indica que este componente é um componente de cliente

// Importa as bibliotecas necessárias
import React, { useState } from 'react'; // Importa React e useState para gerenciar estados
import Styles from '@/app/Catalogo/catalogo.module.css'; // Importa os estilos CSS
import Link from "next/link"; // Importa o componente Link do Next.js para navegação
import Image from "next/image";

// Componente principal para catalogar um exemplar
export default function Catalogo() {
    // Declaração dos estados usando useState para armazenar dados do exemplar
    const [Exemplar, setExemplar] = useState(''); // Estado para o exemplar
    const [autor, setAutor] = useState(''); // Estado para o autor
    const [assunto, setAssunto] = useState(''); // Estado para o assunto
    const [nChamada, setNChamada] = useState(''); // Estado para o número de chamada
    const [acervo, setAcervo] = useState(''); // Estado para o acervo
    const [ISBN, setISBN] = useState(''); // Estado para o ISBN
    const [quantidade, setQuantidade] = useState(''); // Estado para a quantidade
    const [titulo, setTitulo] = useState(''); // Estado para o título
    const [mensagemErro, setMensagemErro] = useState(''); // Estado para mensagens de erro
    const [mensagemSucesso, setMensagemSucesso] = useState(''); // Estado para mensagens de sucesso

    // Função para criar um novo acervo
    const createAcervo = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        // Cria um objeto com os dados do novo acervo
        const requestBody = {
            Exemplar: Exemplar,
            Autor: autor,
            Título: titulo,
            Assunto: assunto,
            nChamada: nChamada,
            Acervo: acervo,
            ISBN: ISBN,
            Quantidade: quantidade,
        };

        try {
            // Faz uma requisição para registrar o acervo
            const response = await fetch('http://localhost:3001/registraracervo', {
                method: 'POST', // Método POST para criação
                headers: { 'Content-Type': 'application/json' }, // Define o cabeçalho como JSON
                body: JSON.stringify(requestBody), // Converte os dados para JSON
            });

            // Verifica se a resposta foi bem-sucedida
            if (response.ok) {
                setMensagemSucesso('Catálogo criado com sucesso!'); // Mensagem de sucesso
                setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem após 3 segundos
            } else {
                const errorMessage = `Erro ao criar catálogo, dados inválidos`; // Mensagem de erro
                setMensagemErro(errorMessage);
                setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            // Captura e exibe erros que ocorrerem durante a criação
            setMensagemErro('Erro ao criar catálogo: ' + error);
            setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    // Renderização do componente
    return (
        <>
        <form>
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

            <div className={Styles.inputContainerPrincipal}>
                <h3>Catalogar Exemplar</h3>
                
                    {/* Campo para o nome do autor */}
                    <div className={Styles.inputContainer}>
                        <p>Nome do autor:</p>
                        <input
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)} // Atualiza o estado do autor
                            className={Styles.inputBox}
                            required // Campo obrigatório
                        />
                    </div>
                    {/* Campo para o título do exemplar */}
                    <div className={Styles.inputContainer}>
                        <p>Título do exemplar:</p>
                        <input
                            value={titulo }
                            onChange={(e) => setTitulo(e.target.value)} // Atualiza o estado do título
                            className={Styles.inputBox}
                            required // Campo obrigatório
                        />
                    </div>
                    {/* Campo para o código do assunto */}
                    <div className={Styles.inputContainer}>
                        <p>Código do assunto:</p>
                        <input
                            value={assunto}
                            onChange={(e) => setAssunto(e.target.value)} // Atualiza o estado do assunto
                            className={Styles.inputBox}
                            required // Campo obrigatório
                        />
                    </div>
                    {/* Campo para o número de chamada */}
                    <div className={Styles.inputContainer}>
                        <p>Número de chamada:</p>
                        <input
                            value={nChamada}
                            onChange={(e) => setNChamada(e.target.value)} // Atualiza o estado do número de chamada
                            className={Styles.inputBox}
                            required // Campo obrigatório
                        />
                    </div>
                    {/* Campo para o acervo */}
                    <div className={Styles.inputContainer}>
                        <p>Acervo:</p>
                        <input
                            value={acervo}
                            onChange={(e) => setAcervo(e.target.value)} // Atualiza o estado do acervo
                            className={Styles.inputBox}
                            required // Campo obrigatório
                        />
                    </div>
                    {/* Campo para o ISBN */}
                    <div className={Styles.inputContainer}>
                        <p>ISBN:</p>
                        <input
                            value={ISBN}
                            onChange={(e) => setISBN(e.target.value)} // Atualiza o estado do ISBN
                            className={Styles.inputBox}
                            required // Campo obrigatório
                        />
                    </div>
                    {/* Campo para a quantidade */}
                    <div className={Styles.inputContainer}>
                        <p>Quantidade:</p>
                        <input
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)} // Atualiza o estado da quantidade
                            className={Styles.inputBox}
                            required // Campo obrigatório
                        />
                    </div>
                    {/* Botão para registrar */}
                    <div className={Styles.inputContainer}>
                    <button className={Styles.inputButton} type="button" onClick={createAcervo}>Registrar</button>
                    </div>
              
            </div>

        </form>
        </>
    );
}