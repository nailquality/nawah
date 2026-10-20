
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const SALON_ID = "quality-nails";
const WHATSAPP_NUMBER = "966544267911";

const form = document.getElementById("bookingForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const customerName =
    document.getElementById("customerName").value.trim();
  const phone =
    document.getElementById("phone").value.trim();
  const service =
    document.getElementById("service").value;
  const employee =
    document.getElementById("employee").value.trim();
  const date =
    document.getElementById("date").value;
  const time =
    document.getElementById("time").value;

  if (!customerName || !phone || !service || !date || !time) {
    message.textContent = "يرجى تعبئة جميع الحقول المطلوبة.";
    return;
  }

  if (date < new Date().toLocaleDateString("en-CA")) {
    message.textContent = "اختاري تاريخًا صحيحًا.";
    return;
  }

  try {
    message.textContent = "جارٍ حفظ طلب الحجز...";

    await addDoc(
      collection(db, "salons", SALON_ID, "appointments"),
      {
        customerName,
        phone,
        service,
        employee,
        date,
        time,
        status: "pending",
        createdAt: serverTimestamp()
      }
    );

    const text = [
      "طلب حجز جديد - صالون جودة الأظافر",
      `الاسم: ${customerName}`,
      `الجوال: ${phone}`,
      `الخدمة: ${service}`,
      `الموظفة: ${employee || "بدون تفضيل"}`,
      `التاريخ: ${date}`,
      `الوقت: ${time}`
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    message.textContent =
      "تم حفظ الطلب. أكملي الإرسال عبر واتساب وانتظري تأكيد الصالون.";

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
    form.reset();
  } catch (error) {
    console.error(error);
    message.textContent =
      "تعذر حفظ الحجز. تحققي من إعداد Firebase وقواعد الوصول.";
  }
});
