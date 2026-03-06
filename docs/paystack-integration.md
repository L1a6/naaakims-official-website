# Paystack Payment Integration Guide

## Overview

This document covers integrating Paystack for payment processing in the NAAKIMS portal. Payments are used for:

- **Student dues** (annual membership fees)
- **Alumni contributions** (voluntary donations)
- **Patron contributions** (sponsorships and donations)

---

## Test Account Details

| Field            | Value              |
| ---------------- | ------------------ |
| Account Number   | 9131193359         |
| Bank             | Opay              |
| Account Name     | Larry Basey David  |

> These are **test credentials** for development. Replace with production credentials before deployment.

---

## Setup

### 1. Install Paystack

```bash
npm install @paystack/inline-js
```

### 2. Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
PAYSTACK_SECRET_KEY=your_paystack_secret_key_here
```

> Get your keys from [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developer).

### 3. Create Paystack Utility

Create `src/lib/paystack.ts`:

```typescript
import PaystackPop from '@paystack/inline-js';

interface PaystackConfig {
  email: string;
  amount: number; // in kobo (NGN * 100)
  reference: string;
  metadata?: Record<string, string>;
  onSuccess: (response: PaystackResponse) => void;
  onCancel: () => void;
}

interface PaystackResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  message: string;
}

export function initializePayment(config: PaystackConfig) {
  const paystack = new PaystackPop();

  paystack.newTransaction({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    email: config.email,
    amount: config.amount,
    ref: config.reference,
    metadata: {
      custom_fields: Object.entries(config.metadata || {}).map(([key, value]) => ({
        display_name: key,
        variable_name: key.toLowerCase().replace(/\s+/g, '_'),
        value,
      })),
    },
    onSuccess: (transaction) => {
      config.onSuccess(transaction as unknown as PaystackResponse);
    },
    onCancel: () => {
      config.onCancel();
    },
  });
}

export function generateReference(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `NAAKIMS-${timestamp}-${random}`.toUpperCase();
}
```

---

## Payment Flow

### Client-Side (Inline Popup)

Create a reusable payment hook at `src/hooks/usePayment.ts`:

```typescript
'use client';

import { useState } from 'react';
import { initializePayment, generateReference } from '@/lib/paystack';

interface PaymentOptions {
  email: string;
  amount: number; // in Naira
  purpose: string;
  memberType: 'student' | 'alumni' | 'patron';
  memberRegNo: string;
}

interface PaymentResult {
  success: boolean;
  reference: string;
  amount: number;
  date: string;
  purpose: string;
  payerName?: string;
  payerEmail: string;
  memberRegNo: string;
}

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PaymentResult | null>(null);

  const pay = (options: PaymentOptions): Promise<PaymentResult> => {
    setLoading(true);
    const reference = generateReference();

    return new Promise((resolve, reject) => {
      initializePayment({
        email: options.email,
        amount: options.amount * 100, // Convert Naira to Kobo
        reference,
        metadata: {
          'Member Type': options.memberType,
          'Registration No': options.memberRegNo,
          'Purpose': options.purpose,
        },
        onSuccess: async (response) => {
          // Verify payment on backend
          const verified = await verifyPayment(response.reference);

          if (verified) {
            const paymentResult: PaymentResult = {
              success: true,
              reference: response.reference,
              amount: options.amount,
              date: new Date().toISOString(),
              purpose: options.purpose,
              payerEmail: options.email,
              memberRegNo: options.memberRegNo,
            };
            setResult(paymentResult);
            setLoading(false);
            resolve(paymentResult);
          } else {
            setLoading(false);
            reject(new Error('Payment verification failed'));
          }
        },
        onCancel: () => {
          setLoading(false);
          reject(new Error('Payment cancelled'));
        },
      });
    });
  };

  return { pay, loading, result };
}

async function verifyPayment(reference: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/payments/verify?reference=${reference}`);
    const data = await res.json();
    return data.status === 'success';
  } catch {
    return false;
  }
}
```

### Server-Side Verification

Create `src/app/api/payments/verify/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ status: 'error', message: 'Reference required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (data.data.status === 'success') {
      // Store transaction in database
      // await prisma.payment.create({
      //   data: {
      //     reference: data.data.reference,
      //     amount: data.data.amount / 100,
      //     email: data.data.customer.email,
      //     status: 'success',
      //     metadata: data.data.metadata,
      //     paidAt: new Date(data.data.paid_at),
      //   },
      // });

      return NextResponse.json({ status: 'success', data: data.data });
    }

    return NextResponse.json({ status: 'failed', message: 'Payment not successful' });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Verification failed' }, { status: 500 });
  }
}
```

---

## Transfer to Recipient (Disbursement)

For transferring funds to the test account:

### Create Transfer Recipient

```typescript
// POST https://api.paystack.co/transferrecipient
const createRecipient = async () => {
  const response = await fetch('https://api.paystack.co/transferrecipient', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'nuban',
      name: 'Larry Basey David',
      account_number: '9131193359',
      bank_code: '999992', // Opay bank code
      currency: 'NGN',
    }),
  });
  return response.json();
};
```

### Initiate Transfer

```typescript
// POST https://api.paystack.co/transfer
const initiateTransfer = async (recipientCode: string, amount: number) => {
  const response = await fetch('https://api.paystack.co/transfer', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: 'balance',
      amount: amount * 100, // kobo
      recipient: recipientCode,
      reason: 'NAAKIMS fund transfer',
    }),
  });
  return response.json();
};
```

---

## Receipt Printing

After a successful payment, users can print a receipt. Create a receipt component at `src/components/portal/PaymentReceipt.tsx`:

```tsx
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

interface ReceiptProps {
  reference: string;
  amount: number;
  date: string;
  purpose: string;
  payerName: string;
  payerEmail: string;
  memberRegNo: string;
  status: 'success' | 'pending';
}

export default function PaymentReceipt({
  reference,
  amount,
  date,
  purpose,
  payerName,
  payerEmail,
  memberRegNo,
  status,
}: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = receiptRef.current;
    if (!content) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>NAAKIMS Payment Receipt - ${reference}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              padding: 40px;
              color: #111827;
              max-width: 600px;
              margin: 0 auto;
            }
            .header { text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #008751; }
            .header h1 { font-size: 20px; color: #008751; margin-top: 12px; }
            .header p { font-size: 12px; color: #6b7280; margin-top: 4px; }
            .status { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
            .status-success { background: #dcfce7; color: #166534; }
            .status-pending { background: #fef3c7; color: #92400e; }
            .details { margin: 24px 0; }
            .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
            .row:last-child { border-bottom: none; }
            .label { font-size: 13px; color: #6b7280; }
            .value { font-size: 13px; font-weight: 600; color: #111827; text-align: right; }
            .amount-row { margin: 24px 0; padding: 16px; background: #f9fafb; border-radius: 8px; text-align: center; }
            .amount-row .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
            .amount-row .value { font-size: 28px; font-weight: 700; margin-top: 4px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #9ca3af; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>NAAKIMS</h1>
            <p>National Association of Ahmadiyya Khatme Nubuwwat Islamic Medical Students</p>
            <p style="margin-top: 8px; font-size: 14px; font-weight: 600;">Payment Receipt</p>
          </div>

          <div style="text-align: center; margin-bottom: 20px;">
            <span class="status ${status === 'success' ? 'status-success' : 'status-pending'}">
              ${status === 'success' ? 'Payment Successful' : 'Pending'}
            </span>
          </div>

          <div class="amount-row">
            <div class="label">Amount Paid</div>
            <div class="value">NGN ${amount.toLocaleString()}</div>
          </div>

          <div class="details">
            <div class="row">
              <span class="label">Reference</span>
              <span class="value">${reference}</span>
            </div>
            <div class="row">
              <span class="label">Date</span>
              <span class="value">${new Date(date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div class="row">
              <span class="label">Purpose</span>
              <span class="value">${purpose}</span>
            </div>
            <div class="row">
              <span class="label">Payer</span>
              <span class="value">${payerName}</span>
            </div>
            <div class="row">
              <span class="label">Email</span>
              <span class="value">${payerEmail}</span>
            </div>
            <div class="row">
              <span class="label">Member ID</span>
              <span class="value">${memberRegNo}</span>
            </div>
          </div>

          <div class="footer">
            <p>This is a computer-generated receipt and does not require a signature.</p>
            <p style="margin-top: 4px;">NAAKIMS &copy; ${new Date().getFullYear()}</p>
          </div>

          <script>window.onload = () => window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div>
      <div ref={receiptRef} className="max-w-md mx-auto">
        {/* On-screen receipt preview */}
        <div className="text-center mb-6">
          <Image src="/logo.png" alt="NAAKIMS" width={48} height={48} className="mx-auto" />
          <h2 className="text-lg font-semibold text-gray-900 mt-3">Payment Receipt</h2>
        </div>

        <div className="text-center mb-6">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
            status === 'success' ? 'bg-[#008751]/8 text-[#008751]' : 'bg-amber-50 text-amber-700'
          }`}>
            {status === 'success' ? 'Successful' : 'Pending'}
          </span>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-4">
          <div className="text-center mb-4 pb-4 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Amount Paid</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">NGN {amount.toLocaleString()}</p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Reference', value: reference },
              { label: 'Date', value: new Date(date).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' }) },
              { label: 'Purpose', value: purpose },
              { label: 'Payer', value: payerName },
              { label: 'Email', value: payerEmail },
              { label: 'Member ID', value: memberRegNo },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-1">
                <span className="text-xs text-gray-400">{row.label}</span>
                <span className="text-sm font-medium text-gray-900">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 max-w-md mx-auto">
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#008751] hover:bg-[#006d42] text-white rounded-lg text-sm font-medium transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Receipt
        </button>
        <button
          onClick={() => window.history.back()}
          className="flex-1 py-2.5 text-gray-500 hover:text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
```

### Usage Example

```tsx
import PaymentReceipt from '@/components/portal/PaymentReceipt';

// After successful payment
<PaymentReceipt
  reference="NAAKIMS-LR5M2K-A8B3C1"
  amount={5000}
  date="2026-03-15T10:30:00Z"
  purpose="Annual Student Dues 2025/2026"
  payerName="Muhammad Ibrahim"
  payerEmail="muhammad.ibrahim@student.uniuyo.edu.ng"
  memberRegNo="NAAKIMS/STU/2024/0892"
  status="success"
/>
```

---

## Webhook Handler (Optional)

For reliable payment tracking, add a webhook at `src/app/api/payments/webhook/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('x-paystack-signature');

  // Verify webhook signature
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex');

  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(body);

  switch (event.event) {
    case 'charge.success':
      // Payment successful - update database
      // const { reference, amount, customer } = event.data;
      // await prisma.payment.update({ ... });
      break;

    case 'transfer.success':
      // Transfer completed
      break;

    case 'transfer.failed':
      // Transfer failed - handle retry
      break;
  }

  return NextResponse.json({ received: true });
}
```

---

## Paystack Bank Codes (Common Nigerian Banks)

| Bank              | Code    |
| ----------------- | ------- |
| Opay              | 999992  |
| Access Bank       | 044     |
| GTBank            | 058     |
| First Bank        | 011     |
| UBA               | 033     |
| Zenith Bank       | 057     |
| Kuda              | 090267  |
| Palmpay           | 999991  |

---

## Security Checklist

- [ ] Never expose `PAYSTACK_SECRET_KEY` on the client
- [ ] Always verify payments server-side before granting access
- [ ] Validate webhook signatures
- [ ] Use HTTPS in production
- [ ] Store transaction records in database
- [ ] Implement idempotency for webhook handlers
- [ ] Set up webhook URL in Paystack dashboard
- [ ] Test with Paystack test keys before going live

---

## Going Live

1. Complete business verification on Paystack dashboard
2. Replace test keys with live keys in environment variables
3. Update webhook URL to production domain
4. Update transfer recipient with production bank details
5. Test end-to-end payment flow in production
