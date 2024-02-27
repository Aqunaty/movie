import PoweredBy from '../images/tmdb_poweredby_r.27b65cb4.svg'
import '../css/about.css'

export default function About() {
    return (
        <>
            <div class='about'>
                <div class='about-text'>
                    <div class='welcome'>
                        <h2>Welcome To Movie App</h2>
                    </div>
                    <div class='about-project'>
                        <h4>About the Project</h4>
                        <p>Movie App is a Movie Database listing the moviesbased on popularity, rating, and release date. Browse for your favourite film, add it to the Favourite List, and save it for the Watch Later list!</p>
                        <p><span>☆</span> This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                        <img src={PoweredBy} alt="powered By TMDB" />
                    </div>
                    <div class='meet-team'>
                        <h4 className='span'>Meet the team</h4>
                        <p className='span'>MVDB is a React JS project proudly created by Yurii. I am an ambitious web developmer who love coding, designing best user experience, and challenging!</p>
                    </div>

                </div>
            </div>

        </>
    )
} 