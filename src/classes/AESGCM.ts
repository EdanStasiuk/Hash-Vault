import { EncryptedMnemonicSerialized } from "../config/interfaces";

/**
 * This implementation of AES-GCM encryption and decryption for TypeScript is
 * inspired by the guide "Shielding Your Data: AES-GCM Encryption/Decryption for 
 * JavaScript, TypeScript, Java, and Python" by Ihssan Maheel.
 * 
 * Reference: https://dev.to/ihssmaheel/shielding-your-data-aes-gcm-encryption-decryption-for-javascript-typescript-java-and-python-1cpm
 */
export class AESGCM {
    static ALGORITHM = "AES-GCM";
    static HASH = "SHA-256";
    static KEY_SIZE = 256;
    static ITERATION_COUNT = 100000;

    private textEncoder: TextEncoder;
    private textDecoder: TextDecoder;

    constructor() {
        this.textEncoder = new TextEncoder();
        this.textDecoder = new TextDecoder();
    }

    async generateKeyMaterial(password: string): Promise<CryptoKey> {
        return window.crypto.subtle.importKey(
            "raw",
            this.textEncoder.encode(password),
            { name: "PBKDF2" },
            false,
            ["deriveBits", "deriveKey"]
        );
    }

    async generateKey(keyMaterial: CryptoKey, salt: Uint8Array): Promise<CryptoKey> {
        const algorithm: string = AESGCM.ALGORITHM;
        const hash: string = AESGCM.HASH;
        const iterationCount: number = AESGCM.ITERATION_COUNT;
        const keySize: number = AESGCM.KEY_SIZE;

        return window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt,
                iterations: iterationCount,
                hash: hash
            },
            keyMaterial,
            { 
                name: algorithm,
                length: keySize 
            },
            true,
            ["encrypt", "decrypt"]
        );
    }

    async encrypt(plaintext: string, password: string): Promise<EncryptedMnemonicSerialized> {
        const data: Uint8Array = this.textEncoder.encode(plaintext);
        const salt: Uint8Array = window.crypto.getRandomValues(new Uint8Array(16));
        const keyMaterial: CryptoKey = await this.generateKeyMaterial(password);
        const key: CryptoKey = await this.generateKey(keyMaterial, salt);
        const algorithm: string = AESGCM.ALGORITHM;
        const iv: Uint8Array = window.crypto.getRandomValues(new Uint8Array(12));
        const encryptedData: ArrayBuffer = await window.crypto.subtle.encrypt(
            {
                name: algorithm,
                iv
            },
            key,
            data
        );
        const authTag = new Uint8Array(encryptedData, encryptedData.byteLength - 16, 16);

        const ciphertextBase64: string = btoa(String.fromCharCode.apply(null, [...new Uint8Array(encryptedData)]));
        const ivBase64: string = btoa(String.fromCharCode.apply(null, [...iv]));
        const saltBase64: string = btoa(String.fromCharCode.apply(null, [...salt]));
        const authTagBase64: string = btoa(String.fromCharCode.apply(null, [...authTag]));

        return {
          ivBase64,
          saltBase64,
          authTagBase64,
          ciphertextBase64
        };
    }

    async decrypt(encryptedData: EncryptedMnemonicSerialized, password: string): Promise<string> {
        const { ivBase64, saltBase64, ciphertextBase64 } = encryptedData;
        const ciphertext = Uint8Array.from(atob(ciphertextBase64), c => c.charCodeAt(0));
        const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));
        const salt = Uint8Array.from(atob(saltBase64), c => c.charCodeAt(0));
        const algorithm = AESGCM.ALGORITHM;
        const keyMaterial = await this.generateKeyMaterial(password);
        const key = await this.generateKey(keyMaterial, salt);

        const decryptedData = await crypto.subtle.decrypt(
            {
                name: algorithm,
                iv
            },
            key,
            ciphertext
        );

        return this.textDecoder.decode(decryptedData);
    }

    async testAesGcm(): Promise<void> {
        const plaintext = 'Hello World';
        const password = 'password_is_password';

        const encryptedData: EncryptedMnemonicSerialized = await this.encrypt(plaintext, password);
        console.log(encryptedData.ciphertextBase64);

        const decryptedData: string = await this.decrypt(encryptedData, password);
        console.log(decryptedData);
    }
}

// const aesGcm: AESGCM = new AESGCM();
// await aesGcm.testAesGcm();
