const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__upload input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
// const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
// const photoPreview = document.querySelector('.ad-form__photo img');

avatarChooser.addEventListener('change', () => {
  const avatar = avatarChooser.files[0];
  const avatarName = avatar.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return avatarName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
          
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });
          
    reader.readAsDataURL(avatar);
  }
})

