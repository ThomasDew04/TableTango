import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

interface AccountModalProps {
    type: string;
    field: string;
    currentValue?: string;
    onCancel: () => void;
  }

const AccountModal = ( { field, currentValue, type, onCancel  } : AccountModalProps) => {
    const [value, setValue] = useState<string>(currentValue || '');
    const { updateUserData } = useAuth();

    const updateUser = (e: any) => {
        e.preventDefault();
        try {
            updateUserData(field, value);
            onCancel();
        } catch (error: any) {
            console.error("Error updating user data:", error);
        }
    }

    return (
        <div className="account-modal">
            <h2 data-cy="edit-field">Edit {field}</h2>
            <form onSubmit={updateUser}>
                <input
                    type={type}
                    id={field}
                    name={field}
                    defaultValue={currentValue || ''}
                    onChange={(e) => setValue(e.target.value)}
                    data-cy="edit-field-input"
                    />
                <span>
                    <button type="button" onClick={() => onCancel()}>Cancel</button>
                    <button type="submit" data-cy="save-acc-btn">Save</button>
                </span>
            </form>
        </div>
    );
};

export default AccountModal;