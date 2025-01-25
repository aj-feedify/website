import { useState } from 'react'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input/Input'
import { updateUserName } from '../../../modules/user'

export default function ProfileName({ name }) {
  const [updating, setUpdating] = useState({
    status: false,
    pending: false,
    originalName: name,
    newName: name,
    error: '',
  })

  async function updateName(e) {
    e.preventDefault()

    if (updating.originalName === updating.newName) {
      setUpdating({ ...updating, error: 'No changes made' })
      return
    }

    setUpdating({ ...updating, pending: true })
    const res = await updateUserName(updating.newName)

    if (!res.ok) {
      setUpdating({ ...updating, error: res.message })
      setUpdating({ ...updating, pending: false })
      return
    }

    const newName = updating.newName

    setUpdating({
      ...updating,
      originalName: newName,
      newName: newName,
      status: false,
    })
  }

  if (updating.status) {
    return (
      <>
        <form
          onSubmit={updateName}
          className="profile_change_name d_f_ai_ce list_y"
          disabled={updating.pending}
        >
          <div className="profile_change_name_input_con list_x d_f_ai_ce">
            <Input
              placeholder="Enter new name"
              autoFocus
              value={updating.newName}
              onChange={(e) =>
                setUpdating({ ...updating, newName: e.target.value, error: '' })
              }
            />
            <Button
              type="button"
              onClick={() =>
                setUpdating({
                  ...updating,
                  status: false,
                  newName: updating.originalName,
                })
              }
            >
              cancel
            </Button>
          </div>
          {updating.error && (
            <div className="profile_change_name_error">{updating.error}</div>
          )}
          <Button
            className="profile_change_name_save_btn"
            disabled={updating.originalName === updating.newName}
          >
            Save
          </Button>
        </form>
      </>
    )
  }

  return (
    <>
      <div className="profile_name list_x d_f_ai_ce d_f_jc_sb">
        <Button disabled>change</Button>
        <span>{updating.originalName}</span>
        <Button onClick={() => setUpdating({ ...updating, status: true })}>
          change
        </Button>
      </div>
    </>
  )
}
