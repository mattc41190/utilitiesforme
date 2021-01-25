import React, { useCallback, useState } from 'react'

const sendEncryptRequest = (contents) => {
  const args = {
    method: 'post',
    body: JSON.stringify({ message: contents }),
    headers: { 'Content-Type': 'application/json' }
  }
  const url = '/api/v1/encrypt-decrypt/encrypt'
  return window.fetch(url, args).then(res => res.json())
}

const sendDecryptRequest = (contents, key) => {
  console.log(key);
  const args = {
    method: 'post',
    body: JSON.stringify({ encrypted_message: contents, key: key }),
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

const EncryptResult = ({ encryptedMessage, _key }) => {
  return (
    <div className="col-md-6">
      <div className='d-flex flex-column p-2'>
        <h3>Encrypted Message</h3>
        <div className='card bg-dark my-2 p-4'>
          <h6><code className='text-success'>{encryptedMessage}</code></h6>
        </div>
        <h3>Encryption Key</h3>
        <div className='card bg-dark my-2 p-4'>
          <h6><code className='text-success'>{_key}</code></h6>
        </div>
      </div>
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
    <div className="col-md-6">
      <div className='d-flex flex-column p-2'>
        <h3>Decrypted Message</h3>
        <div className='card bg-dark my-2 p-4'>
          <h6><code className='text-success'>{decryptedMessage}</code></h6>
        </div>
      </div>
    </div>
  )
}

const Encrypt = ({messageToEncrypt, handleChange, handleClick, encryptedMessage, _key}) => {
  return (
    <div>
      <h2>
        Encrypt
      </h2>
    <section className="row mt-4">
      <EncryptBody messageToEncrypt={messageToEncrypt} handleChange={handleChange} handleClick={handleClick} />
      <EncryptResult encryptedMessage={encryptedMessage} _key={_key} />
    </section>
    </div>

  )
}

const Decrypt = ({messageToDecrypt, decryptionKey, handleMessageToDecryptChange, handleDecryptionKeyChange, handleClick, decryptedMessage}) => {
  return (
    <div>
      <h2>
        Decrypt
      </h2>
    <section className="row mt-4">
      <DecryptBody 
      messageToDecrypt={messageToDecrypt} 
      decryptionKey={decryptionKey} 
      handleMessageChange={handleMessageToDecryptChange} 
      handleKeyChange={handleDecryptionKeyChange} 
      handleClick={handleClick} />
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
  const [_key, setKey] = useState('Encryption Key Goes Here...')
  const [decryptedMessage, setDecryptedMessage] = useState("Decrypted Message Goes Here...")


  const handleChange = (e) => setMessageToEncrypt(e.target.value)
  const handleMessageToDecryptChange = (e) => setMessageToDecrypt(e.target.value)
  const handleDecryptionKeyChange = (e) => {
    console.log(e.target.value)
    setDecryptionKey(e.target.value)
  }


  const handleEncryptClick = useCallback((e) => {
    e.preventDefault()
    sendEncryptRequest(messageToEncrypt)
      .then(json => { 
        setEncryptedMessage(json.data.encrypted_message) 
        setKey(json.data.key)
      })
      .catch(err => console.error(err))
  }, [messageToEncrypt])

  const handleDecryptClick = useCallback((e) => {
    console.log(decryptionKey);
    e.preventDefault()
    sendDecryptRequest(messageToDecrypt, decryptionKey)
      .then(json => { 
        setDecryptedMessage(json.data) 
      })
      .catch(err => console.error(err))
  }, [messageToDecrypt, decryptionKey])

  return (
    <div>
      <EncryptDecryptHeader />
      <hr />
      <Encrypt 
        messageToEncrypt={messageToEncrypt} 
        handleChange={handleChange} 
        handleClick={handleEncryptClick} 
        encryptedMessage={encryptedMessage}
        _key={_key}
      />
      <hr/>
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