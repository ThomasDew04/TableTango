interface AccountModalProps {
    type: string;
    id: number;
    field: string;
    currentValue?: string;
    onCancel: () => void;
  }

const AccountModal = ( { id, field, currentValue, type, onCancel  } : AccountModalProps) => {

    return (
        <div className="account-modal">
            <h2>Edit {field}</h2>
            <form>
                <input
                    type={type}
                    id={field}
                    name={field}
                    defaultValue={currentValue || ''}
                    />
                <span>
                    <button type="button" onClick={() => onCancel()}>Cancel</button>
                    <button type="submit">Save</button>
                </span>
            </form>
        </div>
    );
};

export default AccountModal;