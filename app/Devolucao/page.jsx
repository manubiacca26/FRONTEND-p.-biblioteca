"use client"; // Indica que este componente será renderizado no lado do cliente

import { useState } from "react"; // Importa useState para gerenciar estados
import Styles from '@/app/Devolucao/page.module.css'; // Importa os estilos CSS
import Link from "next/link"; // Importa o componente Link do Next.js para navegação
import Image from "next/image";

function Devolucao() {
    // Declaração dos estados usando useState para armazenar dados da devolução
    const [Exemplar, setExemplar] = useState(''); // Estado para o exemplar a ser devolvido
    const [livros, setLivros] = useState([]); // Estado para armazenar a lista de livros (exemplares)
    const [mensagemErroExemplar, setMensagemErroExemplar] = useState(''); // Estado para mensagens de erro relacionadas ao exemplar
    const [mensagemSucesso, setMensagemSucesso] = useState(''); // Estado para mensagens de sucesso

    // Função que impede a ação padrão do Enter no formulário
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede a ação padrão do Enter
        }
    };

    // Função para buscar um empréstimo pelo exemplar
    const buscarEmprestimo = async () => {
        // Verifica se o exemplar já está na lista
        const exemplarExistente = livros.find(livro => livro.Exemplar === Exemplar);
        if (exemplarExistente) {
            setMensagemErroExemplar('Exemplar já identificado'); // Mensagem de erro se o exemplar já estiver na lista
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            return; // Sai da função se o exemplar já estiver na lista
        }

        try {
            // Faz uma requisição para buscar o empréstimo do exemplar
            const response = await fetch(`http://localhost:3001/buscaremprestimo/${Exemplar}`, {
                method: 'GET',
            });

            if (response.ok) {
                const exemplarData = await response.json(); // Obtém os dados do exemplar
                setLivros(prevLivros => [...prevLivros, exemplarData]); // Adiciona o novo exemplar à lista
                setMensagemErroExemplar(''); // Limpa a mensagem de erro, se houver
            } else {
                const errorMessage = `Erro ao buscar exemplar: ${response.status}`; // Mensagem de erro se a busca falhar
                setMensagemErroExemplar(errorMessage);
                setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErroExemplar('Erro ao buscar exemplar: ' + error); // Captura e exibe erro de busca
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    // Função para limpar o exemplar atual
    const limparExemplar = () => {
        setExemplar(''); // Reseta o estado do exemplar
    };

    // Função para limpar todos os livros da lista
    const limparTodos = () => {
        setLivros([]); // Reseta a lista de livros
    };

    // Função para remover um exemplar da lista pelo índice
    const removerExemplar = (index) => {
        setLivros(prevLivros => prevLivros.filter((_, i) => i !== index)); // Remove o exemplar pelo índice
    };

    // Função para formatar a data no formato brasileiro
    const formatarData = (data) => {
        const dataComAjuste = new Date(new Date(data).setDate(new Date(data).getDate() + 1)); // Ajusta a data
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' }; // Define as opções de formatação
        return dataComAjuste.toLocaleDateString('pt-BR', options); // Retorna a data formatada
    };

    // Função para deletar um empréstimo
    const deletarEmprestimo = async (Exemplar) => {
        try {
            const response = await fetch(`http://localhost:3001/deletaremprestimo/${Exemplar}`, {
                method: 'DELETE', // Método DELETE para remover o empréstimo
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar o empréstimo: ' + response.status); // Lança erro se a resposta não for ok
            }
        } catch (error) {
            setMensagemErro('Erro ao deletar o empréstimo: ' + error); // Captura e exibe erro de deleção
            setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    // Função para devolver um exemplar
    const devolverExemplar = async (Exemplar, index) => {
        try {
            // Buscar o exemplar atual
            const response = await fetch(`http://localhost:3001/buscaracervo/${Exemplar}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar o exemplar: ' + response.status); // Lança erro se a resposta não for ok
            }

            const exemplarData = await response.json(); // Obtém os dados do exemplar

            // Atualizar apenas o campo Situacao
            const updatedData = {
                ...exemplarData,
                Situacao: 'Disponivel', // Atualiza a situação do exemplar para Disponivel
            };

            // Enviar a atualização para o servidor
            const updateResponse = await fetch(`http://localhost:3001/atualizaracervo/${Exemplar}`, {
                method: 'PUT', // Método PUT para atualizar o exemplar
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (updateResponse.ok) {
                // Deletar o empréstimo
                await deletarEmprestimo(Exemplar);
                // Remover o exemplar da lista
                removerExemplar(index);
                setMensagemSucesso('Devolução feita com sucesso!'); // Mensagem de sucesso
                setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem após 3 segundos
            } else {
                const errorMessage = `Erro ao realizar devolução`; // Mensagem de erro se a devolução falhar
                setMensagemErro(errorMessage);
                setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErro('Erro ao realizar devolução: ' + error); // Captura e exibe erro de devolução
            setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    // Função para devolver todos os exemplares
    const devolverTodosExemplares = async () => {
        try {
            for (let i = 0; i < livros.length; i++) {
                await devolverExemplar(livros[i].Exemplar, i); // Chama devolverExemplar para cada exemplar
            }
            setMensagemSucesso('Todos os exemplares devolvidos com sucesso!'); // Mensagem de sucesso
            setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem após 3 segundos
        } catch (error) {
            setMensagemErro('Erro ao devolver todos os exemplares: ' + error); // Captura e exibe erro de devolução
            setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    // Função para lid ar com a entrada de dados numéricos
    const handleNumericInput = (e, setValue) => {
        const value = e.target.value;
        // Filtra apenas números
        const numericValue = value.replace(/[^0-9]/g, '');
        setValue(numericValue);
    };

    // Renderização do componente
    return (
        // Fragmento para evitar a necessidade de um elemento pai
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

            {/* Formulário para buscar e devolver exemplares */}
            <form onKeyDown={handleKeyDown}>
                {/* Exibe mensagem de erro se houver */}
                {mensagemErroExemplar && (
                    <div className={Styles.notificacaoErro}>
                        {mensagemErroExemplar}
                    </div>
                )}
                {/* Exibe mensagem de sucesso se houver */}
                {mensagemSucesso && (
                    <div className={Styles.notificacao}>
                        {mensagemSucesso}
                    </div>
                )}

                {/* Campo para inserir o exemplar */}
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
                </div>

                {/* Botões para buscar e limpar */}
                <div className={Styles.bot}>
                    <button className={Styles.inputButton} type="button" onClick={buscarEmprestimo}>Buscar</button>
                    <button className={Styles.inputButton} type="button" onClick={limparExemplar}>Limpar</button>
                </div>

            </form>

            {/* Tabela para exibir os exemplares a devolver */}
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
                            {/* Mapeia os exemplares e exibe as informações */}
                            {livros.map((livro, index) => (
                                <tr key={index}>
                                    <td>{livro.Exemplar}</td>
                                    <td>{livro.RM}</td>
                                    <td>{livro.CPF}</td>
                                    <td>{formatarData(livro.dataEmprestimo)}</td>
                                    <td>{formatarData(livro.dataDevolucao)}</td>

                                    {/* Botão para devolver o exemplar */}
                                    <td className={Styles.ajuste}>
                                        <button
                                            className={Styles.devolveSolo}
                                            onClick={() => devolverExemplar(livro.Exemplar, index)}
                                        >
                                            Devolver
                                        </button>
                                    </td>
                                    {/* Botão para remover o exemplar */}
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

            {/* Botões para devolver todos os exemplares e limpar todos */}
            <button className={Styles.devolveTodos} onClick={async () => {
                await devolverTodosExemplares(Exemplar);
                limparTodos();
            }}>Devolver Todos</button>
            <button className={Styles.devolveTodos} onClick={limparTodos}>Limpar Todos</button>
        </>
    );
}

export default Devolucao;