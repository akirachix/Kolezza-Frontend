import PatientDashboard from "../PatientList/page";
import Layout from "../../../Layout";
// import AddPatients from "../PatientOnboarding/add_patient";

export default function Home() {
  return (
    <Layout>
      <PatientDashboard />
      {/* <AddPatients /> */}
    </Layout>
  );
}
