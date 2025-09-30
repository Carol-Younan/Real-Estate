import './Header.css';
import Head from '../assets/Head.jpg';

function Header(){
    return(
        <div className='header'>
            <img className="TheHeadHeader" src={Head} alt="Red Sea Construction" />
            <div className="overlay-card">
                <h2>Welcome to Red Sea Construction</h2>
                <p className='HeadPara'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor </p>
            </div>
        </div>
    )
}
export default Header;