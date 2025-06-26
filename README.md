# 🧠 Smart Habit Tracker

تطبيق ذكي لإدارة العادات اليومية والأسبوعية، بيدعم الإشعارات الفورية (Push Notifications)، وتحليلات الأداء، ونظام تسجيل دخول آمن بخطوتين (MFA).

---

## 🚀 المميزات

- ✅ تسجيل دخول آمن (JWT + MFA)
- 📧 تأكيد الحساب بالإيميل و OTP
- 🔁 استرجاع كلمة المرور
- 🔔 إشعارات Web Push بالعادات اليومية
- 📊 نظام تتبع العادات (Habit Tracking)
- 🧾 تصدير التقارير (CSV / PDF)
- 📈 Dashboard API لعرض الإحصائيات

---

## 🧑‍💻 التكنولوجيات المستخدمة

- **Backend**: Node.js + Express + TypeScript  
- **Database**: MongoDB + Mongoose  
- **Auth**: JWT + OTP + Multi-Factor  
- **Notifications**: Web Push API + VAPID  
- **Scheduler**: node-cron + moment  
- **PDF/CSV**: pdfkit + json2csv
- **testing**: jest + supertest + dotenv
---

## ⚙️ كيفية التشغيل محليًا

```bash
git clone https://github.com/yourusername/smart-habit-tracker.git
cd smart-habit-tracker
npm install
