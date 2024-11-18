export default {
  isImage: (filename: string) =>
    /\.(jpg|jpeg|png|gif|bmp|svg|webp|avif)$/i.test(filename.toLowerCase()),
  isVideo: (filename: string) =>
    /\.(mp4|avi|mov|wmv|flv|mkv|mpeg|vob|wav)$/i.test(filename.toLowerCase()),
  isAudio: (filename: string) =>
    /\.(mp3|wav|ogg|aac|flac|adt|adts|wma)$/i.test(filename.toLowerCase()),
  isCompressed: (filename: string) =>
    /\.(zip|rar|7z|tar|gz|bz2|xz)$/i.test(filename.toLowerCase()),
  isPDF: (filename: string) => /\.pdf$/i.test(filename.toLowerCase()),
  isCSV: (filename: string) => /\.csv$/i.test(filename.toLowerCase()),
  isWord: (filename: string) =>
    /\.(doc|docx|docm)$/i.test(filename.toLowerCase()),
  isExcel: (filename: string) =>
    /\.(xls|xlsx|xlsm)$/i.test(filename.toLowerCase()),
  isPowerPoint: (filename: string) =>
    /\.(ppt|pptx|pptm)$/i.test(filename.toLowerCase()),
};
