import React, { useRef, useState } from "react";
import { Text ,Flex, Heading, Button, Box} from "rebass";
import styled from '@emotion/styled';
import { css }from '@emotion/react'
import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const InputField = styled('input')`
    border: none;
    outline: none;
    width: 100%;
    height: 50px;
    padding: 3px 5px;
    background: #1F1F22;
    lineheight: 1;
    margin: 10px 3px;
    font-size: 17px;
    border: ${props => props.error&& '1px solid red'}
`
const buttonStyle = css`
    background: #363637;
    text-align: center;
    height: 35px;
    width: 100px;
    border-radius: 10px;
    border: none;
    outline: none;
    padding: 0;
    cursor: pointer;
    &:hover {
        background: #63676F;
    }
`

const errorStyle = css`
    text-align: center;
    padding: 2px 0;
    position: absolute;
    width: 0;
    background: #fb3333;
    top: 20%;
    right: 0;
    font-size: 1.2rem;
    transition: width 0.5s ease;
    border-radius: 3px 0 0 3px;
`
const displayError = (errorRef, msg, width) => {
    if (!errorRef) return;
    errorRef.style.width = width;
    errorRef.innerText = msg;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function SignUpPage() 
{
    const [signUpForm, setSignUpForm] = useState({email: '', password: '', cpassword: ''});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const errorBox = useRef(null);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    if (submitted && auth.user) {
        navigate("/")
    }
    
    const emailError = !emailRegex.test(signUpForm.email) && signUpForm.email !== '';
    const passwordError = signUpForm.password.length < 7 && signUpForm.password !== '';
    const confirm = signUpForm.password !== signUpForm.cpassword  && signUpForm.cpassword !== '';

    let errMsg = ''
    if (emailError) {
        errMsg = 'Invalid email format';
    } else if (passwordError) {
        errMsg = 'Password to short';
    } else if(confirm) {
        errMsg = 'Passwords do not match';
    } else if (signUpForm.cpassword === '' || signUpForm.email === '' || signUpForm.password === '') {
        errMsg = 'All fields must be filled in'
    }

    if(auth.error !== '') {
        displayError(errorBox.current, auth.error, '220px');
    }

    const handleChange = (e) => {
        displayError(errorBox.current, '', '0');
        const name = e.target.name;
        setSignUpForm({...signUpForm, [name]: e.target.value});
    }
    
    return (<Flex justifyContent='center' alignItems='center' width='max(40%, 350px)' margin='auto' flexDirection='column' height='100vh'>
        <Heading lineHeight={4} fontSize={25} fontWeight={550} mb={4}>
            Welcome to our music page
        </Heading>
        <Box ref={errorBox} css={errorStyle}></Box>
        <Text lineHeight={2} fontFamily={'Arial sans-serif'} marginBottom={2}>
            <strong>Embark on a melodic journey with us! 🎶</strong> <br />
            Sign up now to unlock a world of rhythm, harmony, and endless tunes.  🎵✨
        </Text>
        <InputField type="email" name="email" error={emailError} value={signUpForm.email} onChange={handleChange} placeholder="Type your email"/>
        <InputField type="password" name="password" error={passwordError} value={signUpForm.password} onChange={handleChange} placeholder="Type your password"/>
        <InputField type="password" name="cpassword" error={confirm} value={signUpForm.cpassword} onChange={handleChange} placeholder="Confirm password"/>
        <Button css={buttonStyle} onClick={() => {
            if (errMsg === '') {
                dispatch(signUpStart(signUpForm))
                setSubmitted(true)
                return
            }

            displayError(errorBox.current, errMsg, '220px');
        }}> {auth.authenticating ? '...':"Sign Up"} </Button>
    </Flex>)
}