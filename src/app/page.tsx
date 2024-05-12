"use client";
import Cards from "@/components/cards";
import { useUser } from "@/components/context";
import FormContent from "@/components/formContent";
import { headingStyle } from "@/components/styles";
import TableContent from "@/components/tableContent";
import { useEffect, useState } from "react";

interface ApiResponse {
  result: any;
}

export default function Home() {
  const [usersList, setUsersList] = useState([]);
  const { userDetails, deleteUser, editUser } = useUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/users`);
        const data: ApiResponse = await response.json();
        setUsersList(data.result);
      } catch (error) {
        console.error("Failed to get users:", error);
      }
    };

    getUser();
  }, [userDetails, deleteUser, editUser])

  return (
    <div className="bg-slate-200 w-full py-4 md:p-8 md:min-h-[980px] xl:min-h-[530px] flex flex-col xl:flex-row justify-center xl:justify-between">
      <FormContent />
      <div className="my-3 w-full py-3">
        <h1 className={`${headingStyle}`}>User Details</h1>
        <div className="hidden md:block">
          <TableContent totalUsers={usersList} />
        </div>
        <div className="block md:hidden">
          <Cards totalUsers={usersList} />
        </div>
      </div>
    </div>
  );
}
