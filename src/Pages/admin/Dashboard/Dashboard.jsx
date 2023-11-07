import React, { useContext } from 'react'
import {FaUserTie } from 'react-icons/fa';
import myContext from '../../../Context/myContext';
import Layout from '../../../Components/Layout/Layout';
import DashboardTab from './DashnoardTabs';

function Dashboard() {
    const context = useContext(myContext)
    const { mode} = context
  return (
    <Layout>
        <section className="text-gray-600 body-font mt-10 mb-10">
            <DashboardTab/>
        </section>
    </Layout>
  )
}

export default Dashboard