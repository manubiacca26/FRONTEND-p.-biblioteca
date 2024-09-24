import Image from 'next/image';
import React from 'react';
import HeaderCADASTRO from '@/app/components/HeaderCADASTRO';
import FooterCADASTRO from '@/app/components/FooterCADASTRO';



const PagInicialSemCadastro = (props) => {
    
  return (
    <>
    <HeaderCADASTRO></HeaderCADASTRO>
    <div>
    <button>
      <Image src="/menu.png" alt="Button Image" width={10} height={10} />
      Button Text
    </button>

    </div>
    <FooterCADASTRO></FooterCADASTRO>
    </>
  );
};

export default PagInicialSemCadastro;