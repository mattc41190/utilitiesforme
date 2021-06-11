import React, { useCallback, useState } from 'react'
import Button from './common/Button'
import Textarea from './common/Textarea'
import COLORS from './lib/colors'

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
    <section className='p-2'>
      <h1 className='text-5xl font-light mb-3'>Encrypt / Decrypt</h1>
      <p>The <i>Encrypt / Decrypt</i> utility contains a utility that will allow you to encrypt a message and provides a means of decrypting that message via a key returned upon encryption.</p>
    </section>
  )
}

const ResultCard = ({ text }) => {
  return (
    <div className='w-full'>
      <div className='p-8 rounded-sm break-words text-center text-lg bg-gray-800 text-green-600'>
        <div>{text}</div>
      </div>
    </div>
  )
}

const EncryptBody = ({ messageToEncrypt, handleChange, handleClick }) => {
  return (
    <section className='w-full md:w-6/12'>
      <div className='font-semibold'>Message To Encrypt</div>
      <Textarea
        value={messageToEncrypt}
        placeholder='Message to encrypt here...'
        handleChange={handleChange}
      />
      <Button
        color={COLORS.red}
        hoverColor={COLORS.redHover}
        handleClick={handleClick}
        label='Encrypt 🔒'
        value='encrypt'
      />
    </section>
  )
}

const EncryptResult = ({ encryptedMessage, encryptionKey }) => {
  return (
    <div className='w-full md:w-5/12'>
      <div className='flex flex-col p-2'>
        <div className='font-semibold text-lg mb-3'>Encrypted Message</div>
        <ResultCard text={encryptedMessage} />
        <div className='mt-3 font-semibold text-lg mb-3'>Encryption Key</div>
        <ResultCard text={encryptionKey} />
      </div>
    </div>
  )
}

const Encrypt = ({ messageToEncrypt, handleChange, handleClick, encryptedMessage, encryptionKey }) => {
  return (
    <div className='p-2 mb-8 mt-5'>
      <div className='text-xl font-semibold'>Encrypt</div>
      <section className='flex flex-col w-full md:flex-row md:justify-between'>
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
  const textClasses = 'text-theme-input-primary placeholder-theme-input-primary'
  const borderClasses = 'rounded-md border-2 border-theme-input-primary-complement focus:border-theme-emphasis-fill focus:outline-none focus:ring-1 focus:ring-skin-emphasis-fill'

  return (
    <div className='w-full md:w-6/12'>
      <div>Message To Decrypt</div>
      <Textarea
        value={messageToDecrypt}
        placeholder='Message to decrypt here...'
        handleChange={handleMessageChange}
      />
      <input
        className={`w-full p-2 bg-theme-input-primary-fill ${textClasses} ${borderClasses}`}
        placeholder='Key for decryption...'
        value={decryptionKey}
        onChange={handleKeyChange}
      />
      <div className='py-2'>
        <Button
          color={COLORS.green}
          hoverColor={COLORS.greenHover}
          handleClick={handleClick}
          label='Decrypt 🔓'
          value='decrypt'
        />
      </div>
    </div>
  )
}

const DecryptResult = ({ decryptedMessage }) => {
  return (
    <div className='w-full md:w-5/12'>
      <div className='font-semibold text-lg mb-3'>Decrypted Message</div>
      <ResultCard text={decryptedMessage} />
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
    <section className='p-2 mb-8'>
      <div className='text-xl font-semibold'>Decrypt</div>
      <div className='p-2 flex flex-col w-full md:flex-row md:justify-between'>
        <DecryptBody
          messageToDecrypt={messageToDecrypt}
          decryptionKey={decryptionKey}
          handleMessageChange={handleMessageToDecryptChange}
          handleKeyChange={handleDecryptionKeyChange}
          handleClick={handleClick}
        />
        <DecryptResult decryptedMessage={decryptedMessage} />
      </div>
    </section>

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
    <div className='mt-6 text-skin-primary'>
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
