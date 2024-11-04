'use client'; // Indica que este componente será renderizado no lado do cliente

import { useState, useEffect } from "react"; // Importa hooks do React
import Styles from '@/app/Emprestimo/page.module.css'; // Importa os estilos CSS
import Link from "next/link"; // Importa o componente Link do Next.js para navegação
import Image from "next/image";

export default function Emprestimo() {
    // Declaração dos estados usando useState
    const [Exemplar, setExemplar] = useState(''); // Estado para armazenar o exemplar
    const [RM, setRM] = useState(''); // Estado para armazenar o RM do aluno
    const [aluno, setAluno] = useState(null); // Estado para armazenar os dados do aluno
    const [livros, setLivros] = useState(null); // Estado para armazenar os dados do exemplar
    const [mensagemSucesso, setMensagemSucesso] = useState(''); // Estado para mensagens de sucesso
    const [mensagemErro, setMensagemErro] = useState(''); // Estado para mensagens de erro
    const [mensagemErroAluno, setMensagemErroAluno] = useState(''); // Estado para mensagens de erro do aluno
    const [mensagemErroExemplar, setMensagemErroExemplar] = useState(''); // Estado para mensagens de erro do exemplar

    // Função para formatar a data no formato brasileiro
    const formatarData = (data) => {
        const dataObj = new Date(data);
        dataObj.setDate(dataObj.getDate() + 1); // Adiciona um dia
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return dataObj.toLocaleDateString('pt-BR', options); // Retorna a data formatada
    };

    // Função para criar uma reserva
    const createReserva = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário

        // Verifica se o exemplar está emprestado
        if (livros && livros.Situacao === 'Emprestado') {
            // Atualiza a coluna Reserva para 'Reservado'
            const requestBody = {
                Exemplar: Exemplar,
                RM: RM || null,
                Reserva: 'Reservado' // Adiciona a coluna Reserva
            };

            try {
                const response = await fetch('http://localhost:3001/reservar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody), // Envia os dados da reserva
                });

                if (response.ok) {
                    // Atualiza o estado local para refletir a nova situação
                    setLivros(prevLivros => ({
                        ...prevLivros,
                        Situacao: 'Emprestado' // Atualiza a situação para 'Emprestado'
                    }));

                    setMensagemSucesso('Reserva criada com sucesso!'); // Mensagem de sucesso
                    setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem após 3 segundos
                } else {
                    const errorMessage = `Erro ao criar reserva, dados inválidos`; // Mensagem de erro
                    setMensagemErro(errorMessage);
                    setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
                }
            } catch (error) {
                setMensagemErro('Erro ao criar reserva: ' + error); // Captura e exibe erro
                setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
            return; // Impede a criação do empréstimo
        }

        // Se não estiver emprestado, mostra mensagem de erro
        setMensagemErro('O exemplar não está emprestado. Não é possível criar a reserva.');
        setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
    };

    // Função para buscar os dados do aluno
    const buscarAluno = async () => {
        try {
            const response = await fetch(`http://localhost:3001/alunos/${RM}`);
            if (response.ok) {
                const alunoData = await response.json(); // Obtém os dados do aluno
                setAluno(alunoData); // Atualiza o estado do aluno
                setMensagemErroAluno(''); // Limpa a mensagem de erro, se houver
            } else {
                const errorMessage = `Erro ao buscar aluno: ${response.status}`; // Mensagem de erro
                setMensagemErroAluno(errorMessage);
                setTimeout (() => setMensagemErroAluno(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErroAluno('Erro ao buscar aluno: ' + error); // Captura e exibe erro
            setTimeout(() => setMensagemErroAluno(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    // Função para buscar os dados do exemplar
    const buscarExemplar = async () => {
        try {
            const response = await fetch(`http://localhost:3001/buscaracervo/${Exemplar}`);
            if (response.ok) {
                const exemplarData = await response.json(); // Obtém os dados do exemplar
                setLivros(exemplarData); // Atualiza o estado do exemplar
                setMensagemErroExemplar(''); // Limpa a mensagem de erro, se houver
            } else {
                const errorMessage = `Erro ao buscar Exemplar: ${response.status}`; // Mensagem de erro
                setMensagemErroExemplar(errorMessage);
                setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErroExemplar('Erro ao buscar Exemplar: ' + error); // Captura e exibe erro
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    // Função para limpar as credenciais do aluno
    const limparCredenciais = () => {
        setRM('');
        setAluno(null);
    };

    // Função para limpar as informações do exemplar
    const limparExemplar = () => {
        setLivros('');
        setExemplar('');
    };

    // Função para lidar com a tecla Enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede a ação padrão do Enter
        }
    };

    // Função para lidar com a entrada de dados numéricos
    const handleNumericInput = (e, setValue) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9]/g, ''); // Filtra apenas números
        setValue(numericValue);
    };

    // Renderização do componente
    return (
        <form onKeyDown={handleKeyDown}>
            {mensagemSucesso && (
                <div className={Styles.notificacao}>
                    {mensagemSucesso}
                </div>
            )}
            {mensagemErro && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErro}
                </div>
            )}
            {mensagemErroAluno && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErroAluno}
                </div>
            )}
            {mensagemErroExemplar && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErroExemplar}
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

            <div className={Styles.divBusca}>
                <div className={Styles.divInput}>
                    <input
                        className={Styles.inputBox}
                        type="text"
                        placeholder="RM"
                        value={RM}
                        onChange={(e) => handleNumericInput(e, setRM)}
                        required
                    />

                </div>
                <button className={Styles.inputButton} type="button" onClick={buscarAluno}>Buscar</button>
                <button className={Styles.inputButton} type="button" onClick={limparCredenciais}>Limpar</button>
            </div>

            <div className={Styles.infoAlunoColabExem}>
                <div className={Styles.agruparLista}>
                    <h3>Informações leitor</h3>
                    <table className={Styles.userTable}>
                        <thead>
                            <tr>
                                <th>Campo</th>
                                <th>Credencial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aluno && (
                                <>
                                    <tr>
                                        <td>Nome</td>
                                        <td>{aluno.Nome}</td>
                                    </tr>
                                    <tr>
                                        <td>RM</td>
                                        <td>{aluno.RM}</td>
                                    </tr>
                                    <tr>
                                        <td>Sexo</td>
                                        <td>{aluno.Sexo}</td>
                                    </tr>
                                    <tr>
                                        <td>Data Nascimento</td>
                                        <td>{formatarData(aluno.Data_Nascimento)}</td >
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={Styles.divBusca}>
                <div className={Styles.divInput}>
                    <input
                        className={Styles.inputBox}
                        type="text"
                        placeholder="Exemplar"
                        value={Exemplar}
                        onChange={(e) => handleNumericInput(e, setExemplar)}
                    />
                </div>
                <button className={Styles.inputButton} type="button" onClick={buscarExemplar}>Buscar</button>
                <button className={Styles.inputButton} type="button" onClick={limparExemplar}>Limpar</button>
            </div>

            <div className={Styles.infoAlunoColabExem}>
                <div className={Styles.agruparLista}>
                    <h3>Informações sobre o exemplar</h3>
                    <table className={Styles.userTable}>
                        <thead>
                            <tr>
                                <th>Campo</th>
                                <th>Credencial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros && (
                                <>
                                    <tr>
                                        <td>Exemplar</td>
                                        <td>{livros.Exemplar}</td>
                                    </tr>
                                    <tr>
                                        <td>Número de Chamada</td>
                                        <td>{livros.nChamada}</td>
                                    </tr>
                                    <tr>
                                        <td>Assunto</td>
                                        <td>{livros.Assunto}</td>
                                    </tr>
                                    <tr>
                                        <td>ISBN</td>
                                        <td>{livros.ISBN}</td>
                                    </tr>
                                    <tr>
                                        <td>Título</td>
                                        <td>{livros.Título}</td>
                                    </tr>
                                    <tr>
                                        <td>Autor</td>
                                        <td>{livros.Autor}</td>
                                    </tr>
                                    <tr>
                                        <td>Acervo</td>
                                        <td>{livros.Acervo}</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={Styles.divCreate}>
                <button className={Styles.inputButton} onClick={createReserva} type="submit">Reservar</button>
            </div>

        </form>
    );
}