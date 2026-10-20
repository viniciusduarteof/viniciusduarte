document.addEventListener('DOMContentLoaded', () => {
  const profileCard = document.querySelector('.profile-card');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const typingName = document.querySelector('.typing-name');
  const name = 'Vinícius Duarte :)';

  if (typingName) {
    if (prefersReducedMotion) {
      typingName.textContent = name;
    } else {
      const characters = Array.from(name);
      let index = 0;
      typingName.textContent = '';

      const typeNextCharacter = () => {
        if (index >= characters.length) return;

        typingName.textContent += characters[index];
        index += 1;
        window.setTimeout(typeNextCharacter, 100);
      };

      typeNextCharacter();
    }
  }

  if (profileCard && !prefersReducedMotion) {
    profileCard.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;

      const bounds = profileCard.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

      profileCard.style.setProperty('--profile-rotate-x', `${-offsetY * 22}deg`);
      profileCard.style.setProperty('--profile-rotate-y', `${offsetX * 22}deg`);
    });

    profileCard.addEventListener('pointerleave', () => {
      profileCard.style.setProperty('--profile-rotate-x', '0deg');
      profileCard.style.setProperty('--profile-rotate-y', '0deg');
    });
  }

  const certificateDialog = document.querySelector('.certificate-dialog');
  const certificateTitle = document.querySelector('#certificate-dialog-title');
  const certificatePreview = document.querySelector('.certificate-preview');
  const certificateClose = document.querySelector('.certificate-dialog-close');

  if (certificateDialog && certificateTitle && certificatePreview && certificateClose) {
    document.querySelectorAll('.certificate-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const title = trigger.dataset.certificateTitle;
        const certificateFiles = trigger.dataset.certificateImages.split('|');
        const certificateLabels = trigger.dataset.certificateLabels?.split('|');

        certificateTitle.textContent = title;
        certificatePreview.replaceChildren();

        if (certificateFiles[0].endsWith('.pdf')) {
          const pdf = document.createElement('iframe');
          pdf.className = 'certificate-pdf';
          pdf.title = `Visualização do certificado: ${title}`;
          pdf.src = certificateFiles[0];
          certificatePreview.append(pdf);
        } else {
          const imageList = document.createElement('div');
          imageList.className = 'certificate-image-list';

          certificateFiles.forEach((file, index) => {
            const figure = document.createElement('figure');
            const image = document.createElement('img');
            image.alt = certificateFiles.length > 1
              ? `${title} — ${index === 0 ? 'frente' : 'verso'}`
              : title;
            image.src = file;

            image.addEventListener('error', () => {
              const errorMessage = document.createElement('p');
              errorMessage.className = 'certificate-load-error';
              errorMessage.textContent = 'Não foi possível carregar este certificado.';
              figure.replaceChildren(errorMessage);
            });

            figure.append(image);

            if (certificateFiles.length > 1) {
              const caption = document.createElement('figcaption');
              caption.textContent = certificateLabels?.[index]
                || (index === 0 ? 'Frente' : 'Verso');
              figure.append(caption);
            }

            imageList.append(figure);
          });

          certificatePreview.append(imageList);
        }

        certificateDialog.showModal();
      });
    });

    certificateClose.addEventListener('click', () => certificateDialog.close());
    certificateDialog.addEventListener('click', (event) => {
      if (event.target === certificateDialog) certificateDialog.close();
    });
    certificateDialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      certificateDialog.close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && certificateDialog.open) certificateDialog.close();
    });
    certificateDialog.addEventListener('close', () => certificatePreview.replaceChildren());
  }
});
