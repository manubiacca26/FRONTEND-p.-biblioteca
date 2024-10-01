"use client"

import React from "react";
import Styles from '@/app/SituacaoDoLivro/SituacaoLivro.module.css'

function Devolucao() {
    const [exemplar, setExemplar] = React.useState('');

    return (
        <>
        <form>
            <div className={Styles.box1}>
                <label className={Styles.form}>
                    Código do livro: 
                    <br></br>
                    <input className={Styles.inputBox} type="text" name="registrodematricula" onChange={(e) => setExemplar(e.target.value)} value={exemplar} required />
                    </label>
                    <input className={Styles.inputButton} type="submit" value="Enviar"/>
                
                </div>
            </form>
            <div className={Styles.container}>
            <div className={Styles.container2}>
               <div> INFORMAÇÕES DO LIVRO </div>
             </div>
            </div>            
            
        </>

    )
}
export default Devolucao;