
const translations = {
  ar: {
    salonName: "صالون جودة الأظافر",
    bookingTitle: "احجزي موعدك",
    customerName: "الاسم الكامل",
    phone: "رقم الجوال",
    service: "اختاري الخدمة",
    employee: "الموظفة المفضلة",
    date: "التاريخ",
    time: "الوقت",
    bookNow: "إرسال طلب الحجز",
    bookingSaving: "جارٍ حفظ طلب الحجز...",
    bookingSuccess: "تم حفظ الطلب. أكملي الإرسال عبر واتساب.",
    bookingError: "تعذر حفظ الحجز. حاولي مرة أخرى.",
    ownerTitle: "لوحة صاحبة الصالون",
    welcome: "مرحباً بصاحبة صالون جودة الأظافر ✨👑",
    login: "تسجيل الدخول",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    logout: "تسجيل الخروج",
    appointments: "الحجوزات",
    services: "الخدمات والأسعار",
    finance: "الماليات",
    employees: "الموظفات",
    fireplace: "الفاير بليس 🔥",
    backup: "إنشاء نسخة احتياطية",
    language: "English",
    noAppointments: "لا توجد حجوزات حتى الآن."
  },

  en: {
    salonName: "Quality Nail Salon",
    bookingTitle: "Book Your Appointment",
    customerName: "Full Name",
    phone: "Phone Number",
    service: "Choose a Service",
    employee: "Preferred Employee",
    date: "Date",
    time: "Time",
    bookNow: "Submit Booking Request",
    bookingSaving: "Saving your booking request...",
    bookingSuccess: "Request saved. Complete sending it through WhatsApp.",
    bookingError: "Could not save your booking. Please try again.",
    ownerTitle: "Salon Owner Dashboard",
    welcome: "Welcome to Quality Nail Salon ✨👑",
    login: "Log In",
    email: "Email Address",
    password: "Password",
    logout: "Log Out",
    appointments: "Appointments",
    services: "Services & Prices",
    finance: "Finances",
    employees: "Employees",
    fireplace: "Fireplace 🔥",
    backup: "Create Backup",
    language: "العربية",
    noAppointments: "No appointments yet."
  }
};

function getCurrentLanguage() {
  return localStorage.getItem("salon-language") || "ar";
}

function setLanguage(language) {
  if (!translations[language]) return;

  localStorage.setItem("salon-language", language);

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translated = translations[language][key];

    if (translated !== undefined) {
      element.textContent = translated;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const translated = translations[language][key];

    if (translated !== undefined) {
      element.placeholder = translated;
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    const translated = translations[language][key];

    if (translated !== undefined) {
      element.setAttribute("aria-label", translated);
    }
  });

  document.querySelectorAll("[data-language-button]").forEach((button) => {
    button.textContent = translations[language].language;
  });
}

function t(key) {
  const language = getCurrentLanguage();
  return translations[language]?.[key] ?? translations.ar[key] ?? key;
}

document.addEventListener("DOMContentLoaded", () => {
  setLanguage(getCurrentLanguage());

  document.querySelectorAll("[data-language-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLanguage = getCurrentLanguage() === "ar" ? "en" : "ar";
      setLanguage(nextLanguage);
    });
  });
});

export { t, setLanguage, getCurrentLanguage };
