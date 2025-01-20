import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input/Input'
import { validSignupUser } from '../../../scripts/validator/user'
import { signupUser } from '../../../modules/user'
import { saveToLocalDb } from '../../../scripts/localDb/localDb'
import '../Signup&Login.css'

export default function Signup() {
  const [form, setForm] = useState({})
  const [disabled, setDisabled] = useState({ btn: true, con: false })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function signup(e) {
    e.preventDefault()

    setDisabled({ ...disabled, con: true })
    const res = await signupUser(form.name, form.username, form.password)

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

    const isValidUser = validSignupUser(
      newForm.name,
      newForm.username,
      newForm.password,
      newForm.confirm_password
    )

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
        <form onSubmit={signup} className="list_y">
          <h1>Signup</h1>
          <Input
            placeholder="Name"
            name="name"
            autoComplete="name"
            onChange={handleChanges}
          />
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
            autoComplete="new-password"
            onChange={handleChanges}
          />
          <Input
            placeholder="Confirm password"
            type="password"
            name="confirm_password"
            autoComplete="new-password"
            onChange={handleChanges}
          />
          {error && <div className="signup_login_error_txt">{error}</div>}
          <Button onClick={signup} disabled={disabled.btn}>
            Signup
          </Button>
        </form>
        <div></div>
        <div className="signup_login_subtext">
          Already have an account?{' '}
          <Link to="/login" className="clr clr_h">
            Login here
          </Link>
        </div>
      </div>
    </>
  )
}
