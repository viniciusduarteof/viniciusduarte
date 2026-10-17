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
});
