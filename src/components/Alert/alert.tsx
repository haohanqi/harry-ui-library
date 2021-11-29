import classNames from "classnames"
import React, { useState } from "react"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export type AlertType = "success" | "default" | "danger" | "warning"

export interface AlertProps {
  alert_type?: AlertType
  alert_title: string
  alert_description?: string
  close_able?: boolean
  className?: string
  onClose?: () => void
}

const Alert: React.FC<AlertProps> = ({
  alert_type,
  alert_title,
  alert_description,
  close_able,
  className,
  onClose,
}) => {
  const [hide, setHide] = useState(false)
  const classnames = classNames("alert", className, {
    [`alert-${alert_type}`]: alert_type,
  })
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setHide(!hide)
  }

  return (
    <>
      {!hide && (
        <div className={classnames} role="alert">
          <h3>{alert_title}</h3>
          {alert_description && <p>{alert_description}</p>}
          {close_able && (
            <span className="alert-close" onClick={handleClose} role="button">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          )}
        </div>
      )}
    </>
  )
}

Alert.defaultProps = {
  alert_type: "default",
  close_able: true,
}

export default Alert
