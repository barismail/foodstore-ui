import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {userLogin} from '../../features/Auth/actions.js';
import {login} from '../../api/auth.js';
import {rules} from './validation.js';
import StoreLogo from '../../components/StoreLogo';
import {Button, Card, FormControl, InputPassword, InputText, LayoutOne} from "upkit";


const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error',
}

export default function Login() {
    const {
        register,
        handleSubmit,
        errors,
        setError,
    } = useForm();
    const [status, setStatus] = useState(statusList.idle);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async ({email, password}) => {
        setStatus(statusList.process);

        const {data} = await login({email, password});
        if (data.error) {
            setError('password', {type: 'invalidCredential', message: data.message});
            setStatus(statusList.error);
        } else {
            const {user, token} = data;
            dispatch(userLogin(user, token));
            navigate('/', {replace: true});
        }
        setStatus(statusList.success);
    }

    return (
        <LayoutOne size='small'>
            <br/>
            <Card color='white'>
                <div className="text-center mb-5">
                    <StoreLogo />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl errorMessage={errors.email?.message}>
                        <InputText
                            placeholder='Email'
                            name='email'
                            fitContainer
                            ref={register(rules.email)}
                        />
                    </FormControl>
                    <FormControl errorMessage={errors.password?.message}>
                        <InputPassword
                            placeholder='Password'
                            name='password'
                            fitContainer
                            ref={register(rules.password)}
                        />
                    </FormControl>
                    <Button size='large' fitContainer disabled={status === statusList.process}>
                        Login
                    </Button>
                </form>
                <div className="text-center mt-2">
                    Belum punya akun? <Link to='/register'><b>Daftar sekarang</b></Link>
                </div>
            </Card>
        </LayoutOne>
    )
}