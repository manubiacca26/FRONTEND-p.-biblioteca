'use client';

import { useState, useEffect } from "react";
import Styles from '@/app/Emprestimo/page.module.css';

export default function Emprestimo() {
    const [Exemplar, setExemplar] = useState('');
    const [dataEmprestimo, setDataEmprestimo] = useState('');
    const [RM, setRM] = useState('');
    const [CPF, setCPF] = useState('');
    const [aluno, setAluno] = useState(null);
    const [livros, setLivros] = useState(null);
    const [colaborador, setColaborador] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDataEmprestimo(today);
    }, []);

    const calcularDataDevolucao = (data) => {
        const emprestimoDate = new Date(data);
        emprestimoDate.setDate(emprestimoDate.getDate() + 30);
        return emprestimoDate.toISOString().split('T')[0];
    };

    const createEmprestimo = async (e) => {
        e.preventDefault();

        const requestBody = {
            Exemplar: Exemplar,
            RM: RM || null,
            CPF: CPF || null,
            dataEmprestimo: dataEmprestimo,
            dataDevolucao: calcularDataDevolucao(dataEmprestimo),
        };

        try {
            const response = await fetch('http://localhost:3001/emprestar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                alert('Empréstimo criado com sucesso!');
                await atualizarSituacaoLivro(Exemplar);
            } else {
                alert('Erro ao criar empréstimo: ' + response.status);
            }
        } catch (error) {
            alert('Erro ao criar empréstimo: ' + error);
        }
    };

    // Função para atualizar a situação do livro
    const atualizarSituacaoLivro = async (Exemplar) => {
        try {
            // Buscar o exemplar atual
            const response = await fetch(`http://localhost:3001/buscaracervo/${Exemplar}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar o exemplar: ' + response.status);
            }

            const exemplarData = await response.json();
            console.log('Dados do exemplar:', exemplarData);

            // Atualizar apenas o campo Situacao
            const updatedData = {
                Exemplar: exemplarData.Exemplar,
                nChamada: exemplarData.nChamada,
                Assunto: exemplarData.Assunto,
                ISBN: exemplarData.ISBN,
                Quantidade: exemplarData.Quantidade,
                Título: exemplarData.Título,
                Autor: exemplarData.Autor,
                Acervo: exemplarData.Acervo,
                Situacao: 'Emprestado',
                // Inclua outros campos que você deseja preservar
            };

            // Enviar a atualização para o servidor
            const updateResponse = await fetch(`http://localhost:3001/atualizaracervo/${Exemplar}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (updateResponse.ok) {
                console.log('Situação do livro atualizada para "emprestado" com sucesso!');
            } else {
                alert('Erro ao atualizar a situação do livro: ' + updateResponse.status);
            }
        } catch (error) {
            alert('Erro ao atualizar a situação do livro: ' + error);
        }
    };



    const isRMDisabled = RM.length > 0;
    const isCPFDisabled = CPF.length > 0;

    const buscarAluno = async () => {
        if (isRMDisabled) {
            setColaborador(null);
            try {
                const response = await fetch(`http://localhost:3001/alunos/${RM}`);
                if (response.ok) {
                    const alunoData = await response.json();
                    setAluno(alunoData);
                } else {
                    alert('Erro ao buscar aluno: ' + response.status);
                }
            } catch (error) {
                alert('Erro ao buscar aluno: ' + error);
            }
        }
    };

    const buscarColaborador = async () => {
        if (isCPFDisabled) {
            setAluno(null);
            try {
                const response = await fetch(`http://localhost:3001/listarcolaborador/${CPF}`);
                if (response.ok) {
                    const colaboradorData = await response.json();
                    setColaborador(colaboradorData);
                } else {
                    alert('Erro ao buscar Colaborador: ' + response.status);
                }
            } catch (error) {
                alert('Erro ao buscar Colaborador: ' + error);
            }
        }
    };

    const buscarExemplar = async () => {
        try {
            const response = await fetch(`http://localhost:3001/buscaracervo/${Exemplar}`);
            if (response.ok) {
                const exemplarData = await response.json();
                setLivros(exemplarData);
            } else {
                alert('Erro ao buscar Exemplar: ' + response.status);
            }
        } catch (error) {
            alert('Erro ao buscar Exemplar: ' + error);
        }
    };

    const limparCredenciais = () => {
        setRM('');
        setCPF('');
        setAluno(null);
        setColaborador(null);
    };

    const limparExemplar = () => {
        setLivros('');
    };


    return (
        <form onSubmit={createEmprestimo}>
            <div className={Styles.divBusca}>
                <div className={Styles.divInput}>
                    <input
                        className={Styles.inputBox}
                        type="text"
                        placeholder="RM"
                        value={RM}
                        onChange={(e) => setRM(e.target.value)}
                        disabled={isCPFDisabled}
                    />
                    <input
                        className={Styles.inputBox}
                        type="text"
                        placeholder="CPF"
                        value={CPF}
                        onChange={(e) => setCPF(e.target.value)}
                        disabled={isRMDisabled}
                    />
                </div>
                <button type="button" onClick={() => { buscarAluno(); buscarColaborador(); }}>Buscar</button>
                <button type="button" onClick={limparCredenciais}>Limpar</button>
            </div>

            <div className={Styles.infoAlunoColabExem}>
                <div className={Styles.agruparLista}>
                    <p>INFORMAÇÕES DA PESSOA:</p>
                    <ul className={Styles.userList}>

                        {aluno && (
                            <>
                                <li>Nome: {aluno.Nome}</li>
                                <li>RM: {aluno.RM}</li>
                                <li>Sexo: {aluno.Sexo}</li>
                                <li>Data Nascimento: {aluno.Data_Nascimento}</li>
                            </>
                        )}
                        {colaborador && (
                            <>
                                <li>CPF: {colaborador.cpf}</li>
                                <li>Nome: {colaborador.nome}</li>
                                <li>Sexo: {colaborador.Sexo}</li>
                                <li>Telefone: {colaborador.telefone}</li>
                                <li>Data Nascimento: {colaborador.dataNasc}</li>
                                <li>Email: {colaborador.email}</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <div className={Styles.divBusca}>
                <div className={Styles.divInput}>
                    <input
                        className={Styles.inputBox}
                        type="text"
                        placeholder="Exemplar"
                        value={Exemplar}
                        onChange={(e) => setExemplar(e.target.value)}
                    />
                </div>
                <button type="button" onClick={() => { buscarExemplar() }}>Buscar</button>
                <button type="button" onClick={limparExemplar}>Limpar</button>
            </div>

            <div className={Styles.infoAlunoColabExem}>
                <div className={Styles.agruparLista}>
                    <p>INFORMAÇÕES SOBRE O EXEMPLAR:</p>
                    <ul className={Styles.userList}>
                        {livros && (
                            <>
                                <li>Exemplar: {livros.Exemplar}</li>
                                <li>Número de Chamada: {livros.nChamada}</li>
                                <li>Assunto: {livros.Assunto}</li>
                                <li>ISBN: {livros.ISBN}</li>
                                <li>Quantidade: {livros.Quantidade}</li>
                                <li>Título: {livros.Título}</li>
                                <li>Autor: {livros.Autor}</li>
                                <li>Acervo: {livros.Acervo}</li>
                                <li>Situação: {livros.Situacao}</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <div className={Styles.divDate}>

                <input
                    className={Styles.inputBox}
                    type="date"
                    value={dataEmprestimo}
                    onChange={(e) => setDataEmprestimo(e.target.value)}
                />

            </div>


            <div className={Styles.divCreate}>
                <button type="submit">Criar Empréstimo</button>
            </div>

        </form>
    );
}
