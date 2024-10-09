import React, { useState, useRef } from "react";
import "./App.css"; // Import TailwindCSS styles
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th"; // Import Thai locale
import html2canvas from "html2canvas"; // Import html2canvas for downloading the postcard

dayjs.extend(buddhistEra);
dayjs.locale("th"); // Set the locale to Thai

function App() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const postcardRef = useRef(null); // Initialize ref for postcard element

  // Handle date change and format to Thai Buddhist calendar
  const handleDateChange = (event) => {
    const selectedDate = dayjs(event.target.value);
    const thaiDate = selectedDate.format("D MMMM BBBB"); // Format with Buddhist era and Thai locale
    setDate(thaiDate);
  };

  // Handle name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handle photo upload
  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  // Function to download the postcard as an image
  const handleDownload = () => {
    const postcardElement = postcardRef.current;
    if (postcardElement) {
      html2canvas(postcardElement)
        .then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "postcard.png";
          link.click();
        })
        .catch((error) => {
          console.error("Error generating the canvas:", error);
        });
    } else {
      console.error("Postcard element not found");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">สร้างโปสการ์ดของคุณ</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {/* Date Picker */}
        <label className="block text-gray-700 font-semibold mb-2">
          เลือกวันที่:
        </label>
        <input
          type="date"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          onChange={handleDateChange}
        />

        {/* Name Input */}
        <label className="block text-gray-700 font-semibold mb-2">ชื่อ:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />

        {/* Photo Upload */}
        <label className="block text-gray-700 font-semibold mb-2">
          อัปโหลดรูปภาพ:
        </label>
        <input
          type="file"
          accept="image/*"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          onChange={handlePhotoChange}
        />
      </div>

      {/* Display Card */}
      <div
        ref={postcardRef}
        id="postcard"
        className="mt-8 w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border-4 border-gray-200 flex flex-col items-center"
        style={{
          background: "linear-gradient(145deg, #f0f4f8, #ffffff)", // Light background
          borderColor: "#D1D5DB", // Soft gray border
        }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">โปสการ์ด</h2>

        {/* Date */}
        <p className="text-gray-600 text-lg mb-2">
          <span className="font-semibold">{date || ""}</span>
        </p>

        {/* Name */}
        <p className="text-gray-600 text-lg mb-2">
          <span className="font-semibold">{name}</span>
        </p>

        {/* Photo */}
        <div className="flex justify-center mt-6">
          {photo ? (
            <img
              src={photo}
              alt="Uploaded"
              className="w-64 h-64 object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-64 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">ไม่มีรูปภาพ</p>
            </div>
          )}
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow"
      >
        ดาวน์โหลดโปสการ์ด
      </button>
    </div>
  );
}

export default App;
