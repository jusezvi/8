import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'


function Registration() {

  useEffect(() => {
    if (read_cookie('auth_access_token').length !== 0) {
      navigate('/')
    }
  }, [])

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Laukas privalomas')
      .min(4, 'Vartojo vardas privalo sudaryti bet 4 simboliai'),

    email: Yup.string()
      .required('Laukas privalomas')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Neteisingas El. Paštas'),
    password: Yup.string()
      .required('Laukas privalomas')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/, 'Slaptažodi privalo sudaryti bent 4 simboliai, viena didžioji raidė ir skaičius'),
    confirmPassword: Yup.string()
      .required('Laukas privalomas')
      .oneOf([Yup.ref('password')], 'Slaptažodžiai nesutampa'),
  });


  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const navigate = useNavigate();

  // Register Check IMPROVEMENT - START
  // Galimu klaidu tekstai pagal errorCode is backend 
  const errorText = [
    "Vartotojo vardas užimtas",
    "El. Paštas užimtas",
    "Sveikinu prisiregistravus į VTCM Biblioteka!"
  ]

  /* PVZ:
  Jeigu errorCode = 0 rodys teksta -> Vartotojo vardas užimtas
  Jeigu errorCode = 1 rodys teksta -> El. Paštas užimtas
  ir t.t.
  
  >> ErrorCodes galima nusistatyti auth.controller.js ir verifySignUp.js failuose.
    Tiesiog CTRL+F ir paieskoti errorCode
  Jeigu kokia nors serverio klaida, tuomet parodys serverio klaida
  O jei errorCode neranda, mus prijungs prie isstemos
  */

  function responeCheck(err) {
    if (err.errorCode == 2) {
      alert(errorText[err.errorCode]);
      navigate("/login");
      return;
    }
    if (err.errorCode !== undefined && err.errorCode !== null) {
      alert(errorText[err.errorCode]);
      return;
    }

  }
  // Register Check IMPROVEMENT - END

  function onSubmit(data) {

    call(data);
    // alert(call(data));
    return false;
  }

  function call(data) {
    let response = '';
    const serverdata = {
      username: data.username,
      email: data.email,
      password: data.password,
      role: ["user"]
    }

    let result = fetch('http://localhost:8080/api/auth/signup', {
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
    // return response;
  }

  //const onSubmit = data => console.log(data);
  //console.log(errors);

  function TitleRegisterRender() {
    return (<h1> Registruokis į VTMC Biblioteka!</h1>);
  }
  function AlreadyHaveAcc() {
    const navigate = useNavigate();
    return (
      <>
        Turite paskyrą? <button className="btn btn-primary" onClick={() => navigate("/login")}>Prisijungti</button>
      </>
    );
  }


  return (
    <>
      <TitleRegisterRender></TitleRegisterRender>
      <div className="card m-3 col-lg-4 col-lg-offset-4">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group col">

                <input name="username" type="text" placeholder="Vartotojo vardas"  {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.username?.message}</div>
              </div>

              <div className="form-group col">
                <input name="email" type="email" placeholder="El. Paštas"  {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="form-group col">
                <input name="password" type="password" placeholder="Slaptažodis"  {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.password?.message}</div>
              </div>

              <div className="form-group col">
                <input name="confirmPassword" type="password" placeholder="Slaptažodžio patvirtinimas" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-1">Registruotis</button>

            </div>
          </form>
        </div>
      </div>
      <AlreadyHaveAcc></AlreadyHaveAcc>
    </>
  );
};

export default Registration;