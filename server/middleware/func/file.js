import Busboy from "busboy";
import fs from "fs";
import path from "path";

//检测文件并创建文件
const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
};
// 删除本地图片
export const removeFile = (filePath) => {
  fs.unlink(filePath, function(err) {
    if (err) {
      throw err;
    }
    console.log("文件:" + filePath + "删除成功！");
  });
};

export const uploadFile = (ctx, opts) => {
  //重命名
  function rename(fileName) {
    return (
      Math.random()
        .toString(16)
        .substr(2) +
      "." +
      fileName.split(".").pop()
    );
  }
  let busboy = new Busboy({ headers: ctx.req.headers });
  console.log("start uploading...");
  /*
        filename: 字段名，
        file: 文件流,
        filename: 文件名
    */
  return new Promise((resolve, reject) => {
    var fileObj = {};
    busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {
      let filePath = "",
        imgPrefix = "";

      filePath = path.join(opts.path, mimetype.split("/")[0] + "s");
      // 现网图片路径不一样
      imgPrefix = `${ctx.protocol}://${ctx.host}/${mimetype.split("/")[0]}s`;

      if (!mkdirSync(filePath)) {
        throw new Error("没找到目录");
      }
      let fName = rename(filename),
        fPath = path.join(path.join(filePath, fName));
      file.pipe(fs.createWriteStream(fPath));

      console.log("fName =>", fName);
      console.log("fPath =>", fPath);

      file.on("end", () => {
        fileObj[fieldname] = `${imgPrefix}/${fName}`;
      });
    });

    busboy.on(
      "field",
      (
        fieldname,
        val,
        fieldnameTruncated,
        valTruncated,
        encoding,
        mimetype
      ) => {
        fileObj[fieldname] = val;
      }
    );

    busboy.on("finish", async () => {
      resolve(fileObj);
      console.log("finished...", fileObj);
    });
    busboy.on("error", function(err) {
      console.log("err:" + err);
      reject(err);
    });

    ctx.req.pipe(busboy);
  });
};
