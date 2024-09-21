'use client';

import Layout from './Layout';
import Dashboard from './dashboard/page';
import UserProfile from './profile/[userId]/page';

export default function Home() {
  
  return (
    <div>
    <Layout>
      <Dashboard/>
      <UserProfile params={{
          userId: ''
        }}/>
    </Layout>
    </div>
  );
}
