"use client";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header() {
    return (
        <div className="w-full bg-slate-800 h-[50px] md:h-[60px] items-center px-4 md:px-8 flex justify-between">
            <h3 className="text-[13.5px] md:text-base text-white font-medium">CRUD Next Application</h3>

            <div className="flex justify-between">
                <AccountCircleIcon className='text-white md:mr-2' />
                <h3 className="hidden md:inline-block text-[13.5px] md:text-base text-white font-medium">My Profile</h3>
            </div>
        </div>
    )
}