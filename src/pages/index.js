import WorkoutsTable from '@/components/workouts/workoutsTable';
import Head from 'next/head';

const WorkoutsPage = () => {
  return (
    <div>
      <Head>
        <title>Workouts</title>
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Workouts</h1>
        <WorkoutsTable />
      </main>
    </div>
  );
};

export default WorkoutsPage;
