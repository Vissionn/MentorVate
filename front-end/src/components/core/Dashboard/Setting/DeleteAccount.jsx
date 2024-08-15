import React, { useState } from 'react'
import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DeleteAccountHandler } from '../../../../Services/operation/SettingApi'
import ConfirmationModal from "../../../Common/ConfirmationModal"

const DeleteAccount = () => {

    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)

    const {_id} = user
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    // const [open , SetOpen]= useState(false)
    const [confirmModal, SetConfirmModal] = useState(null)

    const handleDeleteAccount = () => {
        try {
            SetConfirmModal({
                text1:"Are You Sure ?",
                text2: "You will be Lost Your Account Permanently !",
                btn1text:"Delete",
                btn2text: "Cancel",
                bntHandler1: () => { dispatch(DeleteAccountHandler(_id,Navigate,token))},
                bntHandler2: () => {SetConfirmModal(null)},
            })
        } catch (error) {
            console.log("Unable to Dispatch function for Account Deletion", error.message);
        }
    }

  return (
    <div>
        <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-3/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>

      {confirmModal && <ConfirmationModal data={confirmModal}/>}
    </div>
  )
}

export default DeleteAccount