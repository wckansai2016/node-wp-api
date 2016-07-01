module.exports = (function () {

  return {

    init: function (api) {
      this.getPosts(api);
    },

    getPosts: function (api) {

      $.ajax({
        type: 'GET',
        url: api,
        dataType: 'json'
      })
      .done(function (data) {
        $(data).each(function (index, value) {
          $('ul.posts').append(
            '<li class="post">' +
              '<h2 class="entry-title">' + value.title.rendered + '</h2>' +
              '<div class="entry-content">' + value.content.rendered + '</div>' +
            '</li>'
          );
        });
      })
      .fail(function (error) {
        console.log(error);
      });
    }

  };

})();
