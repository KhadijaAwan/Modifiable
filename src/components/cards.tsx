"use client";
import { NextPage } from 'next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { cardButtonStyle, cardMarginStyle, cardStyle, cardsFontStyle, flexCenter, iconStyle } from './styles';
import { useUser } from './context';

interface cardProps {
    totalUsers: any;
}

const Cards: NextPage<cardProps> = ({ totalUsers }) => {
    const { currentPage, setCurrentPage, itemsPerPage, editUser, deleteUser } = useUser();

    const maxPage = Math.ceil(totalUsers.length / itemsPerPage);

    const currentTableData = totalUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            {currentTableData.map((users: any, index: number) => (
                <div className={`${cardStyle}`} key={users._id}>
                    <div className={`${cardsFontStyle}`}>
                        <h4 className={`${cardMarginStyle}`}>S.No: </h4>
                        <p>{(currentPage - 1) * itemsPerPage + index + 1}</p>
                    </div>
                    <div className={`${cardsFontStyle}`}>
                        <h4 className={`${cardMarginStyle}`}>Name: </h4>
                        <p>{users.fullname}</p>
                    </div>
                    <div className={`${cardsFontStyle}`}>
                        <h4 className={`${cardMarginStyle}`}>Address: </h4>
                        <p>{users.address}</p>
                    </div >
                    <div className={`${cardsFontStyle}`}>
                        <h4 className={`${cardMarginStyle}`}>Profession: </h4>
                        <p>{users.profession}</p>
                    </div>
                    <div className={`${cardsFontStyle}`}>
                        <h4 className={`${cardMarginStyle}`}>Compensation: </h4>
                        <p>{users.compensation} dollars</p>
                    </div>
                    <div className={`${flexCenter}`}>
                        <button className={`${cardButtonStyle} bg-blue-600 hover:bg-blue-500`} onClick={() => editUser(users)}>Update
                            <EditIcon className={`${iconStyle}`} /></button>
                        <button className={`${cardButtonStyle} bg-red-600 hover:bg-red-500`} onClick={() => deleteUser(users._id)}>Delete
                            <DeleteIcon className={`${iconStyle}`} /></button>
                    </div>
                </div>
            ))}

            {totalUsers.length > itemsPerPage && (
                <div className="flex justify-center mt-4">
                    {[...Array(maxPage).keys()].map(number => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number + 1)}
                            className={`mx-2 px-3 py-[4px] rounded ${currentPage === number + 1 ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'}`}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    )
}

export default Cards;