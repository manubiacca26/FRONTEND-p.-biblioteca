"use client"

import { useState } from "react";
import HeaderCADASTRO from '@/app/components/HeaderCADASTRO';
import FooterCADASTRO from '@/app/components/FooterCADASTRO';
import Style from '@/app/Cadastro/cadastro.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CADASTRO = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [Cemail, setCemail] = useState("");
    const [Dnasc, setDnasc] = useState("");
    const [Senha, setSenha] = useState("");
    const [Csenha, setCsenha] = useState("");
    const [showPassword, setShowPassword] = useState(false); // new state variable

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Cadastro finalizado com sucesso! ${name}`);
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <HeaderCADASTRO></HeaderCADASTRO>
            
            <p className={Style.title} >
            <label>NOVO CADASTRO</label>
             </p>

            <form className={Style.form} onSubmit={handleSubmit}>
                <label>Nome Completo:</label>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
               
                <br />
                <label>Email:</label>
                    <input type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />


               
                <br />
                <label>Confirmar email:</label>
                    <input type="text"
                        value={Cemail}
                        onChange={(e) => setCemail(e.target.value)}
                        required
                    />
                
                <br />
                <label>Data de Nascimento:</label>
                    <input type="date"
                        value={Dnasc}
                        onChange={(e) => setDnasc(e.target.value)}
                        required
                    />
                
                <br />
                <label>Senha:</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={Senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <button className={Style.revelar} onClick={handleTogglePassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                
                <br />

                <label>Confirmar Senha:</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={Csenha}
                        onChange={(e) => setCsenha(e.target.value)}
                        required
                    />
                    <button className={Style.revelar} onClick={handleTogglePassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                
                <br />

                <label>Sexo: </label>
                <select className={Style.option}>

                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Outro">Outro</option>

                </select>

                <br />
                <button className={Style.button} type="submit">Enviar</button>
            </form>

        <FooterCADASTRO className={Style.footer}></FooterCADASTRO>
        </>
    );
};

export default CADASTRO;