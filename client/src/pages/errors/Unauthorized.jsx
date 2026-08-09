import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import { HiOutlineShieldExclamation } from 'react-icons/hi';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-lg border border-border text-center"
      >
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-6">
          <HiOutlineShieldExclamation size={40} />
        </div>

        <h1 className="text-3xl font-heading font-bold text-text-primary mb-3">
          Access Denied
        </h1>

        <p className="text-text-secondary font-body mb-8">
          You do not have permission to view this page. Please log in with an account that has the required privileges or return to safety.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="secondary" className="w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
