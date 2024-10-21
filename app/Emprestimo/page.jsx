'use client';

import { useState, useEffect } from "react";
import Styles from '@/app/Emprestimo/page.module.css';

export default function Emprestimo() {
    const [Exemplar, setExemplar] = useState('');
    const [dataEmprestimo, setDataEmprestimo] = useState('');
    const [RM, setRM] = useState('');
    const [CPF, setCPF] = useState('');
    const [aluno, setAluno] = useState(null); // Para armazenar os dados do aluno
    const [colaborador, setColaborador] = useState(''); // Para armazenar o nome do aluno

    useEffect(() => {
        // Define a data de empréstimo como a data atual ao carregar o componente
        const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
        setDataEmprestimo(today);
    }, []);

    const calcularDataDevolucao = (data) => {
        const emprestimoDate = new Date(data);
        emprestimoDate.setDate(emprestimoDate.getDate() + 30); // Adiciona 30 dias
        return emprestimoDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    };

    const createEmprestimo = async (e) => {
        e.preventDefault();

        const requestBody = {
            Exemplar,
            RM: RM.length > 0 ? RM : null, // Se RM estiver vazio, envia null
            CPF: CPF.length > 0 ? CPF : null, // Se CPF estiver vazio, envia null
            dataEmprestimo: dataEmprestimo.length > 0 ? dataEmprestimo : null, // Se dataEmprestimo estiver vazio, envia null
            dataDevolucao: calcularDataDevolucao(dataEmprestimo) // Calcula a data de devolução com base na dataEmprestimo
        };

        try {
            const response = await fetch('http://localhost:3001/emprestar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                console.log('Empréstimo criado com sucesso!');
            } else {
                console.error('Erro ao criar empréstimo:', response.status);
            }
        } catch (error) {
            console.error('Erro ao criar empréstimo:', error);
        }
    };

    const isRMDisabled = RM.length > 0;
    const isCPFDisabled = CPF.length > 0;

    const buscar = async () => {
        if (isRMDisabled) {
            try {
                const response = await fetch(`http://localhost:3001/alunos/${RM}`);
                if (response.ok) {
                    const alunoData = await response.json();
                    setAluno(alunoData); // Armazena os dados do aluno

                } else {
                    console.error('Erro ao buscar aluno:', response.status);
                }
            } catch (error) {
                console.error('Erro ao buscar aluno:', error);
            }
        };
        if (isCPFDisabled) {
            try {
                const response = await fetch(`http://localhost:3001/listarcolaborador/${CPF}`);
                if (response.ok) {
                    const colaboradorData = await response.json();
                    setColaborador(colaboradorData); // Armazena os dados do aluno

                } else {
                    console.error('Erro ao buscar Colaborador:', response.status);
                }
            } catch (error) {
                console.error('Erro ao buscar Colaborador:', error);
            }
        };
    }

    const buscarExemplar = async () => {
        try {
            const response = await fetch(`http://localhost:3001/buscaracervo/${Exemplar}`);
            if (response.ok) {
                const exemplarData = await response.json();
                setExemplar(exemplarData); // Use a variável Exemplar
            } else {
                console.error('Erro ao buscar Exemplar:', response.status);
            }
        } catch (error) {
            console.error('Erro ao buscar Exemplar:', error);
        }
    };

    return (
        <>
            <form onSubmit={createEmprestimo}>
                <div className={Styles.div1}>
                    <label className={Styles.form}>
                        CPF/RM:
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
                    </label>

                    <button type="button" onClick={buscar}>Buscar</button>
                    <button type="button" onClick={() => { setRM(''); setCPF(''); }}>Limpar</button>
                </div>

                <div className={Styles.aluno}>
                    INFORMAÇÕES DA PESSOA:
                    <ul className={Styles.userList}>
                        {aluno && (
                            <>
                                <li>Nome: {aluno.Nome}</li>
                                <li>RM: {aluno.RM}</li>
                                <li>Sexo: {aluno.Sexo}</li>
                                <li>Data Nascimento: {aluno.Data_Nascimento}</li>


                                {/* Adicione mais informações conforme necessário */}
                            </>
                        )}
                        {colaborador && (
                            <>
                                <li>CPF: {colaborador.cpf}</li>
                                <li>Nome: {colaborador.nome}</li>
                                <li>Sexo: {colaborador.Sexo}</li>
                            </>
                        )}
                    </ul>
                </div>

                <div className={Styles.div1}>
                    <label className={Styles.form}>
                        Exemplar:
                        <input
                            className={Styles.inputBox}
                            type="text"
                            placeholder="Exemplar"
                            value={Exemplar}
                            onChange={(e) => setExemplar(e.target.value)}
                        />
                    </label>

                    <button type="button" onClick={buscarExemplar}>Buscar</button>
                    <button type="button" onClick={() => setExemplar('')}>Limpar</button>
                </div>

                <div className={Styles.aluno}>
                    INFORMAÇÕES SOBRE O EXEPLAR:
                    <ul className={Styles.userList}>
                    {Exemplar && (
                            <>
                                <li>Autor: {Exemplar.Autor}</li>
                                <li>Título: {Exemplar.Título}</li>
                                <li>Assunto: {Exemplar.Assunto}</li>
                            </>
                        )}
                    </ul>
                </div>

                <div className={Styles.button}>
                    <input
                        className={Styles.inputBox}
                        type="date"
                        value={dataEmprestimo}
                        onChange={(e) => setDataEmprestimo(e.target.value)}
                    />
                </div>


                <button type="submit">Criar Emprestimo</button>

            </form>
        </>
    )
} 