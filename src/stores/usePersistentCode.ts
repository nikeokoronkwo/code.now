import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

/** @todo change to useCode to store code persistently for some time */
export default defineStore('code', () => {
  const code = ref('');
  const filename = ref('');
  const expiration = (3*24*60*60)

  function saveCode(c?: string, f?: string) {
    const now = Date.now()
    localStorage.setItem('code', c ?? code.value);
    localStorage.setItem('code_filename', f ?? filename.value);
    localStorage.setItem('code_expires_in', now + expiration*1000);
  }

  function getCode(): string | null {
    const now = Date.now()

    const expires = localStorage.getItem('code_expires_in')
    if (expires===undefined || expires===null) {
      return null;
    }

    if (parseInt(expires) < now) {// Expired
        localStorage.removeItem('code');
        return null;
    } else {
        try {
            code.value = localStorage.getItem('code') ?? '';
            filename.value = localStorage.getItem('code_filename') ?? '';
            return code.value;
        } catch(e) {
            console.log('getStorage: Error reading key ["code"] from localStorage: ' + JSON.stringify(e) );
            return null;
        }
    }
  }

  onMounted(getCode)

  return { code, filename, getCode, saveCode }
})
