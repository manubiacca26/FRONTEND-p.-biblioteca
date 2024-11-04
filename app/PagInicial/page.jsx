import Image from 'next/image'; // Importa o componente Image do Next.js para otimização de imagens
import React from 'react'; // Importa React
import Style from '@/app/PagInicial/pagInicial.module.css'; // Importa os estilos CSS para a página
import Link from 'next/link'; // Importa o componente Link do Next.js para navegação

// Componente funcional PagInicialSemCadastro
const PagInicialSemCadastro = (props) => {
    return (
        <>
            <div className={Style.flexGrupo}> {/* Container principal com estilo flexível */}
                <div className={Style.flexBotao}> {/* Container para os botões da primeira linha */}
                    <div className={Style.box}> {/* Container para o botão de devolução */}
                        <button className={Style.botao}> {/* Botão que envolve a imagem */}
                            <Link href="./Devolucao"> {/* Link para a página de devolução */}
                                <Image src="/devolução.jpg" alt="Button Image" width={200} height={200} /> {/* Imagem do botão */}
                            </Link>
                        </button>
                        <label>Devolução</label> {/* Rótulo para o botão */}
                    </div>

                    <div className={Style.box}> {/* Container para o botão de empréstimo */}
                        <button className={Style.botao}>
                            <Link href="./Emprestimo"> {/* Link para a página de empréstimo */}
                                <Image src="/Emprestimo.png" alt="Button Image" width={200} height={200} /> {/* Imagem do botão */}
                            </Link>
                        </button>
                        <label>Empréstimo</label> {/* Rótulo para o botão */}
                    </div>

                    <div className={Style.box}> {/* Container para o botão de catalogação */}
                        <button className={Style.botao}>
                            <Link href="./Catalogo"> {/* Link para a página de catalogação */}
                                <Image src="/catalogo.jpg" alt="Button Image" width={200} height={200} /> {/* Imagem do botão */}
                            </Link>
                        </button>
                        <label>Catalogação</label> {/* Rótulo para o botão */}
                    </div>
                </div>
                <br/>

                <div className={Style.flexBotao1}> {/* Container para os botões da segunda linha */}
                    <div className={Style.box}> {/* Container para o botão de situação do livro */}
                        <button className={Style.botao}>
                            <Link href="./SituacaoDoLivro"> {/* Link para a página de situação do livro */}
                                <Image src="/situação do livro.avif" alt="Button Image" width={200} height={200} /> {/* Imagem do botão */}
                            </Link>
                        </button>
                        <label>Situação do Livro</label> {/* Rótulo para o botão */}
                    </div>
                    <br/>

                    <div className={Style.box}> {/* Container para o botão de reserva */}
                        <button className={Style.botao}>
                            <Link href="./Reserva"> {/* Link para a página de reserva */}
                                <Image src="/reserva livro.webp" alt="Button Image" width={200} height={200} /> {/* Imagem do botão */}
                            </Link>
                        </button>
                        <label>Reserva</label> {/* Rótulo para o botão */}
                    </div>
                    <br/>

                    <div className={Style.box}> {/* Container para o botão de cadastro de colaborador */}
                        <button className={Style.botao}>
                            <Link href="./CColaborador"> {/* Link para a página de cadastro de colaborador */}
                                <Image src="/cadastro.avif" alt="Button Image" width={200} height={200} /> {/* Imagem do botão */}
                            </Link>
                        </button>
                        <label>Cadastrar colaborador</label> {/* Rótulo para o botão */}
                    </div>
                    <br/>

                    <div className={Style.box}> {/* Container para o botão de atualização de acervo */}
                        <button className={Style.botao}>
                            <Link href="./Atualizar"> {/* Link para a página de atualização de acervo */}
                                <Image src="/atualização.jpg" alt="Button Image" width={200} height={200} /> {/* Imagem do botão */}
                            </Link>
                        </button>
                        <label>Atualizar Acervo</label> {/* Rótulo para o botão */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PagInicialSemCadastro; // Exporta o componente para uso em outras partes da aplicação