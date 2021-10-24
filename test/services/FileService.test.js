const assert = require("assert");
const sinon = require("sinon");
const fs = require("fs");

const FileService = require("../../services/FileService.js");
const AuthService = require("../../services/AuthService.js");

describe("FileService", function() {
  const user = { folderName: "test" };

  const mockResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
    res.download = sinon.stub();
    return res;
  };

  let getUserInfoStub;

  beforeEach(() => {
    getUserInfoStub = sinon.stub(AuthService, "getUserInfo").resolves(user);
  });

  afterEach(() => {
    getUserInfoStub.restore();
  });

  it(".upload - sends back 400 when no files sent", async function() {
    const req = {
      headers: {
        token: "valid-token"
      }
    };
    const res = mockResponse();
    await FileService.upload(req, res);
    const status = res.status.getCall(0).args[0];
    const { message } = res.send.getCall(0).args[0];

    assert.equal(getUserInfoStub.calledOnce, true);
    assert.equal(res.status.calledOnce, true);
    assert.equal(res.send.calledOnce, true);
    assert.equal(status, 400);
    assert.equal(message, "No files were sent.");
  });

  it(".upload - sends back urls", async function() {
    const req = {
      headers: {
        token: "valid-token"
      },
      files: {
        file1: { name: "test.txt", mv: sinon.stub() },
        file2: { name: "test.mp3", mv: sinon.stub() }
      }
    };
    const expectUrls = {
      file1: "undefined/d/test/test.txt",
      file2: "undefined/d/test/test.mp3"
    };
    const res = mockResponse();
    await FileService.upload(req, res);
    const status = res.status.getCall(0).args[0];
    const urls = res.send.getCall(0).args[0];

    assert.equal(getUserInfoStub.calledOnce, true);
    assert.equal(res.status.calledOnce, true);
    assert.equal(res.send.calledOnce, true);
    assert.equal(status, 201);
    assert.deepEqual(urls, expectUrls);
  });

  it(".download - has correct download path", async function() {
    const req = {
      params: {
        folder: "test",
        file: "file.txt"
      }
    };
    const expectedPath = /uploads\\test\\file\.txt/;
    const res = mockResponse();
    await FileService.download(req, res);
    const download = res.download.getCall(0).args[0];

    assert.equal(getUserInfoStub.calledOnce, false);
    assert.equal(expectedPath.test(download), true);
  });

  it(".list - sends back file list", async function() {
    const readdirSyncStub = sinon
      .stub(fs, "readdirSync")
      .returns(["test1.txt", "test2.mp3"]);
    const req = {
      headers: {
        token: "valid-token"
      }
    };
    const expectedList = [
      {
        file: "test1.txt",
        url: "undefined/d/test/test1.txt"
      },
      {
        file: "test2.mp3",
        url: "undefined/d/test/test2.mp3"
      }
    ];
    const res = mockResponse();
    await FileService.list(req, res);
    const status = res.status.getCall(0).args[0];
    const list = res.send.getCall(0).args[0];

    assert.equal(getUserInfoStub.calledOnce, true);
    assert.equal(res.status.calledOnce, true);
    assert.equal(res.send.calledOnce, true);
    assert.equal(readdirSyncStub.calledOnce, true);
    assert.equal(status, 200);
    assert.deepEqual(list, expectedList);

    readdirSyncStub.restore();
  });

  it(".delete - sends back 200", async function() {
    const rmSyncStub = sinon.stub(fs, "rmSync");
    const req = {
      headers: {
        token: "valid-token"
      },
      params: {
        filename: "test1.txt"
      }
    };
    const res = mockResponse();
    await FileService.delete(req, res);
    const status = res.status.getCall(0).args[0];
    const { message } = res.send.getCall(0).args[0];

    assert.equal(getUserInfoStub.calledOnce, true);
    assert.equal(res.status.calledOnce, true);
    assert.equal(res.send.calledOnce, true);
    assert.equal(rmSyncStub.calledOnce, true);
    assert.equal(status, 200);
    assert.equal(message, "The file was deleted.");

    rmSyncStub.restore();
  });
});
