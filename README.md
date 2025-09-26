# @adityavijay21/upiqr: UPI QR Code Generator

[![npm version](https://img.shields.io/npm/v/@adityavijay21/upiqr.svg?style=flat-square)](https://www.npmjs.com/package/@adityavijay21/upiqr)
[![build status](https://img.shields.io/github/actions/workflow/status/adityavijay21/@adityavijay21/upiqr/main.yml?branch=main&style=flat-square)](https://github.com/adityavijay21/@adityavijay21/upiqr/actions/workflows/main.yml)
[![npm downloads](https://img.shields.io/npm/dt/@adityavijay21/upiqr.svg?style=flat-square)](https://www.npmjs.com/package/@adityavijay21/upiqr)
[![license](https://img.shields.io/npm/l/@adityavijay21/upiqr.svg?style=flat-square)](https://github.com/adityavijay21/@adityavijay21/upiqr/blob/main/LICENSE)

A lightweight, modern, and customizable UPI QR code generator for Node.js, browsers, and React Native. Generate static and dynamic UPI QR codes with a simple, fluent API.

---
## 🌐 Live Demo

Test out the package in a live environment! The React demo app we built is a perfect showcase.

**[➡️ Launch the Live Demo](https://your-demo-url.vercel.app/)** _(You can deploy the React demo to a service like Vercel or Netlify to get this link)_

<div align="center">
  
</div>

---
## ✨ Features

* ✅ **Fluent API:** Easy-to-use, chainable methods for a clean development experience.
* ✅ **Framework Agnostic:** Works in Node.js, browsers, React, Vue, Svelte, and more.
* ✅ **React Native Support:** First-class support for React Native via SVG output.
* ✅ **Flexible Output:** Generate QR codes as Base64 PNGs (`dataURL`), `SVG` strings, or `UTF8` strings.
* ✅ **Fully Typed:** Written in TypeScript for a great developer experience with autocompletion.
* ✅ **Easy Installation:** No peer dependencies to manage. It just works.

---
## ⚙️ How It Works

The library simplifies the process of creating a valid UPI intent URL and encoding it into a QR code.

`Your Data` ➡️ `UPIQR Class` ➡️ `UPI Intent String` ➡️ **QR Code**

---
## 📦 Installation

```bash
npm install @adityavijay21/upiqr
````

-----

## 🚀 Usage Examples

### 1\. Basic Usage (Node.js or Browser)

Create a QR code with a fixed amount and a transaction note.

```javascript
import { UPIQR } from '@adityavijay21/upiqr';

async function generate() {
  const { qr, intent } = await new UPIQR()
    .set({
      upiId: 'adityavijay21@okicici',
      name: 'Aditya Vijay',
      amount: 150.75,
      transactionNote: 'For the awesome project!',
    })
    .generate();
    
  // qr is a base64 PNG dataURL string that can be used in an <img> tag.
  console.log(qr);
}

generate();
```

### 2\. Variable Amount (Static QR)

Omit the `amount` field to let the person paying enter the amount themselves.

```javascript
import { UPIQR } from '@adityavijay21/upiqr';

const { qr } = await new UPIQR()
  .set({
    upiId: 'adityavijay21@okicici',
    name: 'Aditya Vijay',
    // No amount is specified
  })
  .generate();
```

### 3\. React Example

A simple React component to display a generated QR code.

```jsx
import React, { useState, useEffect } from 'react';
import { UPIQR } from '@adityavijay21/upiqr';

function PaymentQRCode() {
  const [qrCode, setQrCode] = useState('');
  
  useEffect(() => {
    async function getQRCode() {
      const { qr } = await new UPIQR()
        .set({
          upiId: 'shop@ybl',
          name: 'My Awesome Shop',
          amount: 250,
        })
        .generate();
      setQrCode(qr);
    };

    getQRCode();
  }, []);

  if (!qrCode) return <div>Loading...</div>;

  return <img src={qrCode} alt="UPI QR Code" />;
};
```

### 4\. React Native Example (using SVG)

For React Native, generating an SVG is the best approach. You'll need `react-native-svg`.

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { UPIQR } from '@adityavijay21/upiqr';

function PaymentQRCodeNative() {
  const [qrSvg, setQrSvg] = useState(null);

  useEffect(() => {
    async function getQRCode() {
      const { qr } = await new UPIQR()
        .set({ upiId: 'shop@ybl', name: 'React Native Shop' })
        .setOptions({ outputType: 'svg' }) // Generate an SVG string
        .generate();
      setQrSvg(qr);
    };

    getQRCode();
  }, []);

  if (!qrSvg) return <Text>Loading QR Code...</Text>;

  return <SvgXml xml={qrSvg} width="250" height="250" />;
};
```

-----

## 🛠️ API Reference

### `.set(params)`

Sets the UPI payment parameters.

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `upiId` | String | The UPI ID of the payee (e.g., `user@bank`). | **Yes** |
| `name` | String | The registered name of the payee. | **Yes** |
| `amount`| Number | Amount to be paid. Omit for variable amount. | No |
| `payeeMerchantCode` | String | Your Merchant Category Code. | No |
| `transactionId` | String | A unique transaction ID for your reference. | No |
| `transactionRef` | String | A reference ID for the transaction (e.g., Invoice \#).| No |
| `transactionNote` | String | A note for the payment (e.g., "Coffee Payment"). | No |
| `minimumAmount` | Number | The minimum amount allowed for payment. | No |
| `currency` | String | Currency code (defaults to `INR`). | No |

### `.setOptions(options)`

Customizes the visual appearance of the generated QR code.

| Field | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `outputType` | `'dataURL'`, `'svg'`, `'utf8'` | The desired output format of the QR code. | `'dataURL'` |
| `width` | Number | The width of the QR code image in pixels. | `undefined` |
| `margin` | Number | The width of the quiet zone border. | `4` |
| `color.dark`| String (Hex)| The color of the dark modules (e.g., `#000000`). | `#000000FF`|
| `color.light`| String (Hex)| The color of the light modules (e.g., `#FFFFFF`). | `#FFFFFFFF`|
| `errorCorrectionLevel`| `'L'`, `'M'`, `'Q'`, `'H'` | The level of error correction. | `'M'` |

### `.generate()`

Generates the QR code.

  * **Returns:** `Promise<UPIQRResult>`
  * `UPIQRResult` is an object: `{ qr: string, intent: string }`

-----

## 🤝 Contributing

Contributions, issues, and feature requests are welcome\! Feel free to check the [issues page](https://www.google.com/search?q=https://github.com/adityavijay21/@adityavijay21/upiqr/issues).

## 📄 License

This project is [MIT](https://www.google.com/url?sa=E&source=gmail&q=https://github.com/adityavijay21/@adityavijay21/upiqr/blob/main/LICENSE) licensed.
