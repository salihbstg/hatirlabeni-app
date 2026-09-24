import React from "react";

import {
  formActionsClassName,
  cancelButtonClassName,
  submitButtonClassName,
} from "./addressForm.styles";

interface AddressFormActionsProps {
  isSaving: boolean;
  onCancel: () => void;
}

const AddressFormActions: React.FC<AddressFormActionsProps> = ({
  isSaving,
  onCancel,
}) => {
  return (
    <div className={formActionsClassName}>
      {/* Cancel */}
      <button
        type="button"
        onClick={onCancel}
        disabled={isSaving}
        className={cancelButtonClassName}
      >
        İptal
      </button>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSaving}
        className={submitButtonClassName}
      >
        {isSaving ? "Kaydediliyor..." : "Adresi Kaydet"}
      </button>
    </div>
  );
};

export default AddressFormActions;