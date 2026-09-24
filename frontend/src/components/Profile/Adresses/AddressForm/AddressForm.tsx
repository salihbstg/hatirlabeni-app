import { useEffect, useRef, useState } from "react";

import { saveAddress } from "../../../../api/UserService";
import type { Address } from "../../../../types/User";

import AddressFormFields from "./AddressFormFields";
import AddressFormActions from "./AddressFormActions";

type AddressFormProps = {
  onSave: (address: Address) => void;
  onCancel: () => void;
};

type AddressField =
  | "title"
  | "city"
  | "district"
  | "neighborhood"
  | "postalCode"
  | "addressLine";

type FormErrors = Partial<Record<AddressField, string>>;

type Toast = {
  type: "success" | "error";
  message: string;
};

const AddressForm = ({ onSave, onCancel }: AddressFormProps) => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLine, setAddressLine] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<Toast | null>(null);

  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Component kaldırıldığında bekleyen toast zamanlayıcısını temizle.
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // Toast mesajını göster ve önceki zamanlayıcıyı temizle.
  const showToast = (type: Toast["type"], message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast({ type, message });

    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 3000);
  };

  // Alanın hata mesajını temizle.
  const clearError = (field: AddressField) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  // Şehir değişince ilçe ve mahalleyi sıfırla.
  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict("");
    setNeighborhood("");

    clearError("city");
    clearError("district");
    clearError("neighborhood");
  };

  // İlçe değişince mahalleyi sıfırla.
  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setNeighborhood("");

    clearError("district");
    clearError("neighborhood");
  };

  // Posta kodunu doğrula.
  const validatePostalCode = (value: string): string => {
    if (!value) {
      return "Posta kodunu girin.";
    }

    if (!/^\d{5}$/.test(value)) {
      return "Posta kodu 5 rakamdan oluşmalı. Örn: 01000";
    }

    return "";
  };

  // Tüm form alanlarını doğrula.
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Adres başlığını girin. Örn: Ev, İş";
    }

    if (!city) {
      newErrors.city = "Lütfen şehrinizi seçin.";
    }

    if (!district) {
      newErrors.district = "Lütfen ilçenizi seçin.";
    }

    if (!neighborhood) {
      newErrors.neighborhood = "Lütfen mahallenizi seçin.";
    }

    const postalCodeError = validatePostalCode(postalCode);

    if (postalCodeError) {
      newErrors.postalCode = postalCodeError;
    }

    if (!addressLine.trim()) {
      newErrors.addressLine = "Açık adresinizi girin.";
    }

    return newErrors;
  };

  // Form gönderimi.
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitted(true);

    const validationErrors = validateForm();

    setErrors(validationErrors);

    // İlk hatalı alana kaydır ve odakla.
    const firstInvalidField = Object.keys(
      validationErrors
    )[0] as AddressField | undefined;

    if (firstInvalidField) {
      const element = document.querySelector<HTMLElement>(
        `[data-field="${firstInvalidField}"]`
      );

      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element?.focus({ preventScroll: true });

      showToast("error", "Lütfen işaretli alanları kontrol edin.");

      return;
    }

    try {
      setIsSaving(true);

      const newAddress = {
        title: title.trim(),
        city,
        district,
        neighborhood,
        postalCode,
        addressLine: addressLine.trim(),
      };

      const savedAddress = await saveAddress(newAddress);

      showToast("success", "Adres başarıyla kaydedildi.");

      // API'den dönen kayıtlı adresi üst component'e aktar.
      onSave(savedAddress);
    } catch (error) {
      console.error("Adres kaydedilemedi:", error);

      showToast(
        "error",
        "Adres kaydedilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Posta kodunu yalnızca rakam kabul edecek şekilde güncelle.
  const handlePostalCodeChange = (value: string) => {
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 5);

    setPostalCode(sanitizedValue);

    // Form daha önce gönderildiyse validasyonu anlık güncelle.
    if (isSubmitted) {
      const error = validatePostalCode(sanitizedValue);

      setErrors((prev) => ({
        ...prev,
        postalCode: error || undefined,
      }));
    } else {
      clearError("postalCode");
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Toast mesajı */}
      {toast && (
        <div
          role="alert"
          className={`mb-4 rounded-lg px-3 py-2.5 text-sm font-medium ${
            toast.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Form başlığı */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Yeni Adres Ekle
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Teslimat adresinizi eksiksiz doldurun.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <AddressFormFields
          title={title}
          city={city}
          district={district}
          neighborhood={neighborhood}
          postalCode={postalCode}
          addressLine={addressLine}
          errors={errors}
          isSubmitted={isSubmitted}
          onTitleChange={(value) => {
            setTitle(value);
            clearError("title");
          }}
          onCityChange={handleCityChange}
          onDistrictChange={handleDistrictChange}
          onNeighborhoodChange={(value) => {
            setNeighborhood(value);
            clearError("neighborhood");
          }}
          onPostalCodeChange={handlePostalCodeChange}
          onAddressLineChange={(value) => {
            setAddressLine(value);
            clearError("addressLine");
          }}
        />

        <AddressFormActions
          isSaving={isSaving}
          onCancel={onCancel}
        />
      </form>
    </div>
  );
};

export default AddressForm;