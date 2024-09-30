import Image from 'next/image';
import React from 'react';
import Style from '@/app/PagInicialSemCadastro/pagInicial.module.css';

const PagInicialSemCadastro = (props) => {
    return (

        <>
            <div className={Style.flexGrupo}>

                <div className={Style.flexBotao}>

                    <div className={Style.box}>

                        <button className={Style.botao}>
                            <Image src="/devolução.jpg" alt="Button Image" width={200} height={200} />
                        </button>
                        <label>Devolução</label>
                    </div>


                    <div className={Style.box}>
                        <button className={Style.botao}>
                            <Image src="/Emprestimo.png" alt="Button Image" width={200} height={200} />
                        </button>

                        <label>Emprestimo</label>
                    </div>

                    <div className={Style.box}>

                        <button className={Style.botao}>
                            <Image src="/catalogo.jpg" alt="Button Image" width={200} height={200} />
                        </button>
                        <label>Catalogação</label>
                    </div>
                </div>


                <div className={Style.flexBotao1}>

                    <div className={Style.box}>

                        <button className={Style.botao}>
                            <Image src="/situação do livro.avif" alt="Button Image" width={200} height={200} />
                        </button>
                        <label>Situação do Livro</label>
                    </div>

                    <div className={Style.box}>

                        <button className={Style.botao}>
                            <Image src="/reserva livro.webp" alt="Button Image" width={200} height={200} />
                        </button>
                        <label>Reserva</label>
                    </div>

                    <div className={Style.box}>

                        <button className={Style.botao}>
                            <Image src="/cadastro.avif" alt="Button Image" width={200} height={200} />
                        </button>
                        <label>Cadastrar colaborador</label>
                    </div>
                </div>

            </div>

        </>
    )
}

export default PagInicialSemCadastro;