import logoImg from './images/logo.png';
function Header (){
    return (
<div className="header-online">
    <div className="logo">
        <img src={logoImg} alt="logo"/>
    </div>
    
        <ul>
           <li><a href="/">Home </a></li> 
           <li><a href="/About">About </a></li>
           <li><a>Individual Movie</a></li>
           <li><a>Favourites</a></li>
           <li><a>Watch List</a></li>
          
        </ul>
    
</div>
    );
   
}

export default Header;