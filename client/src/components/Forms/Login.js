import { useContext, useState } from "react";
import { authContext } from "../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  // console.log(useContext(authContext));
  const { loginUserAction, userAuth, error } = useContext(authContext);
  //form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  //onChnage
  const onChangeInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //submit
  const onSubmitHandler = e => {
    e.preventDefault();
    if (!email || !password ) {
      return alert("Please provide all details");
    }

    //dispatch action
    loginUserAction(formData);
  };
  // console.log(userAuth);
  return (
    <>
      <section className="py-24 md:py-32 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-sm mx-auto">
            <div className="mb-6 text-center">
              <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                Sign in to your account
              </h3>
              <p>
                {/* {userAuth?.error && (
                  <span className="text-red-500">{userAuth?.error}</span>
                )} */} 
                {error && (
                  <span className="text-red-500">{error}</span>
                )}
              </p>
            </div>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-6">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor
                >
                  Email
                </label>
                <input
                  onChange={onChangeInput}
                  value={email}
                  name="email"
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lgshadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="email"
                  placeholder="i-novotek@gmail.com"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={onChangeInput}
                  name="password"
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lgshadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="password"
                  placeholder="************"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between mb-6">
                <div className="w-full md:w-1/2">
                  <label className="relative inline-flex items-center">
                    <input
                      className="form-checkbox appearance-none"
                      type="checkbox"
                    />
                  </label>
                </div>
              </div>
              <button
                className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                type="submit"
              >
                Sign In
              </button>
              
            </form>
            <p className="text-center">
                <span className="text-xs font-medium">
                  Don’t have an account? {" "}
                </span>
                <Link
                  to="/register"
                  className="inline-block text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
