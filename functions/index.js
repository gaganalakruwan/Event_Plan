const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
admin.initializeApp();

const message = {
  notification: {
    title: 'Scheduled Notification',
    body: 'This is a scheduled notification sent at 8 AM, 12 PM, and 5 PM!',
  },
  topic: 'all-users',
};

// Schedule notification at 8 AM daily
exports.scheduledNotification8AM = functions.pubsub.schedule('0 8 * * *')
  .timeZone('Asia/Colombo')
  .onRun((context) => {
    return admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent 8 AM notification:', response);
      })
      .catch((error) => {
        console.log('Error sending 8 AM notification:', error);
      });
  });

// Schedule notification at 12 PM daily
exports.scheduledNotification12PM = functions.pubsub.schedule('0 12 * * *')
  .timeZone('Asia/Colombo')
  .onRun((context) => {
    return admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent 12 PM notification:', response);
      })
      .catch((error) => {
        console.log('Error sending 12 PM notification:', error);
      });
  });

// Schedule notification at 5 PM daily
exports.scheduledNotification5PM = functions.pubsub.schedule('0 20 * * *')
  .timeZone('Asia/Colombo')
  .onRun((context) => {
    return admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent 5 PM notification:', response);
      })
      .catch((error) => {
        console.log('Error sending 5 PM notification:', error);
      });
  });
