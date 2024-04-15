
function downloadLibraries() {
    // Send a GET request to the server to download the files
    fetch('/download-libraries', {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            return response.blob();
        }
        throw new Error('Network response was not ok.');
    })
    .then(blob => {
        // Create a download link for the blob
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'libraries.zip'; // Specify the filename for the downloaded file
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
    