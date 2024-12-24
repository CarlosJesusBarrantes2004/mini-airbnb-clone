import { useState } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import useMessage from '../hooks/useMessage';
import Alert from '../components/Alert';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useUser();
  const { errors } = useMessage();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({ username, email, password });
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
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Jhon Doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{' '}
            <Link to={'/signin'} className="underline font-semibold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
