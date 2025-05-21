import multer from 'multer'
export function uploadImage(folder) {
  const storage = multer.diskStorage({
    destination: `./public/${folder}`,
    filename: function (req, file, cb) {
      console.log(file);
      let extension = file.originalname.split(".")[1];
      console.log(extension);
      cb(null, Date.now() + "." + extension);
    },
  });

  //
  const upload = multer({ storage: storage }).array("img"); //img es el name de los inputs type="file"
  return upload;
}
;
