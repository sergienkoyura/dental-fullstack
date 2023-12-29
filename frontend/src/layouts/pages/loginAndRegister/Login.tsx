import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import authService from "./../../../services/auth.service";


export const Login = () => {
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const initialValues: {
        email: string;
        password: string;
    } = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });

    const handleLogin = (formValue: { email: string; password: string }) => {
        const { email, password } = formValue;

        setMessage("");
        setLoading(true);

        authService.login(email, password).then(
            () => {
                history.push("/profile");
                window.location.reload();
            },
            (error: any) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    return (
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="col-md-6 col-sm-12">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    <Form className="p-5 main-text-dark">

                        <div className="text-center mb-4">
                            <h1 className="fw-semibold">Login</h1>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger p-1 my-2" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <div className="form-group mb-4">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" className="form-control" autoComplete="username" />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="alert alert-danger p-1 my-2"
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className="form-control" autoComplete="current-password" />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert alert-danger p-1 my-2"
                            />
                        </div>

                        <div className="form-group d-flex justify-content-center">
                            <button type="submit" className="btn btn-lg main-button-outline-dark btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            <p>New to our services? <Link className="main-link-dark" to={"/register"}>Sign up</Link></p>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;