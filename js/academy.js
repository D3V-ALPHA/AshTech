/* =====================================================================
   ASHTECH: academy.js

   WHY JAVASCRIPT?
   A form sends its answers to the next page in the address bar,
   like trainer-card.html?name=Ash&age=9. But a PHOTO is far too big to
   fit in an address. So, just before the form is sent, this script
   shrinks the photo and keeps it in the browser's "session storage"
   (a little notebook that remembers things until you close the tab).
   The trainer card page then picks it up from there.
   Nothing is ever uploaded anywhere. It all stays on your computer.
   ===================================================================== */

const form = document.querySelector('.signup');
const photoInput = document.querySelector('#photo');

form.addEventListener('submit', async (event) => {
  const file = photoInput.files[0];

  // No photo chosen? Forget any old photo and let the form go as normal.
  if (!file) {
    sessionStorage.removeItem('trainerPhoto');
    return;
  }

  // Stop the form for a moment while we shrink the photo…
  event.preventDefault();

  try {
    const small = await shrinkPhoto(file, 480);
    sessionStorage.setItem('trainerPhoto', small);
  } catch (error) {
    // If anything goes wrong, the card simply uses the partner Pokémon instead.
    sessionStorage.removeItem('trainerPhoto');
  }

  // …then send it. The browser won't try to send the file itself with
  // method="get", so we switch the input off first to keep the address short.
  photoInput.disabled = true;
  form.submit();
});

// Draw the photo onto a small canvas and turn it into text (a "data URL").
function shrinkPhoto(file, maxSize) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(img.src);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
