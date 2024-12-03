"use client"

import { useState } from "react";
import Styles from '@/app/ConsultarTitulo/page.module.css'

function Devolucao() {
    const [título, settítulo] = useState('');
    const [livros, setLivros] = useState([]);
    const [mensagemErroExemplar, setMensagemErroExemplar] = useState('');

    const limparExemplar = () => {
        setLivros(null); // Corrigido para null ao invés de ''
        settítulo('');
    };

    const buscarExemplar = async () => {
        if (título.trim() === '') {
            setMensagemErroExemplar('Por favor, insira um título para buscar.');
            setTimeout(() => setMensagemErroExemplar(''), 3000);
            return;
        }

        try {
            const response = await fetch(`https://backend-5o6b.onrender.com/buscartitulo/${título}`);
            if (response.ok) {
                const exemplarData = await response.json();
                console.log(exemplarData)
                if (exemplarData.length === 0) {
                    setMensagemErroExemplar('Nenhum exemplar encontrado para o título informado.');
                    setTimeout(() => setMensagemErroExemplar(''), 3000);
                } else {
                    setLivros([exemplarData]);
                    console.log("Livros" + livros)
                    setMensagemErroExemplar(''); // Limpa a mensagem de erro, se houver
                }
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

    return (
        <>
            <form>

                {mensagemErroExemplar && (
                    <div className={Styles.notificacaoErro}>
                        {mensagemErroExemplar}
                    </div>
                )}

                <div className={Styles.divBusca}>
                    <div className={Styles.divInput}>

                        <h3>Busque livro por título</h3>
                        

                        <input
                            className={Styles.inputBox}
                            type="text"
                            placeholder="Título do Exemplar"
                            value={título}
                            onChange={(e) => settítulo(e.target.value)} // Atualiza o estado com o valor do input
                        />
                    </div>
                    <button className={Styles.inputButton} type="button" onClick={buscarExemplar}>Buscar</button>
                    <button className={Styles.inputButton} type="button" onClick={limparExemplar}>Limpar</button>
                </div>

                <div className={Styles.container}>
                    <h3>Exemplares</h3>
                    <table className={Styles.userTable}>
                        <thead>
                            <tr>
                                <th>Exemplar</th>
                                <th>Autor</th>
                                <th>Título</th>
                                <th>Assunto</th>
                                <th>Número de Chamada</th>
                                <th>Acervo</th>
                                <th>ISBN</th>
                                <th>Quantidade</th>
                                <th>Situação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros && livros.length > 0 ? (
                                livros.map((livro, index) => (
                                    <tr key={index}>
                                        <td>{livro.exemplar}</td>
                                        <td>{livro.autor}</td>
                                        <td>{livro.título}</td>
                                        <td>{livro.assunto}</td>
                                        <td>{livro.nchamada}</td>
                                        <td>{livro.acervo}</td>
                                        <td>{livro.isbn}</td>
                                        <td>{livro.quantidade}</td>
                                        <td>{livro.situacao}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </form>
        </>
    )
}

export default Devolucao;