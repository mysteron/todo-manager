import config from './config';
import ResourceApiClient from './classes/ResourceApiClient'

const editing = {};
let categories = [];

(function todoListFrontend() {

  const todoApiClient = new ResourceApiClient(config.API_URLS.BASE_URL, 'todo_notes');
  const categoryApiAclient = new ResourceApiClient(config.API_URLS.BASE_URL, 'categories');

  categoryApiAclient.list().exec().then((c) => {
    categories = c;
  })

  function toggleEdit(taskId, on = true) {
    if (on) {
      $('.todo_note_edit').find(`[data-taskid='${taskId}']`).show();
      $('.todo_note').find(`[data-taskid='${taskId}']`).hide();
    } else {
      $('.todo_note_edit').find(`[data-taskid='${taskId}']`).hide();
      $('.todo_note').find(`[data-taskid='${taskId}']`).show();
    }
  }

  function saveEdit(taskId) {
    const taskName = $('.todo_note_edit').find(`[data-taskid='${taskId}']`).find('input#title').val();
    const taskDesc = $('.todo_note_edit').find(`[data-taskid='${taskId}']`).find('input#description').val();
    const taskCategoryId = parseInt($('.todo_note_edit').find(`[data-taskid='${taskId}']`).find('select#categoryId').val());
    return todoApiClient.update(taskId, {
      title: taskName,
      description: taskDesc,
      category: `/api/categories/${taskCategoryId}`,
      user: `api/users/1`,
    }).then(() => {
      const categoryName = categories.find(c => c.id === taskCategoryId).name;
      $('.todo_note').find(`[data-taskid='${taskId}']`).find('#title').text(taskName);
      $('.todo_note').find(`[data-taskid='${taskId}']`).find('#description').text(taskDesc);
      $('.todo_note').find(`[data-taskid='${taskId}']`).find('#categoryName').text(categoryName);
    })
  }

  function remove(taskId) {
    todoApiClient.remove(taskId).then(() => {
      $('.todo_note').find(`[data-taskid='${taskId}']`).parent().remove();
      $('.todo_note_edit').find(`[data-taskid='${taskId}']`).parent().remove();
    });
  }

  $('.edit_note_icon').on('click', function () {
    const taskId = $(this).data().taskid;
    toggleEdit(taskId, true);
  });

  $('.cancel-edit').on('click', function () {
    const taskId = $(this).data().taskid;
    toggleEdit(taskId, false);
  });

  $('.save_edit').on('click', function () {
    const taskId = $(this).data().taskid;
    saveEdit(taskId).then(() => {
      toggleEdit(taskId, false);
    })
  });

  $('.bi-trash').on('click', function () {
    const taskId = $(this).data().taskid;
    console.log(taskId);
    remove(taskId);
  })

})();