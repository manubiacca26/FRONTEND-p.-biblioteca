"use client";

import { useState } from "react";
import Styles from '@/app/Devolucao/page.module.css';

function Devolucao() {
    const [Exemplar, setExemplar] = useState('');
    const [livros, setLivros] = useState([]); // Mudei para um array
    const [mensagemErroExemplar, setMensagemErroExemplar] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    const buscarEmprestimo = async () => {
        try {
            const response = await fetch(`http://localhost:3001/buscaremprestimo/${Exemplar}`, {
                method: 'GET',
            });

            if (response.ok) {
                const exemplarData = await response.json();
                setLivros(prevLivros => [...prevLivros, exemplarData]); // Adiciona o novo exemplar à lista
                setMensagemErroExemplar(''); // Limpa a mensagem de erro, se houver
            } else {
                const errorMessage = `Erro ao buscar exemplar: ${response.status}`;
                setMensagemErroExemplar(errorMessage);
                setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErroExemplar('Erro ao buscar exemplar: ' + error);
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    const limparExemplar = () => {
        setLivros([]); // Limpa todos os exemplares
        setExemplar('');
    };

    const removerExemplar = (index) => {
        setLivros(prevLivros => prevLivros.filter((_, i) => i !== index)); // Remove o exemplar pelo índice
    };

    // Função para formatar a data no formato brasileiro
    const formatarData = (data) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(data).toLocaleDateString('pt-BR', options);
    };

    const devolverExemplar = async (Exemplar) => {
        try {
            // Buscar o exemplar atual
            const response = await fetch(`http://localhost:3001/buscaracervo/${Exemplar}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar o exemplar: ' + response.status);
            }

            const exemplarData = await response.json();

            // Atualizar apenas o campo Situacao
            const updatedData = {
                ...exemplarData,
                Situacao: 'Disponivel',
                // Inclua outros campos que você deseja preservar
            };

            // Enviar a atualização para o servidor
            const updateResponse = await fetch(`http://localhost:3001/atualizaracervo/${Exemplar}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (updateResponse.ok) {
                setMensagemSucesso('Devolução feita com sucesso!');
                setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem após 3 segundos

            } else {
                const errorMessage = `Erro ao realizar devolução`;
                setMensagemErro(errorMessage);
                setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErro('Erro ao realizar devolução: ' + error);
            setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

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

                <div className={Styles.box1}>

                    <label className={Styles.form}>

                        <input
                            className={Styles.inputBox}
                            type="text"
                            placeholder="Exemplar"
                            onChange={(e) => setExemplar(e.target.value)}
                            value={Exemplar}
                            required
                        />
                    </label>


                </div>

                <div className={Styles.bot}>
                    <button className={Styles.inputButton} type="button" onClick={buscarEmprestimo}>Buscar</button>
                    <button className={Styles.inputButton} type="button" onClick={limparExemplar}>Limpar</button>
                </div>

            </form>

            <div className={Styles.container}>
                <div className={Styles.agruparLista}>
                    <h3>Exemplares a Devolver:</h3>
                    <table className={Styles.userTable}>
                        <thead>
                            <tr>
                                <th>Exemplar</th>
                                <th>RM</th>
                                <th>CPF</th>
                                <th>Data Emprestimo</th>
                                <th>Data Devolução</th>
                                <th>Devolver Unidade</th>
                                <th>Remover</th>

                            </tr>
                        </thead>
                        <tbody>
                            {livros.map((livro, index) => (
                                <tr key={index}>
                                    <td>{livro.Exemplar}</td>
                                    <td>{livro.RM}</td>
                                    <td>{livro.CPF}</td>
                                    <td>{formatarData(livro.dataEmprestimo)}</td>
                                    <td>{formatarData(livro.dataDevolucao)}</td>

                                    <td className={Styles.ajuste}>
                                        <button
                                            className={Styles.devolveSolo}
                                            onClick={() => devolverExemplar(livro.Exemplar)}
                                        >
                                            Devolver
                                        </button>
                                        </td>
                                        <td>
                                        <button
                                            className={Styles.removerButton}
                                            onClick={() => removerExemplar(index)}
                                        >
                                            X
                                        </button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button className={Styles.devolveTodos} onClick={() => devolverExemplar(Exemplar)}>Devolver Todos</button>
        </>
    );
}

export default Devolucao;