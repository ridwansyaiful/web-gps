// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.16.0/firebase-messaging.js');

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyDgPYGXqbBXt1NayhNB5M-8mjXfGKrOzWM",
    authDomain: "coba-accf3.firebaseapp.com",
    databaseURL: "https://coba-accf3-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "coba-accf3",
    storageBucket: "coba-accf3.appspot.com",
    messagingSenderId: "171764982868",
    appId: "1:171764982868:web:19c716f6617667514679c1"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Inisialisasi pesan
const messaging = firebase.messaging();

// Menangani foreground notifications
messaging.onBackgroundMessage((payload) => {
    console.log('Background Message received: ', payload);
    // Tampilkan notifikasi
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon-192x192.png' // Ganti dengan ikon yang sesuai
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
