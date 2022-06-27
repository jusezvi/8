/*import { useRouter } from 'next/router'; */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'



function Login() {

    useEffect(() => {
        if (read_cookie('auth_access_token').length !== 0) {
            navigate('/')
        }
    }, [])


    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Laukas privalomas'),
        password: Yup.string().required('Laukas privalomas')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const navigate = useNavigate();

    // Login Check FIX - START
    // Galimu klaidu tekstai pagal errorCode is backend 
    const errorText = [
        "Neteisingas El. paštas",
        "Neteisingas slaptažodis",
    ]

    /* PVZ:
    Jeigu errorCode = 0 rodys teksta -> Neteisingas El. paštas
    Jeigu errorCode = 1 rodys teksta -> Neteisingas slaptažodis
    >> ErrorCodes galima nusistatyti auth.controller.js faile.
    Tiesiog CTRL+F ir paieskoti errorCode
    Jeigu kokia nors serverio klaida, tuomet parodys serverio klaida
    O jei errorCode neranda, mus prijungs prie isstemos
    */

    function responeCheck(res) {

        if (res.errorCode !== undefined && res.errorCode !== null) {
            alert(errorText[res.errorCode]);
            return;
        }
        bake_cookie('auth_access_token', res.id);
        bake_cookie('username', res.username);
        navigate("/");
        // Papildomai persiunciam vartotojo info i main langa,
        // Tam jog galetume patikrinti/gauti su vartotoju susijusia informacija
        // Kokia info siuncia galima pasiziureti faile auth.controller.js
        // Nuo 84 iki 89 eilutes, palikau uzkomentuota kas neaktuolu pagal mane dabar.
    }
    // Login Check FIX - END

    function onSubmit(data) {
        call(data);
        // console.log(call(data.message));
        return false;
    }


    function call(data) {
        const serverdata = {
            email: data.email,
            password: data.password
        }

        let result = fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serverdata)
        })
            .then(res => res.json())
            .then(data => responeCheck(data))
            .catch((err) => {
                console.log(err)
            })
        /* return result; */
    }






    function TittleLoginRender() {
        return (<h1> Prisijunk į VTMC Biblioteka!</h1>);
    }
    function DoNotHaveAcc() {
        const navigate = useNavigate();
        return (
            <>
                Neturite paskyros? <button className="btn btn-primary" onClick={() => navigate("/register")}>Registruotis</button>
            </>
        );
    }

    return (
        <>
            <TittleLoginRender></TittleLoginRender>
            <div className="card m-3 col-lg-4 col-lg-offset-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input name="email" type="text" placeholder='El. Paštas' {...register('email')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <input name="password" type="password" placeholder='Slaptažodis' {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Prisijungti
                        </button>
                    </form>
                </div>
            </div>
            <DoNotHaveAcc></DoNotHaveAcc>
        </>
    );
}

export default Login;