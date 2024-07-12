import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { Fragment, useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  };

  const handleSubmit = async (e) => {
    e.preventDefault() // it prevent's refreshing when i click on Submit button
    if (!formData.username || !formData.userEmail || !formData.userPass) {
      return setErrorMessage("Please fill out all fields")
    }
    try{
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if (res.ok) {
        navigate('/signin')
      }
    } catch(er) {
      setErrorMessage(er.message ? er.message : er)
      setLoading(false)
    }
  }
  return (
    <Fragment>
      <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
          {/* {Left} */}
          <div className='flex-1'>
            <Link to="/" className=' font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Youssef's</span>
              Blog
            </Link>
              <p className='text-sm mt-5'>
                This is a graduation-project, You can signup with your email and password or with your Google account
              </p>

          </div>
          {/* {Right} */}
          <div className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div className=''>
                <Label value='Your Username' />
                <TextInput
                  type='text'
                  placeholder='username'
                  id='username'
                  onChange={handleChange}
                   />
              </div>

              <div className=''>
                <Label value='Your Email' />
                <TextInput
                  type='email'
                  placeholder='name@company.com'
                  id='userEmail'
                  onChange={handleChange}
                   />
              </div>

              <div className=''>
                <Label value='Your Password' />
                <TextInput
                  type='password'
                  placeholder='password'
                  id='userPass'
                  onChange={handleChange}
                   />
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                {
                  loading ? (
                    <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading</span>
                    </>
                    
                  ) : "SignUp"
                }
              </Button>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account?</span>
              <Link to='/signin' className='text-blue-600'>Sign In</Link>
            </div>
            {
              errorMessage && (
                <Alert className='mt-5' color='failure'>
                  {errorMessage}
                </Alert>
              )
            }
          </div>
        </div>
      </div>
    </Fragment>
  )
}
