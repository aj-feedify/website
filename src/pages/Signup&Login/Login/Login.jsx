import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input/Input'
import { validPassword, validUsername } from '../../../scripts/validator/user'
import '../Signup&Login.css'

export default function Login() {
  const [form, setForm] = useState({})
  const [disabled, setDisabled] = useState({ btn: true, con: false })

  async function login(e) {
    e.preventDefault()
  }

  function handleChanges(e) {
    const newForm = {
      ...form,
      [e.target.getAttribute('name')]: e.target.value,
    }
    setForm(newForm)

    const isValidUsername = validUsername(newForm.username || '')
    const isValidPassword = validPassword(newForm.password || '')

    setDisabled({
      ...disabled,
      btn: !(isValidUsername.ok && isValidPassword.ok),
    })
  }

  return (
    <>
      <div
        className="container container_content signup_login_con d_f_ce list_y"
        disabled={disabled.con}
      >
        <form onSubmit={login} className="list_y">
          <h1>Login</h1>
          <Input
            placeholder="Username"
            name="username"
            autoComplete="username"
            onChange={handleChanges}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={handleChanges}
          />
          <Button onClick={login} disabled={disabled.btn}>
            Login
          </Button>
        </form>
        <div></div>
        <div className="signup_login_subtext">
          Do not have an account?{' '}
          <Link to="/signup" className="clr clr_h">
            Create one
          </Link>
        </div>
      </div>
    </>
  )
}
