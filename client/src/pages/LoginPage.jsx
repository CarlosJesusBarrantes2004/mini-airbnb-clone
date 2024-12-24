import { useState } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import useMessage from '../hooks/useMessage';
import Alert from '../components/Alert';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin } = useUser();
  const { errors } = useMessage();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await signin({ email, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        {errors &&
          errors.map((error, i) => (
            <Alert key={i} message={error} type={'error'}></Alert>
          ))}
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSignin}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="primary">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{' '}
            <Link to={'/signup'} className="underline font-semibold">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
