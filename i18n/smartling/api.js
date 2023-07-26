import {
  DownloadFileParameters,
  FileType,
  RetrievalType,
  SmartlingApiClientBuilder,
  SmartlingFilesApi,
  UploadFileParameters,
} from "smartling-api-sdk-nodejs";

class SmartlingAPI {
  constructor(opts = {}) {
    if (!opts.userID || !opts.userSecret || !opts.projectID) {
      throw new Error(
        "Error when initializing Smartling API, missing UserID, UserSecret, or ProjectID"
      );
    }

    this.userID = opts.userID;
    this.userSecret = opts.userSecret;
    this.projectID = opts.projectID;

    const apiBuilder = new SmartlingApiClientBuilder()
      // .setLogger(console)
      .setBaseSmartlingApiUrl("https://api.smartling.com")
      .authWithUserIdAndUserSecret(this.userID, this.userSecret);

    this.filesAPI = apiBuilder.build(SmartlingFilesApi);
  }

  async download(filename, locale) {
    const downloadParams = new DownloadFileParameters().setRetrievalType(
      RetrievalType.PUBLISHED
    );

    try {
      return await this.filesAPI.downloadFile(
        this.projectID,
        filename,
        locale,
        downloadParams
      );
    } catch (err) {
      console.log(err);
    }
  }

  async upload(filename) {
    const filepath = new URL(`./${filename}`, import.meta.url);
    const uploadParams = new UploadFileParameters()
      .setFileFromLocalFilePath(filepath)
      .setFileType(FileType.GETTEXT)
      .setFileUri(filename);
    uploadParams.set("authorize", "true");

    try {
      await this.filesAPI.uploadFile(this.projectID, uploadParams);
    } catch (err) {
      console.log(err);
    }
  }
}

export { SmartlingAPI };
