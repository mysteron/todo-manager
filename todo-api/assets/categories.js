import config from './config';
import ResourceApiClient from './classes/ResourceApiClient'


(function categoryFrontend() {

  const categoryApiAclient = new ResourceApiClient(config.API_URLS.BASE_URL, 'categories');


  function toggleAdding(on = true) {
    if (on) {
      $('.category-add-button').hide();
      $('.category-adding').show();
    } else {
      $('.category-add-button').show();
      $('.category-adding').hide();
    }
  }

  function toggleEdit(catId, on = true) {
    if (on) {
      $('.category_edit').find(`[data-catid='${catId}']`).show();
      $('.category').find(`[data-catid='${catId}']`).hide();
    } else {
      $('.category_edit').find(`[data-catid='${catId}']`).hide();
      $('.category').find(`[data-catid='${catId}']`).show();
    }
  }

  function saveEdit(catId) {
    const catName = $('.category_edit').find(`[data-catid='${catId}']`).find('input#title').val();
    const catDesc = $('.category_edit').find(`[data-catid='${catId}']`).find('input#description').val();
    return categoryApiAclient.update(catId, {
      name: catName,
      description: catDesc,
      owner: `/api/users/1`,
    }).then(() => {
      $('.category').find(`[data-catid='${catId}']`).find('#title').text(catName);
      $('.category').find(`[data-catid='${catId}']`).find('#description').text(catDesc);
    })
  }


  function saveNew() {
    const categoryName = $('.category-adding').find('input#title').val();
    const categoryDesc = $('.category-adding').find('input#description').val();
    return categoryApiAclient.add({
      name: categoryName,
      description: categoryDesc,
      owner: `/api/users/1`,
    }).then((c) => {      
      const categoryCopy = $('.category').last().clone(true).appendTo('.categories');
      $(categoryCopy).find('.category-card').attr('data-catid', c.id);
      $(categoryCopy).find('#title').text(categoryName);
      $(categoryCopy).find('#description').text(categoryDesc);


      const categoryEditCopy = $('.category_edit').last().clone(true).appendTo('.categories');
      $(categoryEditCopy).find('.category-card').attr('data-catid', c.id);
      $(categoryEditCopy).find('#title').val(categoryName);
      $(categoryEditCopy).find('#description').val(categoryDesc);

      $('.category-adding').find('input#title').val('');
      $('.category-adding').find('input#description').val('');
    });
  }

  function remove(catId) {
    categoryApiAclient.remove(catId).then(() => {
      $('.category').find(`[data-catid='${catId}']`).parent().remove();
      $('.category_edit').find(`[data-catid='${catId}']`).parent().remove();
    });
  }

  $('.cat-edit').on('click', function () {
    const catId = $(this).parents('.category-card').data().catid;
    toggleEdit(catId, true);
  });

  $('.cancel-cat-edit').on('click', function () {
    const catId = $(this).parents('.category-card').data().catid;
    toggleEdit(catId, false);
  });

  $('.cat-edit-save').on('click', function () {
    const taskId = $(this).parents('.category-card').data().catid;
    saveEdit(taskId).then(() => {
      toggleEdit(taskId, false);
    })
  });

  $('.cat-del').on('click', function () {
    const catId = $(this).parents('.category-card').data().catid;
    remove(catId);
  });

  $('.category-add-button').on('click', function () {
    toggleAdding(true);
  });

  $('.cat-cancel-new').on('click', function () {
    toggleAdding(false);
  });

  $('.cat-save-new').on('click', function () {
    saveNew().then(() => {
      toggleAdding(false);
    });
  });

})();