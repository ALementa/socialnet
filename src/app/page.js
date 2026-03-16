import { getUser } from "@/utils/getUser";

export default async function Home() {
  const userDetails = await getUser();
  const user = userDetails[0];
  return (
    <div>
      <p>Welcome {user.username}</p>
      <p>This is some exciting landing page!</p>
    </div>
  );
}
