import QRCode from 'qrcode';
import { UPIIntentParams, QROptions, UPIQRResult, UPIConfig, QROutputType } from './types';

/**
 * A class to generate UPI QR codes with a fluent, chainable API.
 */
export class UPIQR {
  private config: Partial<UPIConfig> = {
    currency: 'INR',
    outputType: 'dataURL',
  };

  /**
   * Sets the UPI payment parameters for the QR code.
   * @param params - An object containing UPI payment details.
   * @returns The UPIQR instance for chaining.
   */
  public set(params: Partial<UPIIntentParams>): this {
    this.config = { ...this.config, ...params };
    return this;
  }
  
  /**
   * Sets the visual options for the QR code.
   * @param options - An object containing QR code styling options.
   * @returns The UPIQR instance for chaining.
   */
  public setOptions(options: QROptions): this {
    this.config = { ...this.config, ...options };
    return this;
  }

  /**
   * Validates the current configuration.
   * @private
   */
  private _validateConfig(): void {
    if (!this.config.upiId || !this.config.name) {
      throw new Error("UPI ID (upiId) and Payee Name (name) are mandatory.");
    }
    if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(this.config.upiId)) {
        throw new Error("Invalid UPI ID format. It should be like 'user@bank'.");
    }
    if (this.config.amount && (isNaN(this.config.amount) || this.config.amount <= 0)) {
      throw new Error("Amount must be a positive number.");
    }
  }

  /**
   * Generates the UPI intent string from the current configuration.
   * @returns The UPI intent URL string.
   */
  public getIntent(): string {
    this._validateConfig();
    
    const upiParams = new URLSearchParams({
      pa: this.config.upiId!,
      pn: this.config.name!,
    });

    if (this.config.amount) upiParams.set('am', this.config.amount.toFixed(2));
    if (this.config.minimumAmount) upiParams.set('mam', this.config.minimumAmount.toFixed(2));
    if (this.config.currency) upiParams.set('cu', this.config.currency);
    if (this.config.payeeMerchantCode) upiParams.set('mc', this.config.payeeMerchantCode);
    if (this.config.transactionId) upiParams.set('tid', this.config.transactionId);
    if (this.config.transactionRef) upiParams.set('tr', this.config.transactionRef);
    if (this.config.transactionNote) upiParams.set('tn', this.config.transactionNote);

    return `upi://pay?${upiParams.toString()}`;
  }

  /**
   * Generates the QR code and the UPI intent string.
   * @returns A promise that resolves to an object containing the QR code and intent string.
   */
  public async generate(): Promise<UPIQRResult> {
    const intent = this.getIntent();
    const qrOptions = {
        margin: this.config.margin,
        width: this.config.width,
        color: this.config.color,
        errorCorrectionLevel: this.config.errorCorrectionLevel || 'M',
    };

    try {
      let qr: string;
      const outputType: QROutputType = this.config.outputType || 'dataURL';

      switch (outputType) {
        case 'svg':
          qr = await QRCode.toString(intent, { ...qrOptions, type: 'svg' });
          break;
        case 'utf8':
          qr = await QRCode.toString(intent, { ...qrOptions, type: 'utf8' });
          break;
        case 'dataURL':
        default:
          qr = await QRCode.toDataURL(intent, qrOptions);
          break;
      }
      
      return { qr, intent };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      throw new Error(`Failed to generate QR code: ${error}`);
    }
  }
}