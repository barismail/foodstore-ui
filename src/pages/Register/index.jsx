import React from 'react';
import {useForm} from 'react-hook-form';
import {rules} from './validation.js';
import {registerUser} from '../../api/auth.js';
import {Button, Card, FormControl, InputPassword, InputText, LayoutOne} from 'upkit';
import {Link, useNavigate} from 'react-router-dom';
import StoreLogo from '../../components/StoreLogo';

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error',
}

export default function Register() {
    const {
        register,
        handleSubmit,
        setError,
        errors,
    } = useForm();

    const [status, setStatus] = React.useState(statusList.idle);

    const navigate = useNavigate();

    const onSubmit = async formData => {
        let {password, password_confirmation} = formData;
        if(password !== password_confirmation){
            return setError('password_confirmation',
                {type: 'equality', message: 'Konfirmasi password harus sama dengan password'});
        }

        setStatus(statusList.process);

        let {data} = await registerUser(formData);
        if (data.error) {
            let fields = Object.keys(data.fields);
            fields.forEach(field => {
                setError(field, {type: 'server', message: data.fields[field]?.properties?.message})
            })
            setStatus(statusList.error);
            return true;
        }

        setStatus(statusList.success);
        navigate('/register/berhasil', {replace: true});
    }

    return (
        <>
            <LayoutOne size='small'>
                <Card color='white'>
                    <div className="text-center mb-5">
                        <StoreLogo />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl errorMessage={errors.full_name?.message}>
                            <InputText
                                name='full_name'
                                placeholder='Nama Lengkap'
                                fitContainer
                                ref={register(rules.full_name)}
                            />
                        </FormControl>
                        <FormControl errorMessage={errors.email?.message}>
                            <InputText
                                name='email'
                                placeholder='Email'
                                fitContainer
                                ref={register(rules.email)}
                            />
                        </FormControl>
                        <FormControl errorMessage={errors.password?.message}>
                            <InputPassword
                                name='password'
                                placeholder='Password'
                                fitContainer
                                ref={register(rules.password)}
                            />
                        </FormControl>
                        <FormControl errorMessage={errors.password_confirmation?.message}>
                            <InputPassword
                                name='password_confirmation'
                                placeholder='Konfirmasi Password'
                                fitContainer
                                ref={register(rules.password_confirmation)}
                            />
                        </FormControl>
                        <Button
                            size='large'
                            fitContainer
                            disabled={status === statusList.process}
                        >{status === statusList.process ? "Sedang memproses" : "Daftar"}
                        </Button>
                    </form>
                    <div className="text-center mt-2">
                        Sudah punya akun? <Link to='/login'><b>Masuk Sekarang.</b></Link>
                    </div>
                </Card>
            </LayoutOne>
        </>
    )
}