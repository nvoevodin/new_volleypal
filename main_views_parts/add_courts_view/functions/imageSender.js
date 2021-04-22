import mime from "mime";

export const uploadImage = async (image, name, city, country, address) => {
  // Check if any file is selected or not
  if (image != null) {
    // If file selected then create FormData
    const fileToUpload = image;
    const data = new FormData();
    data.append("name", name);
    data.append("city", city);
    data.append("country", country);
    data.append("address", address);

    const newImageUri = "file:///" + fileToUpload.uri.split("file:/").join("");

    data.append("fileData", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: "image",
    });
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: data,
    };
    fetch(`${global.x}/addImage`, config)
      .then((checkStatusAndGetJSONResponse) => {})
      .catch((err) => {
        console.log(err);
      });
  } else {
    // If no file selected the show alert
    alert("Please Select File first");
  }
};
