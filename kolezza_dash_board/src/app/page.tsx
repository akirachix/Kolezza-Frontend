
import AddPatients from './components/AddPatients';
import PatientDashboard from './components/PatientDashboard';
import Layout from './Layout';

export default function Home() {
  return (
    <Layout>
      <PatientDashboard/>
      <AddPatients/>
    </Layout>
  );
}
