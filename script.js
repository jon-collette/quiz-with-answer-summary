console.clear();
/* helper functions */
function rand(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function getLastDayOccurence(date, day) {
  const d = new Date(date.getTime());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  if (days.includes(day)) {
    const modifier = (d.getDay() + days.length - days.indexOf(day)) % 7 || 7;
    d.setDate(d.getDate() - modifier);
  }
  return d;
}
function formatDate(d) {
  return (
    String(d.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(d.getDate()).padStart(2, "0") +
    "/" +
    d.getFullYear()
  );
}
$.fn.queueAddClass = function (className) {
  this.queue("fx", function (next) {
    $(this).addClass(className);
    next();
  });
  return this;
};
$.fn.queueRemoveClass = function (className) {
  this.queue("fx", function (next) {
    $(this).removeClass(className);
    next();
  });
  return this;
};
/* advanced slide control */
$("*[data-slide-to]").on("click", function () {
  var slide = $(this).data("slide-to");
  if (slide === "next") {
    console.log("Next slide");
    $(this).closest(".carousel").carousel("next");
  } else if (slide === "prev") {
    console.log("Prev slide");
    $(this).closest(".carousel").carousel("prev");
  } else if (Number.isInteger(slide) && slide < $(".carousel-item").length) {
    console.log("Go to slide: " + slide);
    $(this)
      .closest(".carousel")
      .carousel(slide - 1);
  } else if (
    typeof slide === "string" &&
    $(".carousel-item#" + slide).length > 0
  ) {
    console.log("Go to slide with id: " + slide);
    slide = $(".carousel-item#" + slide).index();
    $(this).closest(".carousel").carousel(slide);
  } else {
    console.log("Slide " + slide + " is not found.");
  }
});
/* all data */
var data = {
  date: {
    d: [
      {
        t: "today",
        v: formatDate(new Date(Date.now()))
      } ,
      { t: "11/13/1903", v: "11/13/1903" },
      { t: "yesterday", v: formatDate(new Date(Date.now() - 86400000)) },
      { t: "December 2, 1972", v: "12/02/1972" },
      { t: "August eighteenth, nineteen thirty six, ", v: "08/18/1936" },
      {
        t: "last Thursday",
        v: formatDate(getLastDayOccurence(new Date(), "Thurs"))
      },
      { t: "3rd of January 1992", v: "01/03/1992" },
      { t: "year: 1908, month: 04, day: 12", v: "04/12/1908" },
      { t: "2020-09-16 01:56:15Z", v: "09/16/2020" },
      { t: "6/8/1957", v: "6/8/1957" }
    ],
    index: 0
  },
  drop: {
    d: [
      { t: "Body type > Robots > 2-legged", v: "2legged" },
      { t: "Home", v: "home" },
      {
        t: "Red content",
        v: "red"
      },
      { t: "December 2, 1972", v: "12/02/1972" },
      { t: "August eighteenth, nineteen thirty six, ", v: "08/18/1936" },
      { t: "last Thursday", v: formatDate(getLastDayOccurence(new Date(), "Thurs")) },
      { t: "3rd of January 1992", v: "01/03/1992" },
      { t: "year: 1908, month: 04, day: 12", v: "04/12/1908" },
      { t: "2020-09-16 01:56:15Z", v: "09/16/2020" },
      { t: "6/8/1957", v: "6/8/1957" }
    ],
    index: 0
  },
  weight: {
    d: [
      { t: "201.1g", v: "201.1g" },
      { t: "1.7kg", v: "1.7k" },
      { t: "45.0lb", v: "45.0lb" }
    ],
    index: 0
  }
};
function updatedataset(e) {
  console.log(e);
  $(e)
    .find(".data-set")
    .addClass("success")
    .delay(500)
    .queueRemoveClass("success");
  var l = $(e).find(".false-form").data("use");
  $(e).find(".data-set span").text(data[l].d[data[l].index].t);
}
/* reset index on skip */
$("*[data-reset-index]").on("click", function () {
  var l = $(this).closest(".carousel-item").find(".false-form").data("use");
  console.log(l);
  data[l].index = 0;
  console.log("Reset index of " + l);
});

/* scenario 1: datepicker */
$("#datepicker").datepicker({
  changeMonth: true,
  changeYear: true,
  yearRange: "1900:+0"
});
$("#dateinput").keyup(function (e) {
  var key = String.fromCharCode(e.keyCode);
  if (!(key >= 0 && key <= 9))
    $(this).val(
      $(this)
        .val()
        .substr(0, $(this).val().length - 1)
    );
  var value = $(this).val();
  if (value.length == 2 || value.length == 5) $(this).val($(this).val() + "/");
});
updatedataset("#scenario1");
updatedataset("#scenario1b");
$("#scenario1 button.submit, #scenario1b button.submit").on(
  "click",
  function () {
    i = $(this).parent().find(".form-group input");
    var l = $(this).closest(".false-form").data("use");
    if (data[l].d[data[l].index].v === i.val()) {
      i.val("");
      data[l].index++;
      i.removeClass("is-invalid")
        .addClass("is-valid")
        .delay(500)
        .queueRemoveClass("is-valid");
      $(this)
        .closest(".carousel-item")
        .find(".progress-bar")
        .css("width", (data[l].index / data[l].d.length) * 100 + "%");
      if (data[l].index >= data[l].d.length) {
        $(this)
          .closest(".false-form")
          .collapse("hide")
          .siblings(".next-button")
          .collapse("show");
        data[l].index = 0;
      } else {
        updatedataset($(this).closest(".carousel-item"));
      }
    } else {
      i.addClass("is-invalid");
    }
  }
);

/* scenario 2: dropdown */
updatedataset("#scenario2");
updatedataset("#scenario2b");
$(".dropdown-menu button.dropdown-toggle").on("click", function (e) {
  if (!$(this).next().hasClass("show")) {
    $(this).parents(".dropdown-menu").first().find(".show").removeClass("show");
  }
  var $subMenu = $(this).next(".dropdown-menu");
  $subMenu.toggleClass("show");

  $(this)
    .parents("li.nav-item.dropdown.show")
    .on("hidden.bs.dropdown", function (e) {
      $(".dropdown-submenu .show").removeClass("show");
    });

  return false;
});
/* scenario 2: dropdown check */
$("#scenario2 .false-form, #scenario2b .false-form :not(.dropdown-toggle)").on(
  "click",
  function (e) {
    console.log(this);
    var a = e.target.getAttribute("data-click");
    var i = $(this).parent().find(".data-set");
    var l = $(this).closest(".false-form").data("use");
    // console.log(data[l].d[data[l].index].v);
    // console.log(a);
    if (data[l].d[data[l].index].v === a) {
      console.log("correct");
      data[l].index++;
      i.removeClass("is-invalid")
        .addClass("is-valid")
        .delay(500)
        .queueRemoveClass("is-valid");
      $(this)
        .closest(".carousel-item")
        .find(".progress-bar")
        .css("width", (data[l].index / data[l].d.length) * 100 + "%");
      if (data[l].index >= data[l].d.length) {
        console.log("trigger next dialogs");
        console.log($(this));
        $(this)
          .closest(".false-form")
          .collapse("hide")
          .siblings(".next-button")
          .collapse("show");
        data[l].index = 0;
      } else {
        updatedataset($(this).closest(".carousel-item"));
      }
    } else {
      i.addClass("is-invalid");
    }
  }
);

/* scenario 3: weight picker generator */
for (let i = 0; i < 1000; i++) {
  $("#weightvalue").append(
    '<button type="button" class="list-group-item list-group-item-action">' +
      i +
      "</button>"
  );
}
for (i = 0; i < 10; i++) {
  $("#weightpoint").append(
    '<button type="button" class="list-group-item list-group-item-action">.' +
      i +
      "</button>"
  );
}
$(
  "#weightvalue button:first-child, #weightpoint button:first-child, #weightscale button:first-child"
).addClass("selected");
/* scenario 3: weight picker selector */
$("#weightvalue button, #weightpoint button, #weightscale button").on(
  "click",
  function () {
    i = $(this);
    if (i.parent().hasClass("active")) {
      i.blur()
        .addClass("selected")
        .siblings()
        .removeClass("selected")
        .parent()
        .removeClass("active");
      py = i.parent().scrollTop();
      y = i.position();
      // console.log(py);
      // console.log(y.top);
      i.parent().scrollTop(y.top + py - 1);
    } else if (!i.parent().hasClass("active")) {
      i.parent().addClass("active");
      py = i.parent().scrollTop();
      y = i.parent().find(".selected").position();
      // console.log(py);
      // console.log(y);
      i.parent().scrollTop(y.top + py - 1);
    }
  }
);
/* scenario 3: weight picker */
updatedataset("#scenario3");
updatedataset("#scenario3b");
$("#scenario3b button.submit").on(
  "click",
  function () {
    var i = $(this).parent().find(".form-group input");
    var iu = $(this).parent().find(".form-group select");
    var l = $(this).closest(".false-form").data("use");
    console.log(data[l].d[data[l].index].v);
    if (!(i.val().includes(".")) && i.val() != "" ) {
      i.val(i.val() + ".0");
    }
    console.log(i.val()+iu.val());
    if (data[l].d[data[l].index].v === i.val()+iu.val()) {
      i.val("");
      data[l].index++;
      iu.removeClass("is-invalid")
        .addClass("is-valid")
        .delay(500)
        .queueRemoveClass("is-valid");
      i.removeClass("is-invalid")
        .addClass("is-valid")
        .delay(500)
        .queueRemoveClass("is-valid");
      $(this)
        .closest(".carousel-item")
        .find(".progress-bar")
        .css("width", (data[l].index / data[l].d.length) * 100 + "%");
      if (data[l].index >= data[l].d.length) {
        $(this)
          .closest(".false-form")
          .collapse("hide")
          .siblings(".next-button")
          .collapse("show");
        data[l].index = 0;
      } else {
        updatedataset($(this).closest(".carousel-item"));
      }
    } else {
      iu.removeClass("is-invalid");
      i.removeClass("is-invalid");
      if (!(data[l].d[data[l].index].v.includes(iu.val()))) {
        iu.addClass("is-invalid");
      }
      if (!(data[l].d[data[l].index].v.includes(i.val())) || i.val() == "") {
        i.addClass("is-invalid");
      }
    }
  }
);