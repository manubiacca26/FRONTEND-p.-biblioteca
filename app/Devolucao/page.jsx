"use client"

import React from "react";
import Styles from '@/app/Devolucao/page.module.css'

function Devolucao() {
    const [exemplar, setExemplar] = React.useState('');

    return (
        <>
        <form>
            <div className={Styles.box1}>
                <label className={Styles.form}>
                    Número do exemplar: 
                    <input className={Styles.inputBox} type="text" name="registrodematricula" onChange={(e) => setExemplar(e.target.value)} value={exemplar} required />
                    </label>
                    <button className={Styles.inputButton} onClick={() => setExemplar('')} type="button">Limpar</button>
                    <input className={Styles.inputButton} type="submit" value="Enviar"/>
                
                </div>
            </form>
            <div className={Styles.container}>
            <div className={Styles.container2}>
               <div> EXEMPLAR </div>
                <div> TITULO</div>
                <div> Nome da pessoa </div>
                <div> Devolução prevista </div>
                <div> Emprestado em </div>
                <div> Data efetiva </div>
             </div>
            <div className={Styles.titulos}>
                INFORMAÇÕES
            </div>
            </div>            
            
        </>

    )
}
export default Devolucao;
