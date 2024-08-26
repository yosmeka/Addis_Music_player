import React, { useRef, useState } from "react";
import { Text ,Flex, Heading, Button, Box} from "rebass";
import styled from '@emotion/styled';
import { css }from '@emotion/react'
import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomToast from "../components/CustomToast";

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
const CustomLink = styled(Link)`
    font-weight: bold;
    color: #629ebb;
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function SignUpPage() 
{
    const [signUpForm, setSignUpForm] = useState({email: '', password: '', cpassword: ''});
    const [display, setdisplay] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    
    useEffect(() => {
        if(auth.user) {
            navigate('/');
        }
    }, [auth.user])
    
    const emailError = !emailRegex.test(signUpForm.email) && signUpForm.email !== '';
    const passwordError = signUpForm.password.length < 7 && signUpForm.password !== '';
    const confirm = signUpForm.password !== signUpForm.cpassword  && signUpForm.cpassword !== '';

    let errMsg = auth.error
    if (emailError) {
        errMsg = 'Invalid email format';
    } else if (passwordError) {
        errMsg = 'Password to short';
    } else if(confirm) {
        errMsg = 'Passwords do not match';
    } else if (signUpForm.cpassword === '' || signUpForm.email === '' || signUpForm.password === '') {
        errMsg = 'All fields must be filled in'
    }

    const handleChange = (e) => {
        if (display)
            setdisplay(false)
        const name = e.target.name;
        setSignUpForm({...signUpForm, [name]: e.target.value});
    }
    
    return (<Flex justifyContent='center' alignItems='center' width='max(40%, 350px)' margin='auto' flexDirection='column' height='100vh'>
        <Heading lineHeight={4} fontSize={25} fontWeight={550} mb={4}>
            Welcome to our music page
        </Heading>
        <CustomToast text={errMsg} display={display} background={'#eb4c4c'}/>
        <Text lineHeight={2} fontFamily={'Arial sans-serif'} marginBottom={2}>
            <strong>Embark on a melodic journey with us! 🎶</strong> <br />
            Sign up now to unlock a world of rhythm, harmony, and endless tunes.  🎵✨
        </Text>
        <InputField type="email" name="email" error={emailError} value={signUpForm.email} onChange={handleChange} placeholder="Type your email"/>
        <InputField type="password" name="password" error={passwordError} value={signUpForm.password} onChange={handleChange} placeholder="Type your password"/>
        <InputField type="password" name="cpassword" error={confirm} value={signUpForm.cpassword} onChange={handleChange} placeholder="Confirm password"/>
        <Button css={buttonStyle} onClick={() => {
            dispatch(signUpStart(signUpForm));
            setdisplay(true);
        }}> {auth.authenticating ? '...':"Sign Up"} </Button>
        <Text my={4}>
            Already have an account <CustomLink to='/login'>Login</CustomLink>
        </Text>
        <Button css={[buttonStyle, 'min-width: fit-content; padding: 3px 7px; align-self: end;']} onClick={() => navigate('/', {replace: true})}>
            Back to home page
        </Button>
    </Flex>)
}