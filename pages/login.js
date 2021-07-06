import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    };
    return (
        <Container>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LoginContainer>
                <Logo src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1.png" />
                <Button variant="outlined" onClick={signIn}>
                    Sign in with Google
        </Button>
            </LoginContainer>
        </Container>
    );
}

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;
const LoginContainer = styled.div`
  padding: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
