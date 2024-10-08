"use client"
import { useState } from "react";
import Style from '@/app/CColaborador/colaborador.module.css';

    const onButtonClick =  () => {
        alert('Colaborador Cadastrado');
    }


const CADASTRO = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [Dnasc, setDnasc] = useState("");
    const [CPF, setCPF] = useState("");
    const [dados, setDados] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <>
            
            <br></br>

            <p className={Style.title} >
                <label>Cadastro de Colaborador</label>
            </p>

            <form className={Style.form}>
                <br></br>
                <label>Nome Completo:</label>
                <input type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} require />

                <br />

                <label>Telefone:</label>
                <input type="number"
                    value={telefone}
                    pattern='[0-11]{11}'
                    onChange={(e) => setTelefone(e.target.value)} required />

                <br />

                <label>CPF:</label>
                <input type="number"
                    value={CPF}
                    pattern='[0-11]{11}'
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

                <label>Tipo de empréstimo:</label>
                <select className={Style.option}>
                    <option value="Normal">Empréstimo Normal</option>
                    <option value="Especial">Empréstimo Especial</option>
                </select>

                <br></br>

                <label>Categoria do usuário:</label>
                <select className={Style.option}>
                    <option value="Aluno">Aluno</option>
                    <option value="Tercerizado">Tercerizado</option>
                    <option value="Funcionário">Funcionário</option>
                </select>

                <br />
                <div className={Style.inputContainer}>
                    <input className={Style.inputButton} type="submit" onClick={onButtonClick} value={'Registrar'} />
                </div>
            </form>

        </>
    );
};

export default CADASTRO;