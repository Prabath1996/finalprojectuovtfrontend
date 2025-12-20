import { useState} from "react";
import { Lock, User, MapPinned, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();

  // Validation schemas
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const registerValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 md:p-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Info */}
          {/* Left Side - Branding & Info */} <div className="text-white order-2 md:order-1 flex flex-col justify-center"> <div className="flex items-center gap-2 mb-4"> <MapPinned className="w-8 h-8 text-cyan-400" /> <h1 className="text-3xl md:text-4xl font-bold">GuideBuddy</h1> </div> <p className="text-gray-300 text-lg mb-8"> Discover amazing destinations and share your travel stories with fellow tourist guiders. </p> <div className="space-y-4"> <div className="flex items-start gap-3"> <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0 mt-1"> <ArrowRight className="w-5 h-5 text-cyan-400" /> </div> <div> <h3 className="font-semibold text-white"> Explore Destinations </h3> <p className="text-sm text-gray-400"> Find hidden gems and popular attractions </p> </div> </div> <div className="flex items-start gap-3"> <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-1"> <ArrowRight className="w-5 h-5 text-emerald-400" /> </div> <div> <h3 className="font-semibold text-white"> Share Experiences </h3> <p className="text-sm text-gray-400"> Connect with other tourist guiders worldwide </p> </div> </div> <div className="flex items-start gap-3"> <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-1"> <ArrowRight className="w-5 h-5 text-blue-400" /> </div> <div> <h3 className="font-semibold text-white"> Plan Your Journey </h3> <p className="text-sm text-gray-400"> Create itineraries and save your favorites </p> </div> </div> </div> </div>

          {/* Right Side - Auth Forms */}
          <div className="order-1 md:order-2">
            <div className="relative h-full">
              <div className="perspective">
                {/* Login Form */}
                <div
                  className={`transition-all duration-500 transform ${
                    isLogin
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 translate-x-full pointer-events-none absolute"
                  }`}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-300 text-sm mb-8">Log in to continue your travel journey</p>
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={loginValidationSchema}
                      onSubmit={async (values, { setSubmitting }) => {
  try {
    await loginValidationSchema.validate(values, { abortEarly: false });
    toast.success("Logged in successfully!");
    navigate("/dashboard"); // redirect after login
  } catch (err) {
    // Check if err.inner exists (Yup ValidationError)
    if (err.inner && Array.isArray(err.inner)) {
      err.inner.forEach((error) => toast.error(error.message));
    } else {
      toast.error(err.message || "Something went wrong!");
    }
  } finally {
    setSubmitting(false);
  }
}}

                    >
                      {({ isSubmitting, errors, touched, validateForm }) => (
                        <Form className="space-y-5">
                          {/* Email Field */}
                          <div>
                            <label className="block text-white text-sm font-medium mb-2">Email</label>
                            <div className="relative">
                              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                              <Field
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border ${
                                  errors.email && touched.email ? "border-red-500" : "border-white/20"
                                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition`}
                              />
                            </div>
                          </div>

                          {/* Password Field */}
                          <div>
                            <label className="block text-white text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                              <Field
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                className={`w-full pl-10 pr-12 py-3 rounded-lg bg-white/10 border ${
                                  errors.password && touched.password ? "border-red-500" : "border-white/20"
                                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          {/* Login Button */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            onClick={async () => {
                              await validateForm();
                              if (errors.email) toast.error(errors.email);
                              if (errors.password) toast.error(errors.password);
                            }}
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? "Logging in..." : "Log In"}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </Form>
                      )}
                    </Formik>
                    <p className="text-center text-gray-300 text-sm mt-4">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
                      >
                        Sign Up
                      </button>
                    </p>
                  </div>
                </div>

                {/* Register Form */}
                <div
                  className={`transition-all duration-500 transform ${
                    !isLogin
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 -translate-x-full pointer-events-none absolute"
                  }`}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-gray-300 text-sm mb-8">Join our community of travel guiders</p>
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={registerValidationSchema}
                      onSubmit={async (values, { setSubmitting }) => {
                        try {
                          await registerValidationSchema.validate(values, { abortEarly: false });
                          toast.success("Registered successfully!");
                        } catch (err) {
                          err.inner.forEach((error) => toast.error(error.message));
                        } finally {
                          setSubmitting(false);
                        }
                      }}
                    >
                      {({ isSubmitting, errors, touched, validateForm }) => (
                        <Form className="space-y-5">
                          {/* Email Field */}
                          <div>
                            <label className="block text-white text-sm font-medium mb-2">Email</label>
                            <div className="relative">
                              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                              <Field
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border ${
                                  errors.email && touched.email ? "border-red-500" : "border-white/20"
                                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition`}
                              />
                            </div>
                          </div>

                          {/* Password Field */}
                          <div>
                            <label className="block text-white text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                              <Field
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                className={`w-full pl-10 pr-12 py-3 rounded-lg bg-white/10 border ${
                                  errors.password && touched.password ? "border-red-500" : "border-white/20"
                                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          {/* Register Button */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            onClick={async () => {
                              await validateForm();
                              if (errors.email) toast.error(errors.email);
                              if (errors.password) toast.error(errors.password);
                            }}
                            className="w-full bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? "Registering..." : "Create Account"}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </Form>
                      )}
                    </Formik>
                    <p className="text-center text-gray-300 text-sm mt-4">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-emerald-400 hover:text-emerald-300 font-semibold transition"
                      >
                        Log In
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
