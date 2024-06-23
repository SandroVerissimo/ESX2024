// Variável global para armazenar os QR codes lidos
let qrCodesLidos = [];

// Função para iniciar a câmera e ler QR codes
async function iniciarCameraQR() {
    try {
        // Obter todos os dispositivos de mídia
        const dispositivos = await navigator.mediaDevices.enumerateDevices();
        
        // Filtrar dispositivos de vídeo que são câmeras traseiras
        const cameraTraseira = dispositivos.find(
            dispositivo => dispositivo.kind === 'videoinput' && dispositivo.label.toLowerCase().includes('back')
        );
        
        // Verificar se a câmera traseira foi encontrada
        if (cameraTraseira) {
            // Configurar as restrições de vídeo para usar a câmera traseira
            const constraints = {
                video: {
                    deviceId: cameraTraseira.deviceId
                }
            };
            
            // Solicitar permissão para acessar a câmera traseira
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Exibir o vídeo da câmera traseira no elemento de vídeo
            const video = document.getElementById('video');
            video.srcObject = stream;

            // Configurar o leitor de QR code
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');
            const resultado = document.getElementById('resultado');
            const listaQRCodes = document.getElementById('listaQRCodes');

            function verificarCodigoQR() {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    if (!qrCodesLidos.includes(code.data)) {
                        qrCodesLidos.push(code.data);
                        resultado.textContent = 'QR Code detectado: ' + code.data;
                        // Adicionar QR code à lista
                        const listItem = document.createElement('li');
                        listItem.textContent = code.data;
                        listaQRCodes.appendChild(listItem);
                    } else {
                        resultado.textContent = 'QR Code já foi lido: ' + code.data;
                    }
                } else {
                    resultado.textContent = 'Nenhum QR Code detectado.';
                }
                requestAnimationFrame(verificarCodigoQR);
            }

            video.addEventListener('loadedmetadata', function() {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                requestAnimationFrame(verificarCodigoQR);
            });
            
        } else {
            console.error('Câmera traseira não encontrada.');
        }
    } catch (erro) {
        console.error('Erro ao acessar a câmera traseira:', erro);
    }
}

// Iniciar a câmera traseira ao carregar a página
window.onload = iniciarCameraQR;


