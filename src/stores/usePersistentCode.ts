import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

/** @todo change to useCode to store code persistently for some time */
export default defineStore('code', () => {
  const codeFiles = ref<{
      name: string;
      code: string;
  }[]>([])
  const expiration = (3*24*60*60)

  function saveCode(code: string, file: string) {
    const now = Date.now()
    const index = codeFiles.value.findIndex(f => f.name === file);
    if (index !== -1) {
      codeFiles.value[index] = {
        name: file,
        code
      };
    } else {
      codeFiles.value.push({
        name: file,
        code
      })
    }
    cacheCode();
  }

  function cacheCode() {
    localStorage.setItem('files', JSON.stringify(codeFiles.value));
    localStorage.setItem('files_expire_in', (Date.now() + expiration*1000).toString() )
  }

  function getCode(file: string): string | null {
    const now = Date.now()

    const codeFile = codeFiles.value.find(f => f.name === file);
    if (!codeFile) return null;


        return codeFile.code;
  }

  function getAllCodeFiles() {
    const now = Date.now()

    const files = localStorage.getItem('files')

    const expires = localStorage.getItem('files_expire_in');
    if (expires===undefined || expires===null) {
      return null;
    }

    if (parseInt(expires) < now) {// Expired
        localStorage.removeItem('files');
    } else {
        codeFiles.value = JSON.parse(files ?? '{}');
    }

    return codeFiles.value;
  }

  function saveAllCodeFiles(files: {
      name: string;
      code: string;
  }[]) {
    codeFiles.value = files;
    cacheCode()
  }

  onMounted(getCode)

  return { codeFiles, getCode, saveCode, getAllCodeFiles, saveAllCodeFiles }
})
