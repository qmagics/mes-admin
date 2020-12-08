export default {
  ywFile: {
    uppyDashboard: {
      // When `inline: false`, used as the screen reader label for the button that closes the modal.
      closeModal: '关闭',
      // Used as the screen reader label for the plus (+) button that shows the “Add more files” screen
      addMoreFiles: '添加更多',
      // TODO
      addingMoreFiles: '添加更多',
      // Used as the header for import panels, e.g., “Import from Google Drive”.
      importFrom: '从 %{name} 导入',
      // When `inline: false`, used as the screen reader label for the dashboard modal.
      dashboardWindowTitle: 'Uppy Dashboard Window (Press escape to close)',
      // When `inline: true`, used as the screen reader label for the dashboard area.
      dashboardTitle: '上传控制台',
      // Shown in the Informer when a link to a file was copied to the clipboard.
      copyLinkToClipboardSuccess: '链接已复制到剪贴板',
      // Used when a link cannot be copied automatically — the user has to select the text from the
      // input element below this string.
      copyLinkToClipboardFallback: 'Copy the URL below',
      // Used as the hover title and screen reader label for buttons that copy a file link.
      copyLink: '复制链接',
      // Used as the hover title and screen reader label for file source icons, e.g., “File source: Dropbox”.
      fileSource: '文件资源: %{name}',
      // Used as the label for buttons that accept and close panels (remote providers or metadata editor)
      done: "完成",
      // TODO
      back: '返回',
      // Used as the screen reader label for buttons that remove a file.
      removeFile: '删除文件',
      // Used as the screen reader label for buttons that open the metadata editor panel for a file.
      editFile: '编辑文件',
      // Shown in the panel header for the metadata editor. Rendered as “Editing image.png”.
      editing: '编辑 %{file}',
      // Text for a button shown on the file preview, used to edit file metadata
      edit: '编辑',
      // Used as the screen reader label for the button that saves metadata edits and returns to the
      // file list view.
      finishEditingFile: '结束文件编辑',
      // TODO
      saveChanges: '保存更改',
      // Used as the label for the tab button that opens the system file selection dialog.
      myDevice: '我的设备',
      // Shown in the main dashboard area when no files have been selected, and one or more
      // remote provider plugins are in use. %{browse} is replaced with a link that opens the system
      // file selection dialog.
      dropPasteImport: '拖拽文件到这里, 粘贴, %{browse} or import from',
      // Shown in the main dashboard area when no files have been selected, and no provider
      // plugins are in use. %{browse} is replaced with a link that opens the system
      // file selection dialog.
      dropPaste: '拖拽文件到这里, 粘贴 或者 %{browse}',
      // TODO
      dropHint: '拖拽文件到这里',
      // This string is clickable and opens the system file selection dialog.
      browse: '浏览文件',
      // Used as the hover text and screen reader label for file progress indicators when
      // they have been fully uploaded.
      uploadComplete: '上传完成',
      // TODO
      uploadPaused: '上传暂停',
      // Used as the hover text and screen reader label for the buttons to resume paused uploads.
      resumeUpload: '恢复上传',
      // Used as the hover text and screen reader label for the buttons to pause uploads.
      pauseUpload: '暂停上传',
      // Used as the hover text and screen reader label for the buttons to retry failed uploads.
      retryUpload: '重新上传',
      // Used as the hover text and screen reader label for the buttons to cancel uploads.
      cancelUpload: '取消上传',

      // Used in a title, how many files are currently selected
      xFilesSelected: {
        0: '已选中 %{smart_count} 个文件',
        1: '已选中 %{smart_count} 个文件'
      },
      // TODO
      uploadingXFiles: {
        0: '正在上传 %{smart_count} 个文件',
        1: '正在上传 %{smart_count} 个文件'
      },
      // TODO
      processingXFiles: {
        0: 'Processing %{smart_count} file',
        1: 'Processing %{smart_count} files'
      },

      // The "powered by Uppy" link at the bottom of the Dashboard.
      // **NOTE**: This string is called `poweredBy2` for backwards compatibility reasons.
      // See https://github.com/transloadit/uppy/pull/2077
      // poweredBy2: 'Powered by %{uppy}',
      poweredBy2: '',

      // @uppy/status-bar strings:
      uploading: '上传中',
      complete: '上传结束'
    },
    confirmDeleteFile: "是否确认删除该文件？"
  }
}
