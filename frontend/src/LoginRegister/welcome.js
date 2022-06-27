import { useNavigate } from "react-router-dom";


function TitleRender () {
    return(<h1> VTMC Biblioteka</h1>);
}

function Login() {
    const navigate = useNavigate();
    return (<button className="btn btn-primary" onClick={()=> navigate("/login")}>Login in</button>);
}

function Register() {
    const navigate = useNavigate();
    return (<button className="btn btn-primary" onClick={()=> navigate("/register")}>Register</button>);
}


function WelcomeHtmlRender() {
    return (
    <>  
      <TitleRender></TitleRender>
      <Login></Login>
      <Register></Register>
    </>
    );
}

export default WelcomeHtmlRender;