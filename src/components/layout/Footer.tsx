import { Link } from 'react-router-dom';

import { Paths } from '@enums/paths';
import Logo from '/img/logo.svg';

export default function Footer() {
  return (
    <footer className='footer container'>
      <Link className='footer__logo-link' to={Paths.Main}>
        <img className='footer__logo' src={Logo} alt='6 cities logo' width='64' height='33' loading='lazy' />
      </Link>
    </footer>
  );
}
