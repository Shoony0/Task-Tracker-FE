import { UserType } from "@/utils/types";

function Profile({ profileData }: Readonly<{ profileData: UserType }>) {
    // Destructure user details from the profileData prop
    const { first_name, last_name, email, roles } = profileData;
    return (
        <section>
            <h2>User Profile</h2>
            <form className="profile-form">
                <div>
                    <input type="text" name="first_name" placeholder="First Name" defaultValue={first_name} disabled />
                    <input type="text" name="last_name" placeholder="Last Name" defaultValue={last_name} disabled />
                    <input type="email" placeholder="Email Address" defaultValue={email} disabled />
                </div>
                <div >
                    <b>Roles: </b>

                    {
                        roles.map((role, index) => {
                            return <span key={role.id}>{role.name}{roles.length - 1 !== index && ', '}</span>;
                        })

                    }
                </div>
            </form>

        </section>
    );
};

export default Profile;
