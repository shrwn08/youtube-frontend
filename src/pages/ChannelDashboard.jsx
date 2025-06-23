import React from 'react'
import { useSelector } from 'react-redux'

const ChannelDashboard = () => {
  const {user} = useSelector(state=>state.user)
  console.log(user)
  return (
    <div>ChannelDashboard</div>
  )
}

export default ChannelDashboard