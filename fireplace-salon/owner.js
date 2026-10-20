
import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const SALON_ID = "quality-nails";

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

function hasOwnerAccess(claims) {
  return claims.role === "owner" &&
         claims.salonId === SALON_ID;
}

function safeText(value) {
  const div = document.createElement("div");
  div.textContent = String(value ?? "");
  return div.innerHTML;
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await signInWithEmailAndPassword(
      auth,
      document.getElementById("email").value,
      document.getElementById("password").value
    );

    const token = await auth.currentUser.getIdTokenResult(true);

    if (!hasOwnerAccess(token.claims)) {
      await signOut(auth);
      throw new Error("هذا الحساب لا يملك صلاحية صاحبة الصالون.");
    }

    loginMessage.textContent = "تم تسجيل الدخول بنجاح.";
    await loadAppointments();
  } catch (error) {
    loginMessage.textContent =
      error.message || "تعذر تسجيل الدخول.";
  }
});

document.getElementById("logoutButton")
  .addEventListener("click", () => signOut(auth));

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const token = await user.getIdTokenResult(true);

  if (hasOwnerAccess(token.claims)) {
    await loadAppointments();
  }
});

async function loadAppointments() {
  const token = await auth.currentUser.getIdTokenResult();

  if (!hasOwnerAccess(token.claims)) {
    throw new Error("غير مصرح.");
  }

  const snapshot = await getDocs(
    collection(db, "salons", SALON_ID, "appointments")
  );

  const container = document.getElementById("appointmentsList");
  container.replaceChildren();

  if (snapshot.empty) {
    container.textContent = "لا توجد حجوزات حتى الآن.";
    return;
  }

  snapshot.forEach((documentSnapshot) => {
    const booking = documentSnapshot.data();
    const item = document.createElement("div");
    item.className = "card";

    item.innerHTML = `
      <h3>${safeText(booking.customerName)}</h3>
      <p>الخدمة: ${safeText(booking.service)}</p>
      <p>الموظفة: ${safeText(booking.employee)}</p>
      <p>الموعد: ${safeText(booking.date)} ${safeText(booking.time)}</p>
      <p>الحالة: ${safeText(booking.status)}</p>
    `;

    container.appendChild(item);
  });
}
