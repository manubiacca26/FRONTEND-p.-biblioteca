'use client';

import { useState, useEffect } from "react";
import Styles from '@/app/Emprestimo/page.module.css';

export default function Emprestimo() {
    const [Exemplar, setExemplar] = useState('');
    const [dataEmprestimo, setDataEmprestimo] = useState('');
    const [RM, setRM] = useState('');


    useEffect(() => {

    }, []);


    const createEmprestimo = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/emprestar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Exemplar, RM, titulo }),
            });

            if (response.ok) {
                // Emprestimo criado com sucesso!
                console.log('Empréstimo criado com sucesso!');
                // Faça algo aqui, como exibir uma mensagem de sucesso
            } else {
                console.error('Erro ao criar empréstimo:', response.status);
                // Lidar com o erro, talvez exibindo uma mensagem de erro
            }
        } catch (error) {
            console.error('Erro ao criar empréstimo:', error);
            // Lidar com o erro, talvez exibindo uma mensagem de erro
        }
    };

    const buscarAluno = async () => {
        try {
            const response = await fetch(`http://localhost:3001/alunos/${RM}`);
            if (response.ok) {
                const alunoData = await response.json();
                setAluno(alunoData); // Use a variável aluno
                setNomeAluno(alunoData.nome); // Supondo que o nome do aluno esteja em aluno.nome
            } else {
                console.error('Erro ao buscar aluno:', response.status);
            }
        } catch (error) {
            console.error('Erro ao buscar aluno:', error);
        }
    };

    const buscarExemplar = async () => {
        try {
            const response = await fetch(`http://localhost:3001/buscaracervo/${Exemplar}`);
            if (response.ok) {
                const ExemplarData = await response.json(); 
               setExemplar(ExemplarData.Exemplar); // Use a variável Exemplar
            } else {
                console.error('Erro ao buscar Exemplar:', response.status);
            }
        } catch (error) {
            console.error('Erro ao buscar Exemplar:', error);
        }
    };


    return (
        <>
            <foRM onSubmit={createEmprestimo}>


                <div className={Styles.div1}>

                    <label className={Styles.foRM}>
                        CPF/RM/RA:
                        <input
                            className={Styles.inputBox}
                            type="text"
                            placeholder="RM"
                            value={RM}
                            onChange={(e) => setRM(e.target.value)}
                        />
                    </label>

                    <button type="button" onClick={buscarAluno}>Buscar</button>

                    <button type="button" onClick={() => setRM('')}>Limpar</button>

                </div>


                <div className={Styles.aluno}>
                    INFORMAÇÕES DA PESSOA:

                    <ul className={Styles.userList}>
                        {RM && (
                            <li>
                                {RM.Nome} - {aluno.email} - {aluno.Data_Nascimento}
                            </li>
                        )}
                    </ul>
                </div>



                <div className={Styles.div1}>



                    <label className={Styles.foRM}>
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
                    INFORMAÇÕES SOBRE O Exemplar:

                    <ul className={Styles.userList}>
                        {Exemplar && (
                            <li>
                                {Exemplar.Autor} - {Exemplar.Título} - {Exemplar.Assunto}
                            </li>
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

            </foRM>
        </>
    )
} 