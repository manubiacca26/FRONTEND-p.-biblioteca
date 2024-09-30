"use client"
import React, { useState } from 'react'
import Styles from '@/app/Catalogo/catalogo.module.css'



const Catalogo = (props) => {
  const [codigo, setCodigo] = useState('')
  const [autor, setAutor] = useState('')
  const [titulo, setTitulo] = useState('')
  const [assunto, setAssunto] = useState('')
  const [numero, setNumero] = useState('')
  const [acervo, setAcervo] = useState('')
  const [ISBN, setISBN] = useState('')
  const [quantidade, setQuantidade] = useState('')


  const onButtonClick = () => {
    // You'll update this function later...
  }


  return (
    <>
      <div className={Styles.inputContainer}>
        <p>
            Código do exemplar:  
        </p>
        <input
          value={codigo}
          onChange={(ev) => setCodigo(ev.target.value)}
          className={Styles.inputBox} required/>
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