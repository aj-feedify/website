import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input/Input'
import {
  validName,
  validPassword,
  validUsername,
} from '../../../scripts/validator/user'
import '../Signup&Login.css'

export default function Signup() {
  const [form, setForm] = useState({})
  const [disabled, setDisabled] = useState({ btn: true, con: false })

  async function signup(e) {
    e.preventDefault()
  }

  function handleChanges(e) {
    const newForm = {
      ...form,
      [e.target.getAttribute('name')]: e.target.value,
    }
    setForm(newForm)

    const isValidName = validName(newForm.name || '')
    const isValidUsername = validUsername(newForm.username || '')
    const isValidPassword = validPassword(newForm.password || '')

    setDisabled({
      ...disabled,
      btn: !(
        isValidName.ok &&
        isValidUsername.ok &&
        isValidPassword.ok &&
        newForm.password === newForm.confirm_password
      ),
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
