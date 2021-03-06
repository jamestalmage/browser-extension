import $ from 'jquery';

export default function loader(urls, options, cb) {
  let callback = cb;

  if (typeof options === 'function') callback = options;

  const req = urls.shift();
  const url = req.url || req;

  $.ajax({
    method: req.method || options.method || 'HEAD',
    url,
  }).then(function (res) {
    callback(null, url, res);
  }).fail(function () {
    if (urls.length === 0) {
      return callback(new Error('Could not load any url'));
    }

    loader(urls, callback, options);
  });
}
