$(document).ready(function () {
  $("#name").keydown(function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if ($(this).val() === "") {
        alert("Por favor, ingresa tu nombre completo.");
        $(this).focus();
      } else {
        $("#username").focus();
      }
    }
  });

  $("#username").keydown(function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if ($(this).val() === "") {
        alert("Por favor, ingresa tu correo electrónico.");
        $(this).focus();
      } else {
        $("#city").focus();
      }
    }
  });

  $("#city").keydown(function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if ($(this).val() === "") {
        alert("Por favor, selecciona tu ciudad.");
        $(this).focus();
      } else {
        $("#cicinematy").focus();
      }
    }
  });

  $("#cinema").keydown(function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if ($(this).val() === "") {
        alert("Por favor, selecciona tu cine favorito.");
        $(this).focus();
      } else {
        $("#citccty").focus();
      }
    }
  });

  $("#tcc").on("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  $("#tcc").keydown(function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if ($(this).val() === "") {
        alert("Por favor, ingresa tu Tarjeta Club Cinépolis®");
        $(this).focus();
      } else {
        $("#registerButton").focus();
      }
    }
  });

  $("#city").on("change", function () {
    var url = route("marcas/sala-de-arte-v2/index.aspx/GetComplex");
    var val = $(this).val();

    $.ajax({
      type: "POST",
      url: url,
      data: "{'cityId': '" + val + "' }",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        var cinema = $("#cinema");
        cinema.empty();
        cinema.append(response.d);
      },
    });
  });

  $("#registerButton").on("click", function (e) {
    e.preventDefault();
    var url = route("marcas/sala-de-arte-v2/index.aspx/Register");
    var messageA = "";

    var nombre = $("#name").val(),
      correo = $("#username").val(),
      idVista = $("#cinema option:selected").val(),
      tcc = $("#tcc").val(),
      city = $("#city").val();

    if (nombre === "") {
      messageA += "- Por favor, ingresa tu nombre completo.\n";
      nombre = "";
    }

    if (correo === "") {
      messageA += "- Por favor, ingresa tu correo electrónico.\n";
      correo = "";
    }

    if (correo.length > 0) {
      if (!correo.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)) {
        messageA += "- El formato de correo electrónico no es válido.\n";
      }
    }

    if (tcc === "") {
      messageA += "- Por favor, ingresa tu Tarjeta Club Cinépolis®.\n";
      tcc = "";
    }

    if (tcc.length > 0 && tcc.length <= 16) {
      if (!tcc.match(/^(1303\d{12})$/)) {
        messageA +=
          "- El formato de tu Tarjeta Club Cinépolis® no es válido.\n";
      }
    } else {
      messageA += "- El formato de tu Tarjeta Club Cinépolis® no es válido.\n";
    }

    if (city === "") {
      messageA += "- Por favor, selecciona tu ciudad.\n";
    }

    if (idVista === "") {
      messageA += "- Por favor, selecciona tu cine.\n";
    }

    if (!jQuery("#privacy").is(":checked")) {
      messageA +=
        "- Para continuar, tienes que aceptar el Aviso de Privacidad.\n";
    }

    if (messageA !== "") {
      alert(messageA);
      return false;
    }

    $.ajax({
      type: "POST",
      url: url,
      data:
        "{nombre: '" +
        nombre +
        "',  correo: '" +
        correo +
        "', idVista: '" +
        idVista +
        "', tcc: '" +
        tcc +
        "' }",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        var ok = JSON.parse(response.d);
        alert(ok.Message);

        if (ok.Status) {
          $("#name").val("");
          $("#username").val("");
          $("#cinema option:selected").val("");
          $("#tcc").val("");
          $("#city").val("");
          $("#privacy").click();
          $("#name").focus();
        }
      },
    });
  });
});

function showTimeReplace() {
  var urlBase = "https://compra.cinepolis.com/";
  $(".top-movie-time").each(function () {
    var time = $(this);
    var showTime = time.attr("data-showtime");
    var cinemacode = time.attr("data-cinemacode");
    if (showTime !== undefined && cinemacode !== undefined) {
      var urlItemTime =
        urlBase +
        "?cinemaVistaId=" +
        cinemacode +
        "&showtimeVistaId=" +
        showTime +
        "";
      time.removeAttr("href").attr("href", urlItemTime);
    }
  });
}

$(".top-movie-links").removeClass("filled");
$(".cinema-billboard").on("change", function (i, v) {
  var url = route("marcas/sala-de-arte-v2/index.aspx/Schedule");
  var value2 = $(this).val();

  if (value2 === "" || value2 === undefined) {
    $(".top-movie-links").removeClass("filled");
    $('.cinema-billboard option[value="' + "" + '"]').prop("selected", true);
    return false;
  }

  $('.cinema-billboard option[value="' + value2 + '"]').prop("selected", true);
  $(".cinema-billboard").each(function () {
    var value = $(this).val();
    var moviekey = $("option:selected", this).attr("movie-key");
    var cityKey = $("option:selected", this).attr("movie-citykey");
    var cinemaKey = $("option:selected", this).attr("data-cinemakey");

    var idUrl = $(this).attr("id");
    var id = "#items-movie-links-" + idUrl;
    var elementoId = $(id);

    if (value2 === value) {
      $.ajax({
        type: "POST",
        url: url,
        data:
          "{movieKey:'" +
          moviekey +
          "', cityKey:'" +
          cityKey +
          "', cinemaKey:'" +
          cinemaKey +
          "' }",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
          elementoId.empty();
          if (response.d === "null") {
            //elementoId.removeClass("filled");
            elementoId.addClass("filled");
            elementoId.empty();
            elementoId.append(
              "<span class='without-schedules'>No hay horarios disponibles</span>"
            );
          } else {
            elementoId.addClass("filled");
            elementoId.empty();
            elementoId.append(response.d);
          }
          showTimeReplace();
        },
      });
    } else {
      $(this).val("");
      elementoId.removeClass("filled");
      elementoId.empty();
    }
  });

  // var items = $(".top-movie-links-content").length;
  // var obj = $(".top-movie-links");
  // if (items === 0) {
  //     obj.addClass("filled");
  //     obj.append("<span>No hay horarios disponibles</span>");
  // }
});

function route(url) {
  $.Url = /localhost/.test(document.URL)
    ? location.protocol + "//" + location.host + "/"
    : location.protocol + "//" + location.host + "/";
  return $.Url + url;
}

// Generated by CoffeeScript 1.9.3
(function () {
  var e;
  (e = (function () {
    function e(e, t) {
      var n, r;
      this.options = {
        target: "instafeed",
        get: "popular",
        resolution: "thumbnail",
        sortBy: "none",
        links: !0,
        mock: !1,
        useHttp: !1,
      };
      if (typeof e == "object") for (n in e) (r = e[n]), (this.options[n] = r);
      (this.context = t != null ? t : this), (this.unique = this._genKey());
    }
    return (
      (e.prototype.hasNext = function () {
        return (
          typeof this.context.nextUrl == "string" &&
          this.context.nextUrl.length > 0
        );
      }),
      (e.prototype.next = function () {
        return this.hasNext() ? this.run(this.context.nextUrl) : !1;
      }),
      (e.prototype.run = function (t) {
        var n, r, i;
        if (
          typeof this.options.clientId != "string" &&
          typeof this.options.accessToken != "string"
        )
          throw new Error("Missing clientId or accessToken.");
        if (
          typeof this.options.accessToken != "string" &&
          typeof this.options.clientId != "string"
        )
          throw new Error("Missing clientId or accessToken.");
        return (
          this.options.before != null &&
            typeof this.options.before == "function" &&
            this.options.before.call(this),
          typeof document != "undefined" &&
            document !== null &&
            ((i = document.createElement("script")),
            (i.id = "instafeed-fetcher"),
            (i.src = t || this._buildUrl()),
            (n = document.getElementsByTagName("head")),
            n[0].appendChild(i),
            (r = "instafeedCache" + this.unique),
            (window[r] = new e(this.options, this)),
            (window[r].unique = this.unique)),
          !0
        );
      }),
      (e.prototype.parse = function (e) {
        var t,
          n,
          r,
          i,
          s,
          o,
          u,
          a,
          f,
          l,
          c,
          h,
          p,
          d,
          v,
          m,
          g,
          y,
          b,
          w,
          E,
          S,
          x,
          T,
          N,
          C,
          k,
          L,
          A,
          O,
          M,
          _,
          D;
        if (typeof e != "object") {
          if (
            this.options.error != null &&
            typeof this.options.error == "function"
          )
            return this.options.error.call(this, "Invalid JSON data"), !1;
          throw new Error("Invalid JSON response");
        }
        if (e.meta.code !== 200) {
          if (
            this.options.error != null &&
            typeof this.options.error == "function"
          )
            return this.options.error.call(this, e.meta.error_message), !1;
          throw new Error("Error from Instagram: " + e.meta.error_message);
        }
        if (e.data.length === 0) {
          if (
            this.options.error != null &&
            typeof this.options.error == "function"
          )
            return (
              this.options.error.call(
                this,
                "No images were returned from Instagram"
              ),
              !1
            );
          throw new Error("No images were returned from Instagram");
        }
        this.options.success != null &&
          typeof this.options.success == "function" &&
          this.options.success.call(this, e),
          (this.context.nextUrl = ""),
          e.pagination != null &&
            (this.context.nextUrl = e.pagination.next_url);
        if (this.options.sortBy !== "none") {
          this.options.sortBy === "random"
            ? (M = ["", "random"])
            : (M = this.options.sortBy.split("-")),
            (O = M[0] === "least" ? !0 : !1);
          switch (M[1]) {
            case "random":
              e.data.sort(function () {
                return 0.5 - Math.random();
              });
              break;
            case "recent":
              e.data = this._sortBy(e.data, "created_time", O);
              break;
            case "liked":
              e.data = this._sortBy(e.data, "likes.count", O);
              break;
            case "commented":
              e.data = this._sortBy(e.data, "comments.count", O);
              break;
            default:
              throw new Error(
                "Invalid option for sortBy: '" + this.options.sortBy + "'."
              );
          }
        }
        if (
          typeof document != "undefined" &&
          document !== null &&
          this.options.mock === !1
        ) {
          (m = e.data),
            (A = parseInt(this.options.limit, 10)),
            this.options.limit != null && m.length > A && (m = m.slice(0, A)),
            (u = document.createDocumentFragment()),
            this.options.filter != null &&
              typeof this.options.filter == "function" &&
              (m = this._filter(m, this.options.filter));
          if (
            this.options.template != null &&
            typeof this.options.template == "string"
          ) {
            (f = ""), (d = ""), (w = ""), (D = document.createElement("div"));
            for (c = 0, N = m.length; c < N; c++) {
              (h = m[c]), (p = h.images[this.options.resolution]);
              if (typeof p != "object")
                throw (
                  ((o =
                    "No image found for resolution: " +
                    this.options.resolution +
                    "."),
                  new Error(o))
                );
              (E = p.width),
                (y = p.height),
                (b = "square"),
                E > y && (b = "landscape"),
                E < y && (b = "portrait"),
                (v = p.url),
                (l = window.location.protocol.indexOf("http") >= 0),
                l &&
                  !this.options.useHttp &&
                  (v = v.replace(/https?:\/\//, "//")),
                (d = this._makeTemplate(this.options.template, {
                  model: h,
                  id: h.id,
                  link: h.link,
                  type: h.type,
                  image: v,
                  width: E,
                  height: y,
                  orientation: b,
                  caption: this._getObjectProperty(h, "caption.text"),
                  likes: h.likes.count,
                  comments: h.comments.count,
                  location: this._getObjectProperty(h, "location.name"),
                })),
                (f += d);
            }
            (D.innerHTML = f), (i = []), (r = 0), (n = D.childNodes.length);
            while (r < n) i.push(D.childNodes[r]), (r += 1);
            for (x = 0, C = i.length; x < C; x++) (L = i[x]), u.appendChild(L);
          } else
            for (T = 0, k = m.length; T < k; T++) {
              (h = m[T]),
                (g = document.createElement("img")),
                (p = h.images[this.options.resolution]);
              if (typeof p != "object")
                throw (
                  ((o =
                    "No image found for resolution: " +
                    this.options.resolution +
                    "."),
                  new Error(o))
                );
              (v = p.url),
                (l = window.location.protocol.indexOf("http") >= 0),
                l &&
                  !this.options.useHttp &&
                  (v = v.replace(/https?:\/\//, "//")),
                (g.src = v),
                this.options.links === !0
                  ? ((t = document.createElement("a")),
                    (t.href = h.link),
                    t.appendChild(g),
                    u.appendChild(t))
                  : u.appendChild(g);
            }
          (_ = this.options.target),
            typeof _ == "string" && (_ = document.getElementById(_));
          if (_ == null)
            throw (
              ((o =
                'No element with id="' + this.options.target + '" on page.'),
              new Error(o))
            );
          _.appendChild(u),
            (a = document.getElementsByTagName("head")[0]),
            a.removeChild(document.getElementById("instafeed-fetcher")),
            (S = "instafeedCache" + this.unique),
            (window[S] = void 0);
          try {
            delete window[S];
          } catch (P) {
            s = P;
          }
        }
        return (
          this.options.after != null &&
            typeof this.options.after == "function" &&
            this.options.after.call(this),
          !0
        );
      }),
      (e.prototype._buildUrl = function () {
        var e, t, n;
        e = "https://api.instagram.com/v1";
        switch (this.options.get) {
          case "popular":
            t = "media/popular";
            break;
          case "tagged":
            if (!this.options.tagName)
              throw new Error(
                "No tag name specified. Use the 'tagName' option."
              );
            t = "tags/" + this.options.tagName + "/media/recent";
            break;
          case "location":
            if (!this.options.locationId)
              throw new Error(
                "No location specified. Use the 'locationId' option."
              );
            t = "locations/" + this.options.locationId + "/media/recent";
            break;
          case "user":
            if (!this.options.userId)
              throw new Error("No user specified. Use the 'userId' option.");
            t = "users/" + this.options.userId + "/media/recent";
            break;
          default:
            throw new Error(
              "Invalid option for get: '" + this.options.get + "'."
            );
        }
        return (
          (n = e + "/" + t),
          this.options.accessToken != null
            ? (n += "?access_token=" + this.options.accessToken)
            : (n += "?client_id=" + this.options.clientId),
          this.options.limit != null && (n += "&count=" + this.options.limit),
          (n += "&callback=instafeedCache" + this.unique + ".parse"),
          n
        );
      }),
      (e.prototype._genKey = function () {
        var e;
        return (
          (e = function () {
            return (((1 + Math.random()) * 65536) | 0)
              .toString(16)
              .substring(1);
          }),
          "" + e() + e() + e() + e()
        );
      }),
      (e.prototype._makeTemplate = function (e, t) {
        var n, r, i, s, o;
        (r = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/), (n = e);
        while (r.test(n))
          (s = n.match(r)[1]),
            (o = (i = this._getObjectProperty(t, s)) != null ? i : ""),
            (n = n.replace(r, function () {
              return "" + o;
            }));
        return n;
      }),
      (e.prototype._getObjectProperty = function (e, t) {
        var n, r;
        (t = t.replace(/\[(\w+)\]/g, ".$1")), (r = t.split("."));
        while (r.length) {
          n = r.shift();
          if (!(e != null && n in e)) return null;
          e = e[n];
        }
        return e;
      }),
      (e.prototype._sortBy = function (e, t, n) {
        var r;
        return (
          (r = function (e, r) {
            var i, s;
            return (
              (i = this._getObjectProperty(e, t)),
              (s = this._getObjectProperty(r, t)),
              n ? (i > s ? 1 : -1) : i < s ? 1 : -1
            );
          }),
          e.sort(r.bind(this)),
          e
        );
      }),
      (e.prototype._filter = function (e, t) {
        var n, r, i, s, o;
        (n = []),
          (r = function (e) {
            if (t(e)) return n.push(e);
          });
        for (i = 0, o = e.length; i < o; i++) (s = e[i]), r(s);
        return n;
      }),
      e
    );
  })()),
    (function (e, t) {
      return typeof define == "function" && define.amd
        ? define([], t)
        : typeof module == "object" && module.exports
        ? (module.exports = t())
        : (e.Instafeed = t());
    })(this, function () {
      return e;
    });
}.call(this));

var userFeed = new Instafeed({
  get: "user",
  userId: "246724371",
  clientId: "a9387269c14d4f138a0edf9b99e6c016",
  accessToken: "7533979459.1677ed0.8bf583d8a2b8418e96501920f346e66c",
  resolution: "standard_resolution",
  template:
    '<a class="instagram-link" href="{{link}}" target="_blank" id="{{id}}">' +
    '<div class="instagram-content">' +
    '<img src="{{image}}">' +
    '<div class="instagram-content-inner">' +
    '<h5 class="instagram-caption">{{caption}}</h5>' +
    "</div>" +
    "</div>" +
    "</a>",
  sortBy: "most-recent",
  limit: 4,
  links: true,
});
userFeed.run();
