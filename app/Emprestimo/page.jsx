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
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemErroAluno, setMensagemErroAluno] = useState('');
    const [mensagemErroExemplar, setMensagemErroExemplar] = useState('');
    const [mensagemErroColaborador, setMensagemErroColaborador] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDataEmprestimo(today);
    }, []);

    const formatarData = (data) => {
        const dataObj = new Date(data);
        dataObj.setDate(dataObj.getDate() + 1); // Adiciona um dia
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return dataObj.toLocaleDateString('pt-BR', options);
    };

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
                setMensagemSucesso('Empréstimo criado com sucesso!');
                setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem após 3 segundos

            } else {
                const errorMessage = `Erro ao criar empréstimo, dados inválidos`;
                setMensagemErro(errorMessage);
                setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErro('Erro ao criar empréstimo: ' + error);
            setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
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
                    setMensagemErroAluno(''); // Limpa a mensagem de erro, se houver
                } else {
                    const errorMessage = `Erro ao buscar aluno: ${response.status}`;
                    setMensagemErroAluno(errorMessage);
                    setTimeout(() => setMensagemErroAluno(''), 3000); // Limpa a mensagem de erro após 3 segundos
                }
            } catch (error) {
                setMensagemErroAluno('Erro ao buscar aluno: ' + error);
                setTimeout(() => setMensagemErroAluno(''), 3000); // Limpa a mensagem de erro após 3 segundos
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
                    setMensagemErroColaborador(''); // Limpa a mensagem de erro, se houver
                } else {
                    const errorMessage = `Erro ao buscar Colaborador: ${response.status}`;
                    setMensagemErroColaborador(errorMessage);
                    setTimeout(() => setMensagemErroColaborador(''), 3000); // Limpa a mensagem de erro após 3 segundos
                }
            } catch (error) {
                setMensagemErroColaborador('Erro ao buscar Colaborador: ' + error);
                setTimeout(() => setMensagemErroColaborador(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        }
    };

    const buscarExemplar = async () => {
        try {
            const response = await fetch(`http://localhost:3001/buscaracervo/${Exemplar}`);
            if (response.ok) {
                const exemplarData = await response.json();
                setLivros(exemplarData);
                setMensagemErroExemplar(''); // Limpa a mensagem de erro, se houver
            } else {
                const errorMessage = `Erro ao buscar Exemplar: ${response.status}`;
                setMensagemErroExemplar(errorMessage);
                setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErroExemplar('Erro ao buscar Exemplar: ' + error);
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
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
        setExemplar('');
    };


    return (
        <form onSubmit={createEmprestimo}>
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
            {mensagemErroColaborador && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErroColaborador}
                </div>
            )}
            <div className={Styles.divBusca}>
                <div className={Styles.divInput}>
                    <input
                        className={Styles.inputBox}
                        type="text"
                        placeholder="RM"
                        value={RM}
                        onChange={(e) => setRM(e.target.value)}
                        disabled={isCPFDisabled}
                        required
                    />
                    <input
                        className={Styles.inputBox}
                        type="text"
                        placeholder="CPF"
                        value={CPF}
                        onChange={(e) => setCPF(e.target.value)}
                        disabled={isRMDisabled}
                        required

                    />
                </div>
                <button className={Styles.inputButton} type="button" onClick={() => { buscarAluno(); buscarColaborador(); }}>Buscar</button>
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
                                        <td>{formatarData(aluno.Data_Nascimento)}</td>
                                    </tr>
                                </>
                            )}
                            {colaborador && (
                                <>
                                    <tr>
                                        <td>CPF</td>
                                        <td>{colaborador.cpf}</td>
                                    </tr>
                                    <tr>
                                        <td>Nome</td>
                                        <td>{colaborador.nome}</td>
                                    </tr>
                                    <tr>
                                        <td>Sexo</td>
                                        <td>{colaborador.Sexo}</td>
                                    </tr>
                                    <tr>
                                        <td>Telefone</td>
                                        <td>{colaborador.telefone}</td>
                                    </tr>
                                    <tr>
                                        <td>Data Nascimento</td>
                                        <td>{colaborador.dataNasc}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{colaborador.email}</td>
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
                        onChange={(e) => setExemplar(e.target.value)}
                    />
                </div>
                <button className={Styles.inputButton} type="button" onClick={() => { buscarExemplar() }}>Buscar</button>
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

            <div className={Styles.divDate}>

                <input
                    className={Styles.inputBox}
                    type="date"
                    value={dataEmprestimo}
                    onChange={(e) => setDataEmprestimo(e.target.value)}
                    required
                />

            </div>


            <div className={Styles.divCreate}>
                <button className={Styles.inputButton} type="submit">Criar Empréstimo</button>
            </div>

        </form>
    );
}
