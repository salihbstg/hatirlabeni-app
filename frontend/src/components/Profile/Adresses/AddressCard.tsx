import React, { useState } from "react";

const AddressCard = () => {
  const [title, setTitle] = useState("Ev");
  const [address, setAddress] = useState(
    "Çınarlı Mahallesi, 12001 Sokak No:12"
  );
  const [city, setCity] = useState("Adana");

  const [editTitle, setEditTitle] = useState(title);
  const [editAddress, setEditAddress] = useState(address);
  const [editCity, setEditCity] = useState(city);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleEdit = () => {
    setEditTitle(title);
    setEditAddress(address);
    setEditCity(city);

    setIsEditing(true);
  };

  const handleSave = () => {
    setTitle(editTitle);
    setAddress(editAddress);
    setCity(editCity);

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditAddress(address);
    setEditCity(city);

    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleted(true);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="w-full max-w-xl border border-gray-200 rounded-lg bg-white px-5 py-4 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 pb-4">

          <div className="flex flex-col gap-1 flex-1">
            <span className="text-sm font-semibold text-gray-500">
              Adres Başlığı
            </span>

            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-base font-medium text-gray-800 outline-none focus:border-[#6B4733] focus:ring-1 focus:ring-[#6B4733]"
              />
            ) : (
              <span className="text-lg font-semibold text-gray-800">
                {title}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-5">

            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-green-700 transition hover:bg-green-50"
                >
                  Kaydet
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  İptal
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  Düzenle
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Sil
                </button>
              </>
            )}

          </div>
        </div>

        {/* Açık Adres */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-500">
            Açık Adres
          </span>

          {isEditing ? (
            <textarea
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-base font-medium leading-6 text-gray-800 outline-none focus:border-[#6B4733] focus:ring-1 focus:ring-[#6B4733]"
            />
          ) : (
            <span className="text-base font-medium leading-6 text-gray-800">
              {address}
            </span>
          )}
        </div>

        {/* Şehir */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-500">
            Şehir
          </span>

          {isEditing ? (
            <input
              type="text"
              value={editCity}
              onChange={(e) => setEditCity(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-base font-medium text-gray-800 outline-none focus:border-[#6B4733] focus:ring-1 focus:ring-[#6B4733]"
            />
          ) : (
            <span className="text-base font-medium text-gray-800">
              {city}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default AddressCard;