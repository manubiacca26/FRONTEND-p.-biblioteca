"use client"
import React, { useState } from 'react'
import Styles from '@/app/Catalogo/catalogo.module.css'
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const Login = (props) => {
    const [codigo, setEmail] = useState('')
    const [autor, setPassword] = useState('')
    const [titulo, setEmailError] = useState('')
    const [assunto, setPasswordError] = useState('')
    const [numero, setPasswordError] = useState('')
    const [acervo, setPasswordError] = useState('')
    const [ISBN, setPasswordError] = useState('')
    const [quantidade, setPasswordError] = useState('')

    return (
        <>
            <Header></Header>
            <div className={Styles.formulario}></div>
            <form>
                <label>
                    Código do exemplar:
                    <input type="text" name="codigo" />
                </label>
                <label>
                    Nome do autor:
                    <input type="text" name="autor" />
                </label>
                <label>
                    Título do exemplar:
                    <input type="text" name="titulo" />
                </label>
                <label>
                    Código do assunto:
                    <input type="text" name="assunto" />
                </label>
                <label>
                    Número de chamada:
                    <input type="number" name="numero" />
                </label>
                <label>
                    Acervo:
                    <input type="text" name="acervo" />
                </label>
                <label>
                    ISBN:
                    <input type="text" name="ISBN" />
                </label>
                <label>
                    Quantidade:
                    <input type="number" name="quantidade" />
                </label>
                <div className={Styles.inputContainer}>
                    <input className={Styles.inputButton} type="button" onClick={onButtonClick} value={'Registrar'} />
                </div>
            </form>
            <Footer></Footer>
        </>
    )
}