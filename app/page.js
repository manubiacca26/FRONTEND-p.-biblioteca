import Link from 'next/link';
import Header from '@/app/components/Header';

const Home = () => {
  return (
    <div>
      <Header></Header>
      <h1>Página Inicial</h1>
      <ul>
        <li>
          <Link href="/">
            Ir para a Página
          </Link>
        </li>
        <li>
          <Link href="/sobre">
            Sobre Nós
          </Link>
        </li>
        <li>
          <Link href="/contato">
            Contato
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;