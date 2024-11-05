'use client';

import { useState } from "react";
import Styles from '@/app/ConsultarReserva/page.module.css';

export default function Emprestimo() {
    const [Exemplar, setExemplar] = useState('');
    const [reserva, setReserva] = useState(null);
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemErroAluno, setMensagemErroAluno] = useState('');
    const [mensagemErroExemplar, setMensagemErroExemplar] = useState('');
    const [mensagemErroColaborador, setMensagemErroColaborador] = useState('');



    const buscarExemplar = async () => {
        try {
            // Primeiro, busque a reserva com base no exemplar
            const reservaResponse = await fetch(`http://localhost:3001/todasreservas/${Exemplar}`);

            if (reservaResponse.ok) {
                const reservaData = await reservaResponse.json();
                setReserva(reservaData); // Armazena as informações da reserva

                // Agora, com a informação do exemplar, busque as informações do acervo
                const acervoResponse = await fetch(`http://localhost:3001/buscaracervo/${Exemplar}`);
                if (acervoResponse.ok) {
                    const acervoData = await acervoResponse.json();
                    // Supondo que você queira combinar as informações da reserva e do acervo
                    const combinedData = { ...reservaData, acervo: acervoData };
                    setReserva(combinedData); // Armazena as informações combinadas
                } else {
                    const errorMessage = `Erro ao buscar Acervo: ${acervoResponse.status}`;
                    setMensagemErroExemplar(errorMessage);
                    setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
                }

                setMensagemErroExemplar(''); // Limpa a mensagem de erro, se houver
            } else {
                const errorMessage = `Erro ao buscar Reserva: ${reservaResponse.status}`;
                setMensagemErroExemplar(errorMessage);
                setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErroExemplar('Erro ao buscar Exemplar: ' + error);
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    const limparCredenciais = () => {
        setRM('');
        setCPF('');
        setAluno(null);
        setColaborador(null);
    };

    const limparExemplar = () => {
        setLivros('');
        setExemplar('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede a ação padrão do Enter
        }
    };

    const handleNumericInput = (e, setValue) => {
        const value = e.target.value;
        // Filtra apenas números
        const numericValue = value.replace(/[^0-9]/g, '');
        setValue(numericValue);
    };


    return (
        <form onKeyDown={handleKeyDown}>
            {mensagemSucesso && (
                <div className={Styles.notificacao}>
                    {mensagemSucesso}
                </div>
            )}
            {mensagemErro && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErro}
                </div>
            )}
            {mensagemErroAluno && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErroAluno}
                </div>
            )}
            {mensagemErroExemplar && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErroExemplar}
                </div>
            )}
            {mensagemErroColaborador && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErroColaborador}
                </div>
            )}


            <div className={Styles.divBusca}>
                <div className={Styles.divInput}>
                    <input
                        className={Styles.inputBox}
                        type="text"
                        placeholder="Exemplar"
                        value={Exemplar}
                        onChange={(e) => setExemplar(e.target.value)}
                    />
                </div>
                <button className={Styles.inputButton} type="button" onClick={() => { buscarExemplar() }}>Buscar</button>
                <button className={Styles.inputButton} type="button" onClick={limparExemplar}>Limpar</button>
            </div>

            <div className={Styles.infoAlunoColabExem}>
                <div className={Styles.agruparLista}>
                    <h3>Informações sobre a reserva</h3>
                    <table className={Styles.userTable}>
                        <thead>
                            <tr>
                                <th>Campo</th>
                                <th>Credencial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reserva && (
                                <>
                                    <tr>
                                        <td>Exemplar</td>
                                        <td>{reserva.Exemplar}</td>
                                    </tr>
                                    <tr>
                                        <td>Número de Chamada</td>
                                        <td>{reserva.nChamada}</td>
                                    </tr>
                                    <tr>
                                        <td>Assunto</td>
                                        <td>{reserva.Assunto}</td>
                                    </tr>
                                    <tr>
                                        <td>ISBN</td>
                                        <td>{reserva.ISBN}</td>
                                    </tr>
                                    <tr>
                                        <td>Título</td>
                                        <td>{reserva.Título}</td>
                                    </tr>
                                    <tr>
                                        <td>Autor</td>
                                        <td>{reserva.Autor}</td>
                                    </tr>
                                    <tr>
                                        <td>Acervo</td>
                                        <td>{reserva.acervo ? reserva.acervo.Acervo : 'Não encontrado'}</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


        </form>
    );
}
