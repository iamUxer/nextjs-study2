import GoogleLogin from 'components/GoogleLogin';

const SignIn = () => {
  return (
    <GoogleLogin />
    // <GoogleLogin
    //   onSuccess={(credentialResponse) => {
    //     fetch(`/api/auth/sign-in?credential=${credentialResponse.credential}`)
    //       .then((res) => res.json())
    //       .then((data) => console.log('credentialResponse', data));
    //   }}
    //   onError={() => {
    //     console.log('Login Failed');
    //   }}
    // />
  );
};

export default SignIn;
