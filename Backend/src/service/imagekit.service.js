const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImage(buffer, filename = `waste_${Date.now()}.jpg`) {
  // buffer should be base64 string or file buffer
  const upload = await imagekit.upload({
    file: buffer.toString("base64"), // if buffer
    fileName: filename,
    useUniqueFileName: true,
  });
  return upload.url; // returns the image URL
}

module.exports = { uploadImage };
