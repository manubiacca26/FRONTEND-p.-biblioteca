import Image from "next/image";
import Styles from '@/app/page.module.css'

const Header = () => {
    return (
      <header>
          <div className={Styles.header}> 
        <Image 
        width={200}
        height={100}
        src='/sesi.png'
        alt="SESI" />
        <div className={Styles.title2}>
        <ul> Serviço Social da Indústria - SÃO PAULO </ul>
        <ul>CE242 - Vinhedo</ul>
        </div>
        <div className={Styles.title}>
        <ul> BEM VINDO(A): Usuário</ul>
        </div>
        </div>
        <nav className={Styles.nav}> consultar acervo sair </nav>
      </header>

    );
  };
  
  export default Header;