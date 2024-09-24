"use client"

import Styles from '@/app/Emprestimo/page.module.css'
import React from "react";

function Emprestimo() {
    const [id, setId] = React.useState('');
    const [exemplar, setExemplar] = React.useState('');

    return (
        <>
         <form>
                    <div className={Styles.div1}>
                    <label className={Styles.form}>
                        CPF/RM/RA:
                        <input type="number" name="registrodematricula" onChange={(e) => setId(e.target.value)} value={id} required />
                    </label>
                    <button onClick={( ) => setId('')} type="button">Limpar</button>
                    <input type="submit" value="Enviar" />
                    </div>

                    <div className={Styles.aluno}>
                    INFORMAÇÕES DO ALUNO
                    </div>
                    
                    <div className={Styles.div1}>
                    <label className={Styles.form}>
                        EXEMPLAR:
                        <input type="text" name="registrodematricula" onChange={(e) => setExemplar(e.target.value)} value={exemplar} required />
                    </label>
                    <button onClick={() => setExemplar('')} type="button">Limpar</button>
                    <input type="submit" value="Enviar" />
                    <div className={Styles.aluno}> INFORMAÇÕES SOBRE O EXMPLAR
                    </div>
                    <div className={Styles.button}>
                    <input type="date" id='date'required />
                    </div>
                    <div className={Styles.button}> <input type="submit" value="Enviar"/> </div>
                    </div>
                </form>
        </>
    )
}

export default Emprestimo; 