'use client'

import Styles from '@/app/Reserva/page.module.css'
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import React from "react";

function Reserva() {
    const [rm, setRm] = React.useState('');
    const [exemplar, setExemplar] = React.useState('');

    return (
        <>
            <Header></Header>
            <div>
                <form>
                    <div className={Styles.div1}>
                    <label className={Styles.form}>
                        RM:
                        <input type="number" name="registrodematricula" onChange={(e) => setRm(e.target.value)} value={rm} />
                    </label>
                    <button onClick={() => setRm('')} type="button">Limpar</button>
                    <input type="submit" value="Enviar" />
                    </div>

                    <div className={Styles.aluno}>
                    INFORMAÇÕES DO ALUNO
                    </div>
                    
                    <div className={Styles.div1}>
                    <label className={Styles.form}>
                        EXEMPLAR:
                        <input type="text" name="registrodematricula" onChange={(e) => setExemplar(e.target.value)} value={exemplar} />
                    </label>
                    <button onClick={() => setExemplar('')} type="button">Limpar</button>
                    <input type="submit" value="Enviar" />
                    <div className={Styles.aluno}>
                    </div>
                    </div>
                </form>
            </div>
            <Footer></Footer>
            </>
   
    )
}
export default Reserva;