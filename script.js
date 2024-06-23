// Função para acessar a câmera traseira
async function iniciarCameraTraseira() {
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
        } else {
            console.error('Câmera traseira não encontrada.');
        }
    } catch (erro) {
        console.error('Erro ao acessar a câmera traseira:', erro);
    }
}

// Iniciar a câmera traseira ao carregar a página
window.onload = iniciarCameraTraseira;
