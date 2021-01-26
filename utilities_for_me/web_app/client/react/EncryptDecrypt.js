import React, { useCallback, useState } from 'react'

const sendEncryptRequest = (message) => {
  const args = {
    method: 'post',
    body: JSON.stringify({ message }),
    headers: { 'Content-Type': 'application/json' }
  }
  const url = '/api/v1/encrypt-decrypt/encrypt'
  return window.fetch(url, args).then(res => res.json())
}

const sendDecryptRequest = (encryptedMessage, key) => {
  const args = {
    method: 'post',
    body: JSON.stringify({ encrypted_message: encryptedMessage, key: key }),
    headers: { 'Content-Type': 'application/json' }
  }
  const url = '/api/v1/encrypt-decrypt/decrypt'
  return window.fetch(url, args).then(res => res.json())
}

const EncryptDecryptHeader = () => {
  return (
    <section className='row mt-4'>
      <div className='col'>
        <div className='d-flex flex-column p-2 '>
          <h1>Encrypt / Decrypt</h1>
          <p>The <i>Encrypt / Decrypt</i> utility contains a utility that will allow you to encrypt a message and provides a means of decrypting that message via a key returned upon encryption.</p>
        </div>
      </div>
    </section>
  )
}

const ResultCard = ({ text }) => {
  return (
    <div className='card bg-dark my-2 p-4'>
      <h6><code className='text-success'>{text}</code></h6>
    </div>
  )
}

const EncryptBody = ({ messageToEncrypt, handleChange, handleClick }) => {
  return (
    <div className='col-md-6'>
      <div className='d-flex flex-column p-2 text-center'>
        <h3 className='text-start'>Message To Encrypt</h3>
        <textarea
          required
          rows='8'
          className='form-control my-3'
          placeholder='Message to encrypt here...'
          value={messageToEncrypt}
          onChange={handleChange}
        />
      </div>
      <div className='p-2'>
        <button className='btn btn-danger me-2 mb-3' onClick={handleClick} value='encrypt'>Encrypt 🔒</button>
      </div>
    </div>
  )
}

const EncryptResult = ({ encryptedMessage, encryptionKey }) => {
  return (
    <div className='col-md-6'>
      <div className='d-flex flex-column p-2'>
        <h3>Encrypted Message</h3>
        <ResultCard text={encryptedMessage} />
        <h3>Encryption Key</h3>
        <ResultCard text={encryptionKey} />
      </div>
    </div>
  )
}

const Encrypt = ({ messageToEncrypt, handleChange, handleClick, encryptedMessage, encryptionKey }) => {
  return (
    <div>
      <h2>Encrypt</h2>
      <section className='row mt-4'>
        <EncryptBody
          messageToEncrypt={messageToEncrypt}
          handleChange={handleChange}
          handleClick={handleClick}
        />
        <EncryptResult encryptedMessage={encryptedMessage} encryptionKey={encryptionKey} />
      </section>
    </div>

  )
}

const DecryptBody = ({
  messageToDecrypt,
  decryptionKey,
  handleMessageChange,
  handleKeyChange,
  handleClick
}) => {
  return (
    <div className='col-md-6'>
      <div className='d-flex flex-column p-2 text-center'>
        <h3 className='text-start'>Message To Decrypt</h3>
        <textarea
          required
          rows='8'
          className='form-control my-3'
          placeholder='Message to decrypt here...'
          value={messageToDecrypt}
          onChange={handleMessageChange}
        />
        <input
          required
          className='form-control my-3'
          placeholder='Key for decryption...'
          value={decryptionKey}
          onChange={handleKeyChange}
        />
      </div>
      <div className='p-2'>
        <button className='btn btn-success me-2 mb-3' onClick={handleClick} value='decrypt'>Decrypt 🔓</button>
      </div>
    </div>
  )
}

const DecryptResult = ({ decryptedMessage }) => {
  return (
    <div className='col-md-6'>
      <div className='d-flex flex-column p-2'>
        <h3>Decrypted Message</h3>
        <ResultCard text={decryptedMessage} />
      </div>
    </div>
  )
}

const Decrypt = ({
  messageToDecrypt,
  decryptionKey,
  handleMessageToDecryptChange,
  handleDecryptionKeyChange,
  handleClick,
  decryptedMessage
}) => {
  return (
    <div>
      <h2>Decrypt</h2>
      <section className='row mt-4'>
        <DecryptBody
          messageToDecrypt={messageToDecrypt}
          decryptionKey={decryptionKey}
          handleMessageChange={handleMessageToDecryptChange}
          handleKeyChange={handleDecryptionKeyChange}
          handleClick={handleClick}
        />
        <DecryptResult decryptedMessage={decryptedMessage} />
      </section>
    </div>

  )
}

function EncryptDecrypt () {
  const [messageToEncrypt, setMessageToEncrypt] = useState('')
  const [messageToDecrypt, setMessageToDecrypt] = useState('')
  const [decryptionKey, setDecryptionKey] = useState('')

  const [encryptedMessage, setEncryptedMessage] = useState('Encrypted Message Goes Here...')
  const [encryptionKey, setEncryptionKey] = useState('Encryption Key Goes Here...')
  const [decryptedMessage, setDecryptedMessage] = useState('Decrypted Message Goes Here...')

  const handleMessageToEncryptChange = (e) => setMessageToEncrypt(e.target.value)

  const handleMessageToDecryptChange = (e) => setMessageToDecrypt(e.target.value)

  const handleDecryptionKeyChange = (e) => {
    setDecryptionKey(e.target.value)
  }

  const handleEncryptClick = useCallback((e) => {
    e.preventDefault()
    sendEncryptRequest(messageToEncrypt)
      .then(json => {
        setEncryptedMessage(json.data.encrypted_message)
        setEncryptionKey(json.data.key)
      })
      .catch(err => console.error(err))
  }, [messageToEncrypt])

  const handleDecryptClick = useCallback((e) => {
    e.preventDefault()
    sendDecryptRequest(messageToDecrypt, decryptionKey)
      .then(json => setDecryptedMessage(json.data))
      .catch(err => console.error(err))
  }, [messageToDecrypt, decryptionKey])

  return (
    <div>
      <EncryptDecryptHeader />
      <hr />
      <Encrypt
        messageToEncrypt={messageToEncrypt}
        handleChange={handleMessageToEncryptChange}
        handleClick={handleEncryptClick}
        encryptedMessage={encryptedMessage}
        encryptionKey={encryptionKey}
      />
      <hr />
      <Decrypt
        messageToDecrypt={messageToDecrypt}
        handleMessageToDecryptChange={handleMessageToDecryptChange}
        handleDecryptionKeyChange={handleDecryptionKeyChange}
        handleClick={handleDecryptClick}
        decryptedMessage={decryptedMessage}
      />
    </div>
  )
}

export default EncryptDecrypt
