import React from 'react'
import Sidebar from './Layout/Sidebar';
import Header from './Layout/Header';


const  Dashboard = () => {
  return (
        <>
        <Header />
        <Sidebar />
        <h1>Welcome</h1>
        <p>Hello Ali, welcome to your first Inertia app Dashboard!</p>

        </>
  )
}

export default Dashboard;
