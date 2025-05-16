// Abrir modal para editar noticia
function openEditNewsModal(id, title, content, row) {
  document.getElementById('editNewsId').value = id;
  document.getElementById('editNewsTitle').value = title;
  document.getElementById('editNewsContent').value = content;
  document.getElementById('editNewsModal').style.display = 'block';

  // Guardar la fila actual en el formulario para actualizar luego
  document.getElementById('editNewsForm').dataset.currentRow = row.rowIndex;
}

// Abrir modal para confirmar eliminación
function openDeleteNewsConfirmModal(id, row) {
  document.getElementById('deleteNewsConfirmModal').style.display = 'block';

  const btnConfirm = document.getElementById('confirmDeleteNewsBtn');

  // Cambiar evento para que elimine la fila en la tabla
  btnConfirm.onclick = function() {
    // Eliminar la fila
    const table = document.querySelector('table tbody');
    table.deleteRow(row.rowIndex - 1); // rowIndex es 1-based, tbody rows zero-based
    closeModal(null, 'deleteNewsConfirmModal');
  };
}

// Cerrar modal (si clic fuera del contenido o cancelar)
function closeModal(event, modalId) {
  if (!event || event.target.id === modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
}

// Manejar envío formulario editar noticia
document.getElementById('editNewsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('editNewsId').value;
  const title = document.getElementById('editNewsTitle').value;
  const content = document.getElementById('editNewsContent').value;

  // Obtener la fila actual
  const rowIndex = this.dataset.currentRow;
  if (rowIndex !== undefined) {
    const table = document.querySelector('table tbody');
    const row = table.rows[rowIndex - 1]; // Ajuste índice (rowIndex empieza en 1)
    if (row) {
      // Actualizar la celda del título
      row.cells[0].textContent = title;
      // Aquí podrías agregar más celdas para contenido si tienes
    }
  }

  closeModal(null, 'editNewsModal');
});

// Asignar eventos a botones existentes cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('table tbody');
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    const btnEdit = row.querySelector('.btn-primary');
    const btnDelete = row.querySelector('.btn-danger');

    btnEdit.addEventListener('click', () => {
      // Para demo, content no existe, le paso texto dummy
      openEditNewsModal(i, row.cells[0].textContent, 'Contenido de ejemplo', row);
    });

    btnDelete.addEventListener('click', () => {
      openDeleteNewsConfirmModal(i, row);
    });
  }
});
