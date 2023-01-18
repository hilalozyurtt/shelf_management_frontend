import { useContext, useState } from "react";
import AuthContext from "@/context/authContext";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from 'next/navigation';
import { LOGIN_USER } from "@/modules/resolvers/userResolvers";



function Login(props :any) {
	const router = useRouter();
	const context = useContext(AuthContext)
	const [values, setValues] = useState({email:"",password:""})

	const onChange = (e :any) => {
		setValues({ ...values, [e.target.name]: e.target.value })
    console.log(values);
    
	}
	const onSubmit = (e:any) => {
		e.preventDefault()
		loginUser()
	}
	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(proxy, { data: { loginUser: userData } }) {
			context.login(userData)
			router.push("/")
		},
		variables: {
			input:{
        email:values.email,
				password:values.password

      }
		}
	})

	return (
			<div className="">
				<h3>login</h3>
				<form>
					<input name="email" onChange={onChange} />
					<input name="password" onChange={onChange} />
					<button onClick={onSubmit}>Giriş</button>
				</form>
			</div>
	)
}

export default Login