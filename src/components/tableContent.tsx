"use client";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { flexCenter, tableDataStyle, tableStyle, cardButtonStyle } from './styles';
import { NextPage } from 'next';
import { useUser } from './context';

interface tableProps {
    totalUsers: any;
}

const TableContent: NextPage<tableProps> = ({ totalUsers }) => {
    const { currentPage, setCurrentPage, itemsPerPage, editUser, deleteUser } = useUser();

    const maxPage = Math.ceil(totalUsers.length / itemsPerPage);

    const currentTableData = totalUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <table className={`${tableStyle}`}>
                <thead>
                    <tr className="bg-blue-700 text-white h-[44px]">
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Profession</th>
                        <th>Compensation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTableData.map((user: any, index: number) => (
                        <tr className="bg-white h-[42px]" key={user._id}>
                            <td className={`${tableDataStyle}`}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td className={`${tableDataStyle}`}>{user.fullname}</td>
                            <td className={`${tableDataStyle}`}>{user.address}</td>
                            <td className={`${tableDataStyle}`}>{user.profession}</td>
                            <td className={`${tableDataStyle}`}>${user.compensation}</td>
                            <td className={`${tableDataStyle}`}>
                                <div className={`${flexCenter} pl-2`}>
                                    <button className={`${cardButtonStyle} bg-green-600 hover:bg-green-500`} onClick={() => editUser(user)}>
                                        <EditIcon className="text-[14px]" />
                                    </button>
                                    <button className={`${cardButtonStyle} bg-red-600 hover:bg-red-500`} onClick={() => deleteUser(user._id)}>
                                        <DeleteIcon className="text-[14px]" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
    );
}

export default TableContent;
