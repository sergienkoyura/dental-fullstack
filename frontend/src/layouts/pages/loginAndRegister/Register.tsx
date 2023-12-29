import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "./../../../services/auth.service";
import { Link, useHistory } from "react-router-dom";

export const Register = () => {
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, []);

    const initialValues = {
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required("This field is required!"),

        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),

        password: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40
            )
            .required("This field is required!"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], "Passwords must match")
            .required("Please confirm your password."),
    });

    const handleRegister = (initialValues: any) => {
        const { fullname, email, password } = initialValues;

        setMessage("");
        setLoading(true);

        authService.register(fullname, email, password).then(
            () => {
                history.push("/profile");
                window.location.reload();
            },
            (error) => {
                setMessage(error.response.data.message);
                setLoading(false);
            }
        );
    };

    return (
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="col-md-6 col-sm-12">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form className="p-5 main-text-dark">

                        <div className="text-center mb-4">
                            <h1 className="fw-semibold">Sign up</h1>
                            <p>You need to create an account to book an appointment!</p>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger p-1 my-2" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <div className="form-group mb-4">
                            <label htmlFor="fullname"> Full Name </label>
                            <Field name="fullname" type="text" className="form-control" />
                            <ErrorMessage
                                name="fullname"
                                component="div"
                                className="alert alert-danger p-1 my-2"
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="email"> Email </label>
                            <Field name="email" type="email" className="form-control" autoComplete="username"/>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="alert alert-danger p-1 my-2"
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="password"> Password </label>
                            <Field
                                name="password"
                                type="password"
                                className="form-control"
                                autoComplete="new-password"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert alert-danger p-1 my-2"
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="confirmPassword"> Confirm password </label>
                            <Field
                                name="confirmPassword"
                                type="password"
                                className="form-control"
                                autoComplete="new-password"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="alert alert-danger p-1 my-2"
                            />
                        </div>

                        <div className="form-group d-flex justify-content-center">
                            <button type="submit" className="btn btn-lg main-button-outline-dark btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Register</span>
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            <p>Already have an account? <Link className="main-link-dark" to={"/login"}>Sign in</Link></p>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Register;