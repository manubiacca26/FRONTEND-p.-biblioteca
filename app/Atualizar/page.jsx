"use client"

// Importa as bibliotecas necessárias
import React, { useState } from 'react';
import Link from "next/link"; // Importa o componente Link do Next.js para navegação
import Styles from '@/app/Atualizar/atualizacao.module.css'; // Importa os estilos CSS
import Image from "next/image";

// Componente principal do catálogo
export default function Catalogo() {
    // Declaração dos estados usando useState para armazenar dados do exemplar
    const [autor, setAutor] = useState(''); // Estado para o autor
    const [titulo, setTitulo] = useState(''); // Estado para o título
    const [assunto, setAssunto] = useState(''); // Estado para o assunto
    const [numero, setNumero] = useState(''); // Estado para o número de chamada
    const [acervo, setAcervo] = useState(''); // Estado para o acervo
    const [ISBN, setISBN] = useState(''); // Estado para o ISBN
    const [quantidade, setQuantidade] = useState(''); // Estado para a quantidade
    const [Exemplar, setExemplar] = useState(''); // Estado para o exemplar
    const [mensagemErroExemplar, setMensagemErroExemplar] = useState(''); // Estado para mensagens de erro
    const [mensagemSucesso, setMensagemSucesso] = useState(''); // Estado para mensagens de sucesso

    // Função para buscar um exemplar no acervo
    const buscarExemplar = async () => {
        try {
            // Faz uma requisição para buscar o exemplar pelo ID
            const response = await fetch(`http://localhost:3001/buscaracervo/${Exemplar}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar o exemplar: ' + response.status); // Lança erro se a resposta não for OK
            }

            const exemplarData = await response.json(); // Converte a resposta em JSON
            // Preenche os inputs com os dados do exemplar
            setAutor(exemplarData.Autor);
            setTitulo(exemplarData.Título);
            setAssunto(exemplarData.Assunto);
            setNumero(exemplarData.nChamada);
            setAcervo(exemplarData.Acervo);
            setISBN(exemplarData.ISBN);
            setQuantidade(exemplarData.Quantidade);
            setMensagemSucesso('Exemplar encontrado com sucesso!'); // Mensagem de sucesso
            setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem de sucesso após 3 segundos
        } catch (error) {
            // Captura e exibe erros que ocorrerem durante a busca
            setMensagemErroExemplar('Erro ao buscar o exemplar: ' + error);
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    // Função para registrar as informações do exemplar
    const registrarExemplar = async () => {
        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!autor || !titulo || !assunto || !numero || !acervo || !quantidade) {
            setMensagemErroExemplar('Todos os campos devem ser preenchidos, exceto ISBN.'); // Mensagem de erro
            setTimeout(() => setMensagemErroExemplar(''), 4000); // Limpa a mensagem de erro após 4 segundos
            return; // Não continua se houver campos nulos
        }
        // Chama a função para atualizar o exemplar
        await atualizarExemplar(autor, assunto, numero, acervo, ISBN, quantidade, titulo);
    };

    // Função para atualizar os dados do exemplar
    const atualizarExemplar = async (autor, assunto, nChamada, acervo, ISBN, quantidade, titulo) => {
        try {
            // Cria um objeto com os dados atualizados do exemplar
            const updatedData = {
                Autor: autor,
                Título: titulo,
                Assunto: assunto,
                nChamada: nChamada,
                Acervo: acervo,
                ISBN: ISBN,
                Quantidade: quantidade,
            };

            // Faz uma requisição para atualizar o exemplar no servidor
            const updateResponse = await fetch(`http://localhost:3001/atualizaracervo/${Exemplar}`, {
                method: 'PUT', // Método PUT para atualização
                headers: { 'Content-Type': 'application/json' }, // Define o cabeçalho como JSON
                body: JSON.stringify(updatedData), // Converte os dados para JSON
            });

            if (!updateResponse.ok) {
                // Se a resposta não for OK, exibe mensagem de erro
                const errorMessage = `Erro ao atualizar a situação do exemplar`;
                setMensagemErroExemplar(errorMessage);
                setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            } else {
                // Se a resposta for OK, exibe mensagem de sucesso
                setMensagemSucesso('Exemplar atualizado com sucesso!');
                setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem de sucesso após 3 segundos
            }
        } catch (error) {
            // Captura e exibe erros que ocorrerem durante a atualização
            setMensagemErroExemplar('Erro ao atualizar a situação do exemplar: ' + error);
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    // Função para limpar os campos do formulário
    const limparExemplar = () => {
        setExemplar('');
        setAutor('');
        setTitulo('');
        setAssunto('');
        setNumero('');
        setAcervo('');
        setISBN('');
        setQuantidade('');
    };

    // Função para lidar com inputs numéricos
    const handleNumericInput = (e, setValue) => {
        const value = e.target.value;
        // Filtra apenas números
        const numericValue = value.replace(/[^0-9]/g, '');
        setValue(numericValue);
    };

    // Renderização do componente
    return (
        <>
             

            <form>
                {mensagemErroExemplar && (
                    <div className={Styles.notificacaoErro}>
                        {mensagemErroExemplar}
                    </div>
                )}
                {mensagemSucesso && (
                    <div className={Styles.notificacao}>
                        {mensagemSucesso}
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

                <div className={Styles.box1}>
                    <label className={Styles.form}>
                        <input
                            className={Styles.inputBox}
                            type="text"
                            placeholder="Exemplar"
                            value={Exemplar}
                            onChange={(e) => handleNumericInput(e, setExemplar)}
                            required
                        />
                    </label>

                    <div className={Styles.bot}>
                        <button className={Styles.inputButton} type="button" onClick={buscarExemplar}>Buscar</button>
                        <button className={Styles.inputButton} type="button" onClick={limparExemplar}>Limpar</button>
                    </div>
                </div>
            </form>

            <div className={Styles.inputContainerPrincipal}>
                <h3>Atualizar Exemplar</h3>

                <div className={Styles.inputContainer}>
                    <p>Nome do autor:</p>
                    <input
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        required
                    />
                </div>
                <div className={Styles.inputContainer}>
                    <p>Título do exemplar:</p>
                    <input
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div className={Styles.inputContainer}>
                    <p>Código do assunto:</p>
                    <input
                        value={assunto}
                        onChange={(e) => setAssunto(e.target.value)}
                        required
                    />
                </div>
                <div className={Styles.inputContainer}>
                    <p>Número de chamada:</p>
                    <input
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        required
                    />
                </div>
                <div className={Styles.inputContainer}>
                    <p>Acervo:</p>
                    <input
                        value={acervo}
                        onChange={(e) => setAcervo(e.target.value)}
                        required
                    />
                </div>
                <div className={Styles.inputContainer}>
                    <p>ISBN:</p>
                    <input
                        value={ISBN}
                        onChange={(e) => setISBN(e.target.value)}
                        required
                    />
                </div>
                <div className={Styles.inputContainer}>
                    <p>Quantidade:</p>
                    <input
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>
                <div className={Styles.inputContainer}>
                    <button className={Styles.inputButtonAtualizar} onClick={registrarExemplar}>Atualizar</button>
                </div>
            </div>
        </>
    );
}