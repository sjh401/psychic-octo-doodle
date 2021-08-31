import './Layout.css'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';


export default function Footer(props) {
    const { darkMode } = props;

    return (
        <footer className={(darkMode === true) ? "footer-dark": "footer"}>
            <div className="footer-div">
                <div>Stephen Harrity</div>
                <a href="https://github.com/sjh401" target="_blank" rel="noreferrer"><GitHubIcon className="icons"></GitHubIcon></a>
                <a href="https://linkedin.com/in/harritystephen" target="_blank" rel="noreferrer"><LinkedInIcon className="icons"></LinkedInIcon></a>
            </div>
        </footer>
    )
}
