import Image from "next/image";
import Styles from '@/app/page.module.css'
import Link from "next/link";

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
        <ul> BEM VINDO(A) </ul>
        </div> 
        </div>
        <div className={Styles.naav}>

        <div>
        </div>
        </div>
          
          </header>

    );
  };
  
  export default Header;