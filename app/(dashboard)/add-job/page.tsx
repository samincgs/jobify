import { UserButton } from '@clerk/nextjs';

const AddJobPage = () => {
  return (
    <div>
      <h1>AddJobPage</h1>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};
export default AddJobPage;
