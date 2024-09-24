"use client"
import React, { useState } from 'react'
import Styles from '@/app/Login/login.module.css'



const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  const onButtonClick = () => {
    // You'll update this function later...
  }


  return (
    <>
    <div className={Styles.mainContainer}>
      <div className={Styles.titleContainer}>
        <h5>Entrar</h5>
      </div>
      <br />
      <div className={Styles.inputContainer}>
        <p>
            Usuário
        </p>
        <input
          value={email}
          placeholder="e-mail" required
          onChange={(ev) => setEmail(ev.target.value)}
          className={Styles.inputBox}
        />
        <label className="errorLabel">{setEmailError}</label>
      </div>
      <br />
      <div className={Styles.inputContainer}>
        <p>
            Senha
        </p>
        <input type="password"
          value={password}
          placeholder="senha" required
          onChange={(ev) => setPassword(ev.target.value)}
          className={Styles.inputBox}>
          </input>
        <label className="errorLabel">{setPasswordError}</label>
      </div>
      <br />
      <div className={Styles.inputContainer}>
        <input className={Styles.inputButton} type="button" onClick={onButtonClick} value={'Entrar'} />
        </div>

        <div className={Styles.cadas}>
          <a href="./cadastro">
            Cadastre-se
            </a>
      </div>
      </div>
      
      </>
  )
}

export default Login
    


 
