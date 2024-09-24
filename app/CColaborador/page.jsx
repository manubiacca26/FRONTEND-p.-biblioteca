"use client"
import { useState } from "react";
import Style from '@/app/CColaborador/colaborador.module.css';

const CADASTRO = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [Dnasc, setDnasc] = useState("");
    const [CPF, setCPF] = useState("");


    return (
        <>

            <p className={Style.title} >
                <label>Cadastro de Colaborador</label>
            </p>

            <form className={Style.form}>
                <label>Nome Completo:</label>
                <input type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} require />

                <br />

                <label>Telefone:</label>
                <input type="number"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)} required />

                <br />

                <label>CPF:</label>
                <input type="number"
                    value={CPF}
                    onChange={(e) => setCPF(e.target.value)} required />

                <br />

                <label>Data de Nascimento:</label>
                <input type="date"
                    value={Dnasc}
                    onChange={(e) => setDnasc(e.target.value)} required />

                <br />

                <label>E-mail:</label>
                <input type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                    <br></br>

                    <form className={Style.email}>

                    <input type="checkbox" id="e-mail" name="e-mail" value="E-mail"/><label for="e-mail">Receber e-mail </label> 

                </form>

                <br></br>

                    <label>Tipo de empréstimo:</label>
                    <select className={Style.option}>
                        <option value="Normal">Empréstimo Normal</option>
                        <option value="Especial">Empréstimo Especial</option>
                    </select>

                    <label>Categoria do usuário:</label>
                    <select className={Style.option}>
                        <option value="Aluno">Aluno</option>
                        <option value="">Masculino</option>
                        <option value="Outro">Outro</option>
                    </select>

                    <br />
            </form>

        </>
    );
};

export default CADASTRO;