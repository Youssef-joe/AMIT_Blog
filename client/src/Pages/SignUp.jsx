import { Button, Label, TextInput } from 'flowbite-react'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
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
            <form className='flex flex-col gap-4'>
              <div className=''>
                <Label value='Your Username' />
                <TextInput
                  type='text'
                  placeholder='username'
                  id='username' />
              </div>

              <div className=''>
                <Label value='Your Email' />
                <TextInput
                  type='email'
                  placeholder='name@company.com'
                  id='userEmail' />
              </div>

              <div className=''>
                <Label value='Your Password' />
                <TextInput
                  type='text'
                  placeholder='password'
                  id='userPass' />
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit'>Sign Up</Button>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account?</span>
              <Link to='/signin' className='text-blue-600'>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}