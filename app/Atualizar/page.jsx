"use client"
import React, { useState } from 'react'
import Styles from '@/app/Atualizar/atualizacao.module.css'



const Catalogo = (props) => {
    const [autor, setAutor] = useState('')
    const [titulo, setTitulo] = useState('')
    const [assunto, setAssunto] = useState('')
    const [numero, setNumero] = useState('')
    const [acervo, setAcervo] = useState('')
    const [ISBN, setISBN] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [id, setId] = React.useState('');
    const [ev, setEv] = React.useState('');


    const onButtonClick = () => {
        // You'll update this function later...
    }


    return (
        <>
            <div className={Styles.div1}>
                <label className={Styles.form}>
                    <input className={Styles.inputB} type="text" name="codigodolivro" placeholder="Código do Livro" onChange={(e) => setId (e.target.value)} value={id} required />
                </label>
                <button onClick={() => setId('')} type="button">Limpar</button>
                <button onClick={() => setEv('')} type="submit">Enviar</button>
                </div>
        
            <div className={Styles.inputContainer}>
                <p>
                    Nome do autor:
                </p>
                <input
                    value={autor}
                    onChange={(ev) => setAutor(ev.target.value)}
                    className={Styles.inputBox} required>

                </input>
            </div>
            <div className={Styles.inputContainer}>
                <p>
                    Título do exemplar:
                </p>
                <input
                    value={titulo}
                    onChange={(ev) => setTitulo(ev.target.value)}
                    className={Styles.inputBox} required>
                </input>
            </div>
            <div className={Styles.inputContainer}>
                <p>
                    Código do assunto:
                </p>
                <input
                    value={assunto}
                    onChange={(ev) => setAssunto(ev.target.value)}
                    className={Styles.inputBox} required>
                </input>
            </div>

            <div className={Styles.inputContainer}>
                <p>
                    Número de chamada:
                </p>
                <input
                    value={numero}
                    onChange={(ev) => setNumero(ev.target.value)}
                    className={Styles.inputBox} required>
                </input>
            </div>

            <div className={Styles.inputContainer}>
                <p>
                    Acervo:
                </p>
                <input
                    value={acervo}
                    onChange={(ev) => setAcervo(ev.target.value)}
                    className={Styles.inputBox} required>
                </input>
            </div>

            <div className={Styles.inputContainer}>
                <p>
                    ISBN:
                </p>
                <input
                    value={ISBN}
                    onChange={(ev) => setISBN(ev.target.value)}
                    className={Styles.inputBox} required>
                </input>
            </div>

            <div className={Styles.inputContainer}>
                <p>
                    Quantidade:
                </p>
                <input
                    value={quantidade}
                    onChange={(ev) => setQuantidade(ev.target.value)}
                    className={Styles.inputBox} required>
                </input>
            </div>

            <div className={Styles.inputContainer}>
                <input className={Styles.inputButton} type="button" onClick={onButtonClick} value={'Registrar'} />
            </div>

        </>
    )
}

export default Catalogo