import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input/Input'
import { validLoginUser } from '../../../scripts/validator/user'
import { loginUser } from '../../../modules/user'
import { saveToLocalDb } from '../../../scripts/localDb/localDb'
import '../Signup&Login.css'

export default function Login() {
  const [form, setForm] = useState({})
  const [disabled, setDisabled] = useState({ btn: true, con: false })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function login(e) {
    e.preventDefault()

    setDisabled({ ...disabled, con: true })
    const res = await loginUser(form.username, form.password)

    if (!res.ok) {
      setDisabled({ ...disabled, con: false })
      setError(res.message)
      return
    }

    saveToLocalDb('user_id', res.data.id)
    navigate('/')
  }

  function handleChanges(e) {
    const newForm = {
      ...form,
      [e.target.getAttribute('name')]: e.target.value,
    }
    setForm(newForm)
    setError('')

    const isValidUser = validLoginUser(newForm.username, newForm.password)

    setDisabled({
      ...disabled,
      btn: !isValidUser.ok,
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
          {error && <div className="signup_login_error_txt">{error}</div>}
          <Button onClick={login} disabled={disabled.btn}>
            Login
          </Button>
        </form>
        <div></div>
        <div className="signup_login_subtext">
          Do not have an account?{' '}
          <Link to="/sign-up" className="clr clr_h">
            Create one
          </Link>
        </div>
      </div>
    </>
  )
}
