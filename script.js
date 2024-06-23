const video = document.getElementById('qr-video');
const canvasElement = document.getElementById('qr-canvas');
const canvas = canvasElement.getContext('2d');

navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(function(stream) {
        video.srcObject = stream;
        video.setAttribute('playsinline', true);
        video.play();
        requestAnimationFrame(tick);
    });

function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
        });
        if (code) {
            console.log('Found QR code: ', code.data);
            // Aqui você pode lidar com os dados do QR code, por exemplo, exibir em algum lugar da página.
        }
    }
    requestAnimationFrame(tick);
}




