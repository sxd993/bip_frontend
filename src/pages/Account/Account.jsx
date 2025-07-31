import { useCurrentUser } from '../../hooks/useCurrentUser';
import { LegalAccount } from './Legal/LegalAccount';
import { PhysicalAccount } from './Physical/PhysicalAccount';
const Account = () => {
  const { data: user, error, isLoading } = useCurrentUser();
  console.log(JSON.stringify(user));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        {user.user_type === 'legal' ? <LegalAccount user={user} /> : <PhysicalAccount user={user} />}
      </div>
    </>
  );
};

export default Account;
