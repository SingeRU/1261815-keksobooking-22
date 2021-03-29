const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const onFileUpload = (fileChooser, preview, fileTypes) => {
  return (evt) => {
    evt.preventDefault();
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
  
    const matches = fileTypes.some((it) => {
      return fileName.endsWith(it);
    });
  
    if (matches) {
      const reader = new FileReader();
  
      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });
  
      reader.readAsDataURL(file);
    }
  }
};
  
const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const upload = document.querySelector('.ad-form__photo');
const previewPhoto = document.createElement('img');

previewPhoto.style.display = 'flex';
previewPhoto.style.maxWidth = '100%';
previewPhoto.style.height = 'auto';

upload.append(previewPhoto);


avatarChooser.addEventListener('change', onFileUpload(avatarChooser, previewAvatar, FILE_TYPES));

photoChooser.addEventListener('change', onFileUpload(photoChooser, previewPhoto, FILE_TYPES));



