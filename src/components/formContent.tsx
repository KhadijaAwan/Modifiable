"use client";
import { buttonStyle, headingStyle, inputStyle, labelStyle, spanStyle } from "./styles";
import { useUser } from "./context";
import { useRouter } from "next/navigation";

const FormContent = () => {
    const router = useRouter();
    const { userDetails, setUserDetails, isEditing, setIsEditing, resetUser } = useUser();
    const method = isEditing ? "PUT" : "POST";

    const submitData = async (e: any) => {
        e.preventDefault();
        try {
            let response = await fetch("/api/users", {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });

            response = await response.json();
            console.log("Response from server: ", response);
            setIsEditing(false);
            setUserDetails({ fullname: "", address: "", profession: "", compensation: "" });
            router.refresh();
        } catch (error) {
            console.error(`Failed to ${isEditing ? "update" : "add"} user:`, error);

        }
    };

    return (
        <div className="flex justify-center pb-6 md:pb-0 flex-col my-3 mx-auto xl:mx-5 md:my-5 w-[280px] md:w-[500px]">
            <h1 className={`${headingStyle}`}>Profile Details</h1>
            <form onSubmit={submitData} className="flex w-full flex-col">
                <div className={`${spanStyle}`}>
                    <label className={`${labelStyle} mx-4 md:ml-6 md:mr-7`}>Full Name</label>
                    <input className={`${inputStyle}`} value={userDetails.fullname}
                        onChange={(e) =>
                            setUserDetails((prevState) => ({
                                ...prevState,
                                fullname: e.target.value,
                            }))
                        } />
                </div>
                <div className={`${spanStyle}`}>
                    <label className={`${labelStyle} ml-5 mr-6 md:mx-8`}>Address</label>
                    <input className={`${inputStyle}`} value={userDetails.address}
                        onChange={(e) =>
                            setUserDetails((prevState) => ({
                                ...prevState,
                                address: e.target.value,
                            }))
                        } />
                </div >
                <div className={`${spanStyle}`}>
                    <label className={`${labelStyle} mx-4 md:ml-5 md:mr-7`}>Profession</label>
                    <input className={`${inputStyle}`} value={userDetails.profession}
                        onChange={(e) =>
                            setUserDetails((prevState) => ({
                                ...prevState,
                                profession: e.target.value,
                            }))
                        } />
                </div >
                <div className={`${spanStyle}`}>
                    <label className={`${labelStyle} mr-2 md:mr-4`}>Compensation</label>
                    <input className={`${inputStyle}`} value={userDetails.compensation}
                        onChange={(e) =>
                            setUserDetails((prevState) => ({
                                ...prevState,
                                compensation: e.target.value,
                            }))
                        } />
                </div>

                <div className="mx-auto mt-6 md:mt-10">
                    <button type="submit" className={`${buttonStyle} bg-slate-700 hover:bg-slate-800 mr-4`}>{isEditing ? "Update" : "Submit"}</button>
                    <button onClick={resetUser} className={`${buttonStyle} bg-blue-700 hover:bg-blue-600`}>Reset</button>
                </div>
            </form >
        </div >
    )
}

export default FormContent;