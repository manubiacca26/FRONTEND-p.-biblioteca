"use client"

// Importa as bibliotecas necessárias
import { useState } from "react"; // Importa useState para gerenciar estados
import Link from "next/link"; // Importa o componente Link do Next.js para navegação
import Style from '@/app/Cadastro/cadastro.module.css'; // Importa os estilos CSS
import Image from "next/image";

// Componente principal para o cadastro
const CADASTRO = () => {
    // Declaração dos estados usando useState para armazenar dados do usuário
    const [name, setName] = useState(""); // Estado para o nome completo
    const [email, setEmail] = useState(""); // Estado para o email
    const [Cemail, setCemail] = useState(""); // Estado para confirmar o email
    const [Dnasc, setDnasc] = useState(""); // Estado para a data de nascimento
    const [Senha, setSenha] = useState(""); // Estado para a senha
    const [Csenha, setCsenha] = useState(""); // Estado para confirmar a senha
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

    // Função para tratar o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        alert(`Cadastro finalizado com sucesso! ${name}`); // Alerta de sucesso com o nome do usuário
    }

    // Função para alternar a visibilidade da senha
    const handleTogglePassword = () => {
        setShowPassword(!showPassword); // Inverte o estado de visibilidade da senha
    }

    // Renderização do componente
    return (
        <>
            <div className={Styles.retornar}>
                <Link href="/PagInicial">
                    <Image
                        width={50}
                        height={50}
                        src='/retornar.png'
                        alt="Retornar"
                    />
                </Link>
            </div>

            <p className={Style.title}>
                <label>NOVO CADASTRO</label>
            </p>

            <form className={Style.form} onSubmit={handleSubmit}>
                <label>Nome Completo:</label>
                <input
                    type="text"
                    className={Style.inputBox}
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Atualiza o estado do nome
                    required // Campo obrigatório
                />

                <br />
                <label>Email:</label>
                <input
                    type="text"
                    className={Style.inputBox}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
                    required // Campo obrigatório
                />

                <br />
                <label>Confirmar email:</label>
                <input
                    type="text"
                    className={Style.inputBox}
                    value={Cemail}
                    onChange={(e) => setCemail(e.target.value)} // Atualiza o estado do email de confirmação
                    required // Campo obrigatório
                />

                <br />
                <label>Data de Nascimento:</label>
                <input
                    type="date"
                    className={Style.inputBox}
                    value={Dnasc}
                    onChange={(e) => setDnasc(e.target.value)} // Atualiza o estado da data de nascimento
                    required // Campo obrigatório
                />

                <br />
                <label>Sexo:</label>
                <select className={Style.option}>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Outro">Outro</option>
                </select>

                <br />
                <label>Senha:</label>
                <input
                    className={Style.inputBox}
                    type={showPassword ? "text" : "password"} // Alterna entre texto e senha
                    value={Senha}
                    onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
                    required // Campo obrigatório
                />

                <br />
                <label>Confirmar Senha:</label>
                <input
                    className={Style.inputBox}
                    type={showPassword ? "text" : "password"} // Alterna entre texto e senha
                    value={Csenha}
                    onChange={(e) => setCsenha(e.target.value)} // Atualiza o estado da confirmação da senha
                />

                <br />
                <br />
                <button className={Style.inputButton} type="submit">Enviar</button> {/* Botão para enviar o formulário */}
            </form>
        </>
    );
};

// Exporta o componente para uso em outras partes da aplicação
export default CADASTRO;