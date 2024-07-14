import React, { useEffect, useRef, useState } from "react";
import { Text ,Flex, Heading, Button, Box} from "rebass";
import styled from '@emotion/styled';
import { css }from '@emotion/react'
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

const CustomLink = styled(Link)`
    font-weight: bold;
    color: #629ebb;
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
export function LogInPage() 
{
    const [logInForm, setlogInForm] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const errorBox = useRef(null);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [display, setDisplay] = useState(false)
    
    const emailError = !emailRegex.test(logInForm.email) && logInForm.email !== '';
    const passwordError = logInForm.password.length < 7 && logInForm.password !== '';

    let errMsg = ''
    if (emailError) {
        errMsg = 'Invalid email format';
    } else if (passwordError) {
        errMsg = 'Password too short';
    } else if (logInForm.email === '' || logInForm.password === '') {
        errMsg = 'All fields must be filled in'
    }

    if(auth.error !== '' && display) {
        displayError(errorBox.current, auth.error, '220px');
    }

    const handleChange = (e) => {
        if (display) {
            setDisplay(false)
        }
        displayError(errorBox.current, '', '0');
        const name = e.target.name;
        setlogInForm({...logInForm, [name]: e.target.value});
    }

    useEffect(() => {
        if(auth.user) {
            navigate('/');
        }
    }, [auth.user])
    
    return (<Flex justifyContent='center' alignItems='center' width='max(40%, 350px)' margin='auto' flexDirection='column' height='100vh'>
        <Heading lineHeight={4} fontSize={25} fontWeight={550} mb={4}>
            Welcome to our music login page
        </Heading>
        <Box ref={errorBox} css={errorStyle}></Box>
        <Text lineHeight={2} fontFamily={'Arial sans-serif'} marginBottom={2}>
            <strong>Embark on a melodic journey with us! 🎶</strong> <br />
            Sign up now to unlock a world of rhythm, harmony, and endless tunes.  🎵✨
        </Text>
        <InputField type="email" name="email" error={emailError} value={logInForm.email} onChange={handleChange} placeholder="Type your email"/>
        <InputField type="password" name="password" error={passwordError} value={logInForm.password} onChange={handleChange} placeholder="Type your password"/>
        <Button css={buttonStyle} onClick={() => {
            if (!display) {
                setDisplay(true);
            }
            if (errMsg === '') {
                dispatch(loginStart(logInForm))
                return
            }
            displayError(errorBox.current, errMsg, '220px');
        }}> {auth.authenticating ? '...':"Login"} </Button>
        <Text my={4}>
            Don't have an account <CustomLink to='/signup'>Sign up</CustomLink>
        </Text>
        <Button css={[buttonStyle, 'min-width: fit-content; padding: 3px 7px; align-self: end;']} onClick={() => navigate('/', {replace: true})}>
            Back to home page
        </Button>
    </Flex>)
}