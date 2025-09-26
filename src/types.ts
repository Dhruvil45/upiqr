import type { QRCodeErrorCorrectionLevel } from 'qrcode';

/**
 * Defines the parameters for generating a UPI intent URL.
 */
export interface UPIIntentParams {
  /** The UPI ID (Virtual Payment Address) of the payee. E.g., 'user@bank' */
  upiId: string;
  /** The registered name of the payee. */
  name: string;
  /** The Merchant Category Code, if applicable. */
  payeeMerchantCode?: string;
  /** A unique transaction ID for your reference. */
  transactionId?: string;
  /** A reference ID for the transaction (e.g., an invoice number). */
  transactionRef?: string;
  /** A note or description for the payment. */
  transactionNote?: string;
  /** The amount for the transaction. If omitted, the user will be prompted to enter an amount. */
  amount?: number;
  /** The minimum amount that can be paid. */
  minimumAmount?: number;
  /** The currency code for the transaction (defaults to 'INR'). */
  currency?: string;
}

/**
 * Specifies the desired output format for the QR code.
 */
export type QROutputType = 'dataURL' | 'svg' | 'utf8';

/**
 * Defines visual customization options for the QR code.
 */
export interface QROptions {
  /** The output format. 'dataURL' for Base64 PNG, 'svg' for an SVG string. */
  outputType?: QROutputType;
  /** The width of the quiet zone border around the QR code. Defaults to 4. */
  margin?: number;
  /** The desired width of the QR code image in pixels. */
  width?: number;
  /** Colors for the QR code modules. */
  color?: {
    dark?: string; // Hex color for dark modules, e.g., '#000000'
    light?: string; // Hex color for light modules, e.g., '#FFFFFF'
  };
  /** The error correction level. Defaults to 'M'. */
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
}

/**
 * A comprehensive configuration object combining UPI parameters and QR options.
 */
export interface UPIConfig extends UPIIntentParams, QROptions {}

/**
 * The result object returned after successfully generating a QR code.
 */
export interface UPIQRResult {
  /** The generated QR code string, in the format specified by `outputType`. */
  qr: string;
  /** The raw UPI intent URL used to generate the QR code. */
  intent: string;
}