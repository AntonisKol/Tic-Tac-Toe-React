import { useHistory } from 'react-router-dom';
import './Auth.css'

function Auth (props) {
    
    let history = useHistory();

    let submitHandler = (e) => {
        e.preventDefault();
        console.log(e);

        let data = {};

        data.email = e.target[0].value;
        data.pass = e.target[1].value;

        let urlRegister = 'https://dashboard.heroku.com/apps/tictactoe-auth/auth/register';
        let urlLogin = 'https://dashboard.heroku.com/apps/tictactoe-auth/auth/login';
        let options = {
            method:'POST', 
            headers: {
                'Content-Type': 'application/json'
             },
            body:JSON.stringify(data)
        }

        if (e.nativeEvent.submitter.id === "register"){
            fetch(urlRegister, options).then(result=>result.json().then(output=> {
                if (output.status === "success") {
                    alert("Congrats, you are registered! Please log in.");
                } else {
                    alert(output.message);
                }
            }
        )); 

        } else if (e.nativeEvent.submitter.id === "login") {
           
            fetch(urlLogin, options)
            .then(result=>result.json()
            .then(output=>{
                alert(output.message);
                    console.log(output);
              localStorage.setItem('token', output.token);
              history.push('/game');
                })); 
        }
    }

    return (
        <div className = "wrapper">
            <form onSubmit = {submitHandler}>
                <input name = "email" type = "email" />
                <input  name = "pass" type = "password" />
                <section>
                    <input id = "register" type = "submit" value = "Register"/>
                    <input id = "login" type = "submit" value = "Login"/>
                </section>
            </form>
        </div>
    )
}


export default Auth;