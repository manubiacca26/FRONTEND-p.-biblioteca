"use client"; // Indica que este componente será renderizado no lado do cliente

import { useState, useEffect } from "react"; // Importa useState e useEffect do React
import Styles from '@/app/Notificacao/page.module.css'; // Importa os estilos CSS
import Link from "next/link"; // Importa o componente Link do Next.js para navegação
import Image from "next/image";

function Notificacao() {
    // Declaração dos estados usando useState
    const [livros, setLivros] = useState([]); // Estado para armazenar todos os livros (empréstimos)
    const [exemplaresAtrasados, setExemplaresAtrasados] = useState([]); // Estado para armazenar os exemplares atrasados

    // Função para buscar empréstimos do servidor
    const buscarEmprestimos = async () => {
        try {
            const response = await fetch(`http://localhost:3001/todosemprestimos`, { method: 'GET' });

            if (response.ok) {
                const exemplarData = await response.json(); // Obtém os dados dos empréstimos
                setLivros(prevLivros => [...prevLivros, ...exemplarData]); // Adiciona os empréstimos ao estado
                verificarAtrasos(exemplarData); // Verifica os atrasos após buscar os empréstimos
            } else {
                console.error("Erro ao buscar empréstimos:", response.status); // Exibe erro no console se a resposta não for ok
            }
        } catch (error) {
            console.error("Erro ao buscar empréstimos:", error); // Exibe erro no console se ocorrer um erro durante a requisição
        }
    };

    // Função para verificar se há exemplares atrasados
    const verificarAtrasos = (emprestimos) => {
        const hoje = new Date(); // Obtém a data atual
        const atrasados = emprestimos.filter(livro => {
            const dataDevolucao = new Date(livro.dataDevolucao); // Converte a data de devolução em objeto Date
            return dataDevolucao < hoje; // Verifica se a data de devolução é anterior a hoje
        });
        setExemplaresAtrasados(atrasados); // Atualiza o estado com os exemplares atrasados
    };

    // Função para converter string de data em objeto Date
    const converterData = (dataStr) => {
        const data = new Date(dataStr); // Converte a string de data em objeto Date
        return !isNaN(data.getTime()) ? data : null; // Verifica se a data é válida
    };

    // Função para ajustar a data adicionando um dia
    const ajustarData = (data) => {
        const novaData = new Date(data); // Cria uma nova data a partir da data recebida
        novaData.setDate(novaData.getDate() + 1); // Adiciona um dia (24 horas)
        return novaData; // Retorna a nova data
    };

    // Usar useEffect para buscar os empréstimos e verificar atrasos quando o componente é montado
    useEffect(() => {
        buscarEmprestimos(); // Chama a função para buscar os empréstimos
    }, []); // O array vazio significa que isso só será executado uma vez, quando o componente for montado

    return (
        <>
            {/* Link para voltar à página inicial */}
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
            {/* Container para exibir os exemplares atrasados */}
            <div className={Styles.container}>
                <h3>Exemplares Atrasados</h3>
                <table className={Styles.userTable}>
                    <thead>
                        <tr>
                            <th>Exemplar</th>
                            <th>RM</th>
                            <th>CPF</th>
                            <th>Data Emprestimo</th>
                            <th>Data Devolução</th>
                            <th>Dias de Atraso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exemplaresAtrasados.length > 0 ? (
                            exemplaresAtrasados.map((livro, index) => {
                                // Converte e ajusta as datas
                                const dataEmprestimo = ajustarData(converterData(livro.dataEmprestimo)) || 'Data inválida';
                                const dataDevolucao = ajustarData(converterData(livro.dataDevolucao)) || 'Data inválida';

                                // Formata as datas para o padrão brasileiro
                                const dataEmprestimoFormatada = dataEmprestimo instanceof Date && ! isNaN(dataEmprestimo)
                                    ? dataEmprestimo.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                                    : dataEmprestimo;

                                const dataDevolucaoFormatada = dataDevolucao instanceof Date && !isNaN(dataDevolucao)
                                    ? dataDevolucao.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                                    : dataDevolucao;

                                // Calcular os dias de atraso
                                const hoje = new Date();
                                const diasAtraso = Math.floor((hoje - dataDevolucao) / (1000 * 60 * 60 * 24)); // Diferença em dias

                                return (
                                    <tr key={index}>
                                        <td>{livro.Exemplar}</td>
                                        <td>{livro.RM}</td>
                                        <td>{livro.CPF}</td>
                                        <td>{dataEmprestimoFormatada}</td>
                                        <td>{dataDevolucaoFormatada}</td>
                                        <td>{diasAtraso > 0 ? diasAtraso : 0}</td> {/* Mostra os dias de atraso */}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6">Nenhum exemplar em atraso.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Notificacao;