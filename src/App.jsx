import { useForm } from '@tanstack/react-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const validatePassword = (pwd) => {
  if (pwd.length < 6 || pwd.length > 18) return 'Password must be 6–18 characters.';
  if (!/[0-9]/.test(pwd)) return 'Password must include at least one number.';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return 'Password must include one special character.';
  return '';
};

const App = () => {
  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(value),
        });
        if (!res.ok) throw new Error();
        toast.success(`Logged in as: ${value.email}`);
        form.reset();
      } catch {
        toast.error('Login failed. Please try again.');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <form
        onSubmit={form.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4"
      >
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
            className="w-16 h-16 mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold text-gray-800">Login Page</h2>
        </div>

        {/* Email Field */}
        <form.Field name="email">
          {(field) => (
            <input
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Email"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
          )}
        </form.Field>

        {/* Password Field */}
        <form.Field name="password" validators={{ validatePassword }}>
          {(field) => (
            <>
              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Password"
                required
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
              />
              {field.state.meta.errors.length > 0 && (
                <span className="text-red-500">{field.state.meta.errors[0]}</span>
              )}
            </>
          )}
        </form.Field>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={form.state.isSubmitting}
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition ${
            form.state.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {form.state.isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      </form>
    </div>
  );
};

export default App;
