import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const { login } = useContext(AppContext)
   const navigate = useNavigate();
  const [formData,setFormData] = useState({

    email: "",
    password: "",
  });


const onChangeHnadler = (e) => {
const { name, value } = e.target
setFormData({...formData,[name]:value})
    }
    const{name,email,password}=formData
 const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const res = await login( email, password);

    if (res.success) {
      setFormData({

        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/");
      }, 1600);
    }
  } catch (err) {
    console.log(err);
  }
};
    // Kuch nahi karna
    // Toast AppState me hi show ho jayega
  return (
       <div className="h-[calc(100dvh-80px)] bg-black flex items-center justify-center px-4 ">
        <div className="w-full max-w-md bg-black border-2 border-yellow-400 rounded-xl shadow-lg p-5 sm:p-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          User Login
        </h1>

        <form onSubmit={submitHandler} className="space-y-4">

          {/* Name */}


          {/* Email */}
          <div>
            <label htmlFor="exampleinputEmail" className="block text-white text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
             value={formData.email}
             aria-describedby="emailHelp"
             id="exampleinputEmail"
              onChange={onChangeHnadler}
              placeholder="Enter your email"
              className="w-full h-10 px-3 rounded-md bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="exampleinputEmail" className="block text-white text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
             onChange={onChangeHnadler}
            aria-describedby="emailHelp"
             id="exampleinputEmail"
              placeholder="Enter your password"
              className="w-full h-10 px-3 rounded-md bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <div className="flex justify-center pt-2">
           <button
  type="submit"
  className="w-full sm:w-52 h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
>
  Register
</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;