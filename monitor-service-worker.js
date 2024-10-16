// monitor-service-worker.js
importScripts('https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.16.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDgPYGXqbBXt1NayhNB5M-8mjXfGKrOzWM",
    authDomain: "coba-accf3.firebaseapp.com",
    projectId: "coba-accf3",
    storageBucket: "coba-accf3.appspot.com",
    messagingSenderId: "171764982868",
    appId: "1:171764982868:web:19c716f6617667514679c1"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Pesan latar belakang diterima:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'icon-192x192.png'
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
