http endpoint - https://asia-southeast1-pathforge-v1.cloudfunctions.net/sendMail

To trigger the function, you must pass `from`, `to`, `subject` & `body` header parameters.

For example
```js
await fetch('https://asia-southeast1-pathforge-v1.cloudfunctions.net/sendMail', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      'from': 'Pathforge <sender@sender.co>',
      'to': 'receiver@receiver.com',
      'subject': 'You got mail',
      'body': '<b>Hello world</b>'
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
```