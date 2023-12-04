const crypto = require("crypto");
// Function to generate a consistent encryption key from the master password.
const getKeyFromPassword = (masterPass) => {
  let key;
  // If masterPass is not a 32-byte hex string, hash it to create a key.
  if (Buffer.from(masterPass, "hex").length !== 32) {
    key = crypto
      .createHash("sha256")
      .update(String(masterPass))
      .digest("base64")
      .substr(0, 32);
  } else {
    // If the master password is already a 32-byte hex string, use it as the key.
    key = Buffer.from(masterPass, "hex");
  }
  return key;
};

/**
 * Encrypts a user password using AES-256-CBC.
 * @param {string} userPass - The user's plaintext password to encrypt.
 * @param {string} masterPass - The master password (key) for encryption.
 * @returns {{iv: string, encryptedPassword: string}} An object containing the IV and the encrypted password.
 */
const encrypt = (userPass, masterPass) => {
  // Generate a 16-byte initialization vector (IV).
  const iv = crypto.randomBytes(16);

  // Prepare a 32-byte key from the master password or derive it if incorrect size.
  let key = getKeyFromPassword(masterPass);

  // Create the cipher instance using the AES-256-CBC algorithm.
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  // Encrypt the user password.
  let encrypted = cipher.update(userPass, "utf8", "base64");
  encrypted += cipher.final("base64");

  // Return the IV and encrypted password as hexadecimal strings.
  return {
    iv: iv.toString("hex"),
    encryptedPassword: encrypted,
  };
};

// Function to decrypt an encrypted string using AES-256-CBC algorithm.
const decrypt = (encrypted, ivString, masterPass) => {
  // Validate mandatory parameters.
  if (!encrypted || !ivString) {
    throw new Error("Incomplete encryption data");
  }
  // Convert IV from hexadecimal string back to Buffer.
  const iv = Buffer.from(ivString, "hex");
  // Prepare the encryption key. If masterPass is not a 32-byte hex string,
  // create a SHA-256 hash of it and use the first 32 characters as the key.
  let key = getKeyFromPassword(masterPass);
  // Initialize the decipher instance with the given key and IV.
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  try {
    // Decrypt the encrypted data from base64 format to utf8.
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8"); // Append the final block of data.
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error; // Rethrow the error after logging.
  }
};

module.exports = { encrypt, decrypt };
