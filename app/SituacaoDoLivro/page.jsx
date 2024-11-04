"use client"; // Indica que este componente será renderizado no lado do cliente

import { useState } from "react"; // Importa useState do React
import Styles from '@/app/SituacaoDoLivro/SituacaoLivro.module.css'; // Importa os estilos CSS
import Link from "next/link"; // Importa o componente Link do Next.js para navegação
import Image from "next/image";

function Devolucao() {
  // Declaração dos estados usando useState
  const [Exemplar, setExemplar] = useState(''); // Estado para armazenar o exemplar
  const [livros, setLivros] = useState(null); // Estado para armazenar os dados do exemplar
  const [mensagemErroExemplar, setMensagemErroExemplar] = useState(''); // Estado para mensagens de erro do exemplar

  // Função para limpar os dados do exemplar
  const limparExemplar = () => {
    setLivros(null); // Corrigido para null ao invés de ''
    setExemplar(''); // Limpa o estado do exemplar
  };

  // Função para buscar os dados do exemplar
  const buscarExemplar = async () => {
    try {
      const response = await fetch(`http://localhost:3001/buscaracervo/${Exemplar}`); // Faz a requisição para buscar o exemplar
      if (response.ok) {
        const exemplarData = await response.json(); // Obtém os dados do exemplar
        setLivros(exemplarData); // Atualiza o estado do exemplar
        setMensagemErroExemplar(''); // Limpa a mensagem de erro, se houver

        // Verifica se o exemplar está emprestado
        if (exemplarData.Situacao === 'Emprestado') {
          setMensagemErroExemplar('O exemplar já está emprestado.'); // Mensagem de erro se o exemplar estiver emprestado
          setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
          setLivros(null); // Limpa os dados do exemplar
        }
      } else {
        const errorMessage = `Erro ao buscar Exemplar: ${response.status}`; // Mensagem de erro se a resposta não for ok
        setMensagemErroExemplar(errorMessage);
        setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
      }
    } catch (error) {
      setMensagemErroExemplar('Erro ao buscar Exemplar: ' + error); // Captura e exibe erro
      setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
    }
  };

  return (
    <>
      <form>

        {mensagemErroExemplar && ( // Exibe a mensagem de erro se houver
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
              placeholder="Exemplar" // Placeholder do input
              value={Exemplar} // Valor do input
              onChange={(e) => setExemplar(e.target.value)} // Atualiza o estado com o valor do input
            />
          </div>
          <button className={Styles.inputButton} type="button" onClick={buscarExemplar}>Buscar</button> {/* Botão para buscar o exemplar */}
          <button className={Styles.inputButton} type="button" onClick={limparExemplar}>Limpar</button> {/* Botão para limpar o exemplar */}
        </div>

        <div className={Styles.infoAlunoColabExem}>
          <div className={Styles.agruparLista}>
            <h3>Informações sobre o exemplar</h3> {/* Título da seção */}
            <table className={Styles.userTable}>
              <thead>
                <tr>
                  <th>Campo</th> {/* Cabeçalho da tabela */}
                  <th>Credencial</th>
                </tr>
              </thead>
              <tbody>
                {livros && ( // Verifica se há dados do exemplar
                  <>
                    <tr>
                      <td>Exemplar</td>
                      <td>{livros.Exemplar}</td> {/* Exibe o exemplar */}
                    </tr>
                    <tr>
                      <td>Número de Chamada</td>
                      <td>{ livros.nChamada}</td> {/* Exibe o número de chamada */}
                    </tr>
                    <tr>
                      <td>Assunto</td>
                      <td>{livros.Assunto}</td> {/* Exibe o assunto */}
                    </tr>
                    <tr>
                      <td>ISBN</td>
                      <td>{livros.ISBN}</td> {/* Exibe o ISBN */}
                    </tr>
                    <tr>
                      <td>Título</td>
                      <td>{livros.Título}</td> {/* Exibe o título */}
                    </tr>
                    <tr>
                      <td>Autor</td>
                      <td>{livros.Autor}</td> {/* Exibe o autor */}
                    </tr>
                    <tr>
                      <td>Acervo</td>
                      <td>{livros.Acervo}</td> {/* Exibe o acervo */}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </form>
    </>
  );
}

export default Devolucao;