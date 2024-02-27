import logoImg from '../images/logo.png';
import '../css/footer.css'
function Footer() {
    return (
        <div className="footer">
            <div className="logo-footer">
                <a href='/'><img src={logoImg} alt="logo" /></a>
            </div>
            <div>
                <p>© 2024 Movie App all rights reserved.</p>
                <p>Created by Yurii Nadiezhdin</p>
            </div>

        </div>


    );
}

export default Footer;