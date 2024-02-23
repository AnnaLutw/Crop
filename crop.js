$(document).ready(function() {
    var cropper;

    $('#picture').on('change', function(event) {
        var files = event.target.files;
        if (files && files.length > 0) {
            var reader = new FileReader();
            reader.onload = function(event) {
                $('#crop_modal').modal('show'); 
                $('#cropper_image').attr('src', event.target.result); 

                if (cropper) {
                    $('#cropper_image').cropper('destroy');
                }
    
                var image = $('#cropper_image');
                cropper = image.cropper({
                    aspectRatio: 1,
                    viewMode: 1,
                    cropBoxResizable: false // Impede redimensionamento do recorte
                });
            };
            reader.readAsDataURL(files[0]);
        }
    });

    $('#save_crop').on('click', function() {
       
        var croppedCanvas = $('#cropper_image').cropper('getCroppedCanvas', {
            width: 300,
            height: 300
        });

    
        $('#view_picture').attr('src', croppedCanvas.toDataURL());
        $('#view_picture').removeClass('d-none'); // Mostra a imagem cortada
     
        $('#crop_modal').modal('hide');
        $('#cropper_image').cropper('destroy');
        cropper = null; 
    });
});
