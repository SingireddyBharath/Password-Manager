const crypto = require("crypto");

const encrypt = (userPass, id) => {
  console.log(id);
  iv = crypto.randomBytes(16); // Correctly generate a 16 byte IV
  iv - id;
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.CRYPTO_SECRET_KEY, "hex"), // Ensure the secret key is correct and 32 bytes for aes-256-cbc
    iv
  );

  let encrypted = cipher.update(userPass, "utf8", "base64"); // The update method returns a chunk of the encrypted content
  encrypted += cipher.final("base64"); // The final method returns the last chunk, concatenate it with the previous chunk

  return {
    iv: iv.toString("hex"), // Convert IV to hexadecimal string for storage or transmission
    encryptedPassword: encrypted,
  };
};
const decrypt = (encrypted, ivString) => {
  if (!encrypted || !ivString) {
    throw new Error("Incomplete encryption data");
  }

  const iv = Buffer.from(ivString, "hex"); // Convert IV back to Buffer for decryption

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.CRYPTO_SECRET_KEY, "hex"),
    iv
  );

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
