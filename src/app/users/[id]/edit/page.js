import { db } from "@/utils/connect";
import { notFound } from "next/navigation";
import EditProfileForm from "@/components/EditProfileForm";

export default async function EditProfilePage({ params }) {
  const { id } = await params;

  const user = (
    await db.query(`SELECT * FROM user_account WHERE clerk_id=$1`, [id])
  ).rows[0];

  if (!user) notFound();

  return (
    <div>
      <h1>Edit profile</h1>
      <EditProfileForm user={user} />
    </div>
  );
}
