"use client"

import { ROUTES } from "@/src/constants/routes";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { VisibilityOff, Visibility } from '@mui/icons-material';
import Link from "next/link";
import { useState } from "react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className="w-screen h-screen gap-5 flex flex-col items-center p-2">
            <div className="flex flex-col items-center">
                <h1 className="text-5xl" style={{ fontFamily: 'var(--jura)'}}>Iduca</h1>
                <p className="text-(--gray)">Plataforma de treinamento corporativo</p>
            </div>
            <div className="w-full gap-8 px-4 py-5 rounded-2xl bg-(--card) shadow-(--shadow) md:max-w-2xl flex flex-col">
                <div>
                    <h1 className="font-semibold text-2xl">Entrar</h1>
                    <p className="text-(--gray)">Acesse sua conta para continuar seus treinamentos</p>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <TextField label="E-mail corporativo" variant="outlined" />
                    <div className="flex flex-col gap-1">
                        <FormControl  variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        {/* <TextField label="Senha" type="password" autoComplete="current-password" /> */}
                        <Link className="self-end text-(--normalBlue) hover:text-(--normalBlueHover)" href={ROUTES.forgotPass}>Esqueceu a senha?</Link>
                    </div>
                </div>
                <Button disableElevation variant="contained" sx={{boxShadow: 'var(--shadow)'}}>Entrar</Button>
            </div>
        </div>
    )
}

export default Login;