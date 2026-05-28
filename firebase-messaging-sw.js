importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCtoV0hDcbWfyac_c5iu1vO4DERrUec7-A",
    authDomain: "barcelona-mit-den-jungs.firebaseapp.com",
    databaseURL: "https://barcelona-mit-den-jungs-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "barcelona-mit-den-jungs",
    storageBucket: "barcelona-mit-den-jungs.firebasestorage.app",
    messagingSenderId: "978207897048",
    appId: "1:978207897048:web:08d1274e52986fbdf62ead"
});

const messaging = firebase.messaging();

// Hintergrund-Benachrichtigungen (wenn App geschlossen/minimiert)
messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || 'Barcelona Tracker 🏖️';
    const body  = payload.notification?.body  || '';

    self.registration.showNotification(title, {
        body:  body,
        icon:  '/icon.png',
        badge: '/icon.png',
        vibrate: [200, 100, 200],
        data: { url: self.location.origin }
    });
});

// Klick auf Benachrichtigung → App öffnen
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data?.url || '/');
            }
        })
    );
});
