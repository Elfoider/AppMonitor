import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {Checkbox, Button, Input} from '@components';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import app from '@app/utils/Firebase';

import * as Yup from 'yup';

const auth = getAuth(app);

const Login = () => {
    const [isAuthLoading, setAuthLoading] = useState(false);

    const login = async (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setAuthLoading(true);
                toast.success('Login is succeed!');
                setAuthLoading(false);
            })
            .catch((error) => {
                setAuthLoading(false);
                toast.error(error.message || 'Failed');
            });
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Required')
        }),
        onSubmit: (values) => {
            login(values.email, values.password);
        }
    });

    document.getElementById('root').classList = 'hold-transition login-page';

    return (
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <div className="h1">
                        <b>Admin</b>
                        <span>LTE</span>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <Input
                                icon={faEnvelope}
                                placeholder="Email"
                                type="email"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps('email')}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                icon={faLock}
                                placeholder="Password"
                                type="password"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps(
                                    'password'
                                )}
                            />
                        </div>

                        <div className="row">
                            <div className="col-8">
                                <Checkbox checked={false} label="Recuerdame" />
                            </div>
                            <div className="col-4">
                                <Button
                                    block
                                    type="submit"
                                    isLoading={isAuthLoading}
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                    <p className="mb-1">
                        <a href="#/action/1">¿Olvidaste la Contraseña?</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
