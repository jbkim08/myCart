import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '../../services/userServices';
import './LoginPage.css';

const LoginPage = () => {
	const [formError, setFormError] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitData = async (formData) => {
		try {
			await login(formData);

			window.location = '/';
		} catch (err) {
			setFormError(err.response.data.message);
		}
	};

	return (
		<section className='align_center form_page'>
			<form className='authentication_form' onSubmit={handleSubmit(submitData)}>
				<h2>로그인 폼</h2>
				<div className='form_inputs'>
					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							className='form_text_input'
							placeholder='이메일 입력...'
							{...register('email', { required: '이메일을 이력해주세요.' })}
						/>
						{errors.email && <em className='form_error'>{errors.email.message}</em>}
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							className='form_text_input'
							placeholder='패스워드 입력...'
							{...register('password', {
								required: '패스워드를 입력해주세요.',
								minLength: { value: 8, message: '패스워드는 최소 8자 이상.' },
							})}
						/>
						{errors.password && <em className='form_error'>{errors.password.message}</em>}
					</div>

					{formError && <em className='form_error'>{formError}</em>}

					<button type='submit' className='search_button form_submit'>
						Submit
					</button>
				</div>
			</form>
		</section>
	);
};

export default LoginPage;
