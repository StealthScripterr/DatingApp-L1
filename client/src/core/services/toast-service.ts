import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly containerId = 'fetchmate-toast-container';

  showSuccess(message: string, duration = 4000): void {
    this.show(message, 'success', duration);
  }

  showError(message: string, duration = 5000): void {
    this.show(message, 'error', duration);
  }

  showInfo(message: string, duration = 4000): void {
    this.show(message, 'info', duration);
  }

  private show(message: string, type: 'success' | 'error' | 'info', duration: number): void {
    const container = this.getOrCreateContainer();
    const toast = document.createElement('div');
    const iconMap = {
      success: '🐾',
      error: '⚠️',
      info: '✨',
    };

    toast.className = `fetchmate-toast fetchmate-toast--${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <span class="fetchmate-toast__icon" aria-hidden="true">${iconMap[type]}</span>
      <span class="fetchmate-toast__text">${message}</span>
      <button type="button" class="fetchmate-toast__close" aria-label="Dismiss notification">×</button>
    `;

    const closeButton = toast.querySelector('button');
    closeButton?.addEventListener('click', () => {
      container.removeChild(toast);
    });

    container.appendChild(toast);

    window.setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, duration);
  }

  private getOrCreateContainer(): HTMLElement {
    let container = document.getElementById(this.containerId);

    if (!container) {
      container = document.createElement('div');
      container.id = this.containerId;
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }

    return container;
  }
}
