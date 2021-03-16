export const ExportTasks = async() => {
	fetch('/api/export').then((response) => {
    return response.blob().then((b) => {
      const a = document.createElement("a");
      a.setAttribute("download", 'export.json');
      a.href = URL.createObjectURL(b);
      a.click();
    });
  });
}
