import { useContext, useEffect, useState } from 'react'
import { FeedContext } from '../../FeedContext'
import Alert from '../../../../components/Alert/Alert'
import Button from '../../../../components/Button/Button'
import Textarea from '../../../../components/Input/Textarea/Textarea'
import { validText } from '../../../../scripts/validator/responses'
import { publishResponse } from '../../../../modules/response'
import './FeedResponseAlert.css'

export default function FeedResponseAlert() {
  const { feed, responses, setResponses } = useContext(FeedContext)
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState({ btn: true, form: false })

  useEffect(() => {
    const isValidText = validText(text)
    setDisabled({ btn: !isValidText.ok, form: false })
  }, [text])

  async function publish(e) {
    e.preventDefault()
    setDisabled({ ...disabled, form: true })
    const res = await publishResponse(feed.uid, text)

    if (!res.ok) {
      setDisabled({ ...disabled, form: false })
      setError(res.message)
    }

    setResponses({
      ...responses,
      responding: false,
      data: [...responses.data, { created_at: new Date().toISOString(), text }],
    })
  }

  return (
    <>
      <Alert onClose={() => setResponses({ ...responses, responding: false })}>
        <form onSubmit={publish} disabled={disabled.form}>
          <div>New reponse</div>
          <hr className="h" />
          {error && (
            <div className="feed_response_alert_error_text d_f_ce">{error}</div>
          )}
          <Textarea
            autoFocus
            placeholder="Response text"
            onChange={(e) => {
              setError('')
              setText(e.target.value)
            }}
          />
          <Button
            disabled={disabled.btn}
            className="feed_response_alert_btn"
            onClick={publish}
          >
            Publish
          </Button>
        </form>
      </Alert>
    </>
  )
}
