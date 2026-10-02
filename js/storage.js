const STORAGE_KEY = "maos_que_transformam_voluntarios";

export function getVoluntarios() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Falha ao ler localStorage:", error);
    return [];
  }
}

function saveVoluntarios(voluntarios) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(voluntarios));
    return true;
  } catch (error) {
    console.error("Falha ao salvar localStorage:", error);
    return false;
  }
}

export function addVoluntario(voluntario) {
  const voluntarios = getVoluntarios();
  voluntarios.push(voluntario);
  return saveVoluntarios(voluntarios);
}

export function removeVoluntario(id) {
  const voluntarios = getVoluntarios().filter(item => item.id !== id);
  return saveVoluntarios(voluntarios);
}