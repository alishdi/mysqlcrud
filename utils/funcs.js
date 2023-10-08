const path = require("path");

function ListOfImagesForRequest(files, fileUploadPath) {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(`http://localhost:3000/`, fileUploadPath, file.filename))
      .map((item) => item.replace(/\\/g, "//"));
  } else {
    return [];
  }
}

module.exports = ListOfImagesForRequest;
