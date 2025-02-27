import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { BsBoxArrowRight, BsSpeedometer2 } from "react-icons/bs";

interface UserProfileMenuProps {
    authStatus: string;
    session: Session | null;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ authStatus, session }) => {
    return (
        <div>
            {authStatus === "authenticated" ? (
                <div className='d-flex justify-content-end'>
                    Welcome {session?.user?.firstName} {session?.user?.lastName}
                    <Link href={`/${session?.user?.userType}`} className='pl-2'> <BsSpeedometer2 fontSize={18} /> Dashboard</Link>
                    <span onClick={() => signOut()} className='pl-2 cursor-pointer'> <BsBoxArrowRight fontSize={18} /> Logout</span>
                </div>
            ) : (
                <>
                    <Link href='/auth/login'>
                        <i className='bi bi-box-arrow-in-right'></i> Login
                    </Link>
                    <Link href='/auth/registrationprocess'>
                        <i className='bi bi-box-arrow-in-right'></i> Register
                    </Link>
                </>
            )}
        </div>
    );
};

export default UserProfileMenu;
