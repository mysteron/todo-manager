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

  function toggleAdding(on = true) {
    if (on) {
      $('.todo-add-button').hide();
      $('.todo-adding').show();
    } else {
      $('.todo-add-button').show();
      $('.todo-adding').hide();
    }
  }

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
      owner: `/api/users/1`,
    }).then(() => {
      const categoryName = categories.find(c => c.id === taskCategoryId).name;
      $('.todo_note').find(`[data-taskid='${taskId}']`).find('#title').text(taskName);
      $('.todo_note').find(`[data-taskid='${taskId}']`).find('#description').text(taskDesc);
      $('.todo_note').find(`[data-taskid='${taskId}']`).find('#categoryName').text(categoryName);
    })
  }

  function completeTask(taskId, completed) {
    return todoApiClient.update(taskId, {
      completed
    });
  }

  function saveNew() {
    const taskName = $('.todo-adding').find('input#title').val();
    const taskDesc = $('.todo-adding').find('input#description').val();
    const taskCategoryId = parseInt($('.todo-adding').find('select#categoryId').val());
    return todoApiClient.add({
      completed: false,
      title: taskName,
      description: taskDesc,
      category: `/api/categories/${taskCategoryId}`,
      owner: `/api/users/1`,
    }).then((t) => {
      const categoryName = categories.find(c => c.id === taskCategoryId).name;

      const todoNoteCopy = $('.todo_note').last().clone(true).appendTo('.todo-notes');
      $(todoNoteCopy).find('.todo-card').attr('data-taskid', t.id);
      $(todoNoteCopy).find('#title').text(taskName);
      $(todoNoteCopy).find('#description').text(taskDesc);
      $(todoNoteCopy).find('#categoryName').text(categoryName);

      const todoEditCopy = $('.todo_note_edit').last().clone(true).appendTo('.todo-notes');
      $(todoEditCopy).find('.todo-card').attr('data-taskid', t.id);
      $(todoEditCopy).find('#title').val(taskName);
      $(todoEditCopy).find('#description').val(taskDesc);
      $(todoEditCopy).find('#categoryName').val(categoryName);

      $('.todo-adding').find('input#title').val('');
      $('.todo-adding').find('input#description').val('');
      $('.todo-adding').find('select#categoryId').val('')
    });
  }

  function remove(taskId) {
    todoApiClient.remove(taskId).then(() => {
      $('.todo_note').find(`[data-taskid='${taskId}']`).parent().remove();
      $('.todo_note_edit').find(`[data-taskid='${taskId}']`).parent().remove();
    });
  }

  $('.edit_note_icon').on('click', function () {
    const taskId = $(this).parents('.todo-card').data().taskid;
    toggleEdit(taskId, true);
  });

  $('.cancel-edit').on('click', function () {
    const taskId = $(this).parents('.todo-card').data().taskid;
    toggleEdit(taskId, false);
  });

  $('.save_edit').on('click', function () {
    const taskId = $(this).parents('.todo-card').data().taskid;
    saveEdit(taskId).then(() => {
      toggleEdit(taskId, false);
    })
  });

  $('.task_del').on('click', function () {
    const taskId = $(this).parents('.todo-card').data().taskid;
    remove(taskId);
  });

  $('.todo-add-button').on('click', function () {
    toggleAdding(true);
  });

  $('.cancel-new').on('click', function () {
    toggleAdding(false);
  });

  $('.save-new').on('click', function () {
    saveNew().then(() => {
      toggleAdding(false);
    });
  });

  $('.mark-done').on('change', function () {
    const taskId = $(this).parents('.todo-card').data().taskid;
    const completed = $(this).is(':checked');
    completeTask(taskId, completed);
  });

})();