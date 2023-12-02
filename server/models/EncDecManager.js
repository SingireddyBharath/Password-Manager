const crypto = require("crypto");

const encrypt = (userPass, masterPass) => {
  const iv = crypto.randomBytes(16); // Correctly generate a 16-byte IV.

  // Ensure the master password (secret key) is 32 bytes.
  // If it's not, you can hash it and use the hash as the key.
  let key;
  if (Buffer.from(masterPass, "hex").length !== 32) {
    key = crypto
      .createHash("sha256")
      .update(String(masterPass))
      .digest("base64")
      .substr(0, 32);
  } else {
    key = Buffer.from(masterPass, "hex");
  }

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(userPass, "utf8", "base64");
  encrypted += cipher.final("base64");

  return {
    iv: iv.toString("hex"),
    encryptedPassword: encrypted,
  };
};
const decrypt = (encrypted, ivString, masterPass) => {
  if (!encrypted || !ivString) {
    throw new Error("Incomplete encryption data");
  }

  const iv = Buffer.from(ivString, "hex"); // Convert IV back to Buffer for decryption
  let key;
  if (Buffer.from(masterPass, "hex").length !== 32) {
    key = crypto
      .createHash("sha256")
      .update(String(masterPass))
      .digest("base64")
      .substr(0, 32);
  } else {
    key = Buffer.from(masterPass, "hex");
  }
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  try {
    let decrypted = decipher.update(encrypted, "base64", "utf8"); // Decrypt the first chunk
    decrypted += decipher.final("utf8"); // Decrypt the final chunk and concatenate
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error;
  }
};

module.exports = { encrypt, decrypt };
