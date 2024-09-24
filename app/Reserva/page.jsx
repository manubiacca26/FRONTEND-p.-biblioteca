'use client'

import Styles from '@/app/Reserva/page.module.css'
import React from "react";

function Reserva() {
    const [rm, setRm] = React.useState('');
    const [exemplar, setExemplar] = React.useState('');
    
    return (
        <>
            <div>
                <form>
                    <div className={Styles.div1}>
                    <label className={Styles.form}>
                        RM:
                        <input className={Styles.inputBox} type="number" name="registrodematricula" onChange={(e) => setRm(e.target.value)} value={rm} required/>
                    </label>
                    <button onClick={( ) => setRm('')} type="button">Limpar</button>
                    <input type="submit" value="Enviar" />
                    </div>
                    

                    <div className={Styles.aluno}>
                    INFORMAÇÕES DO ALUNO
                    </div>
                    
                    <div className={Styles.div1}>
                    <label className={Styles.form}>
                        EXEMPLAR:
                        <input className={Styles.inputBox} type="text" name="registrodematricula" onChange={(e) => setExemplar(e.target.value)} value={exemplar} required />
                    </label>
                    <button onClick={() => setExemplar('')} type="button">Limpar</button>
                    <input type="submit" value="Enviar" />
                    <div className={Styles.aluno}> INFORMAÇÕES DO EXEMPLAR
                    </div>
                    <div className={Styles.button}>
                    <input className={Styles.inputButton} type="submit" value="Reservar" />
                    </div>
                    </div>
                </form>
            </div>
            </>
   
    )
}
export default Reserva;