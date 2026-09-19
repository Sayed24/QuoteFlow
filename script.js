/* =========================================
   QUOTE DATA
========================================= */

const quotes = [

  {
    id: 1,
    category: "Motivation",
    author: "Maya Angelou",
    en: "You can’t use up creativity. The more you use, the more you have.",
    fa: "نمی‌توانی خلاقیت را تمام کنی؛ هرچه بیشتر از آن استفاده کنی، بیشتر خواهی داشت."
  },

  {
    id: 2,
    category: "Life",
    author: "Ralph Waldo Emerson",
    en: "The only person you are destined to become is the person you decide to be.",
    fa: "تنها کسی که قرار است به آن تبدیل شوی، همان کسی است که تصمیم می‌گیری باشی."
  },

  {
    id: 3,
    category: "Success",
    author: "Confucius",
    en: "It does not matter how slowly you go as long as you do not stop.",
    fa: "مهم نیست چقدر آهسته پیش می‌روی؛ مهم این است که متوقف نشوی."
  },

  {
    id: 4,
    category: "Wisdom",
    author: "Lao Tzu",
    en: "A journey of a thousand miles begins with a single step.",
    fa: "سفر هزار مایلی با یک قدم آغاز می‌شود."
  },

  {
    id: 5,
    category: "Courage",
    author: "Nelson Mandela",
    en: "The brave man is not he who does not feel afraid, but he who conquers that fear.",
    fa: "انسان شجاع کسی نیست که نمی‌ترسد؛ کسی است که بر ترس خود غلبه می‌کند."
  },

  {
    id: 6,
    category: "Dreams",
    author: "Eleanor Roosevelt",
    en: "The future belongs to those who believe in the beauty of their dreams.",
    fa: "آینده از آنِ کسانی است که به زیبایی رویاهای خود باور دارند."
  },

  {
    id: 7,
    category: "Wisdom",
    author: "Albert Einstein",
    en: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    fa: "زندگی مانند دوچرخه‌سواری است؛ برای حفظ تعادل باید به حرکت ادامه بدهی."
  },

  {
    id: 8,
    category: "Success",
    author: "Steve Jobs",
    en: "The only way to do great work is to love what you do.",
    fa: "تنها راه انجام کارهای بزرگ این است که کاری را که انجام می‌دهی دوست داشته باشی."
  }

];


/* =========================================
   APPLICATION STATE
========================================= */

const state = {

  category: "All",

  index: 0,

  language: "en",

  darkMode: false,

  favorites:
    JSON.parse(
      localStorage.getItem("quoteFavorites") || "[]"
    )

};


/* =========================================
   DOM HELPERS
========================================= */

const $ = (id) =>
  document.getElementById(id);


/* =========================================
   CATEGORIES
========================================= */

const categories = [
  "All",
  ...new Set(
    quotes.map(
      quote => quote.category
    )
  )
];


function getFilteredQuotes() {

  if (state.category === "All") {

    return quotes;

  }

  return quotes.filter(
    quote =>
      quote.category === state.category
  );

}


/* =========================================
   RENDER CATEGORIES
========================================= */

function renderCategories() {

  const container =
    $("categories");

  container.innerHTML =
    categories
      .map(category => {

        const active =
          state.category === category
            ? "active"
            : "";

        return `
          <button
            class="category-btn ${active}"
            data-category="${category}"
          >
            ${category}
          </button>
        `;

      })
      .join("");


  container
    .querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          state.category =
            button.dataset.category;

          state.index = 0;

          renderCategories();

          renderQuote();

        }
      );

    });

}


/* =========================================
   RENDER QUOTE
========================================= */

function renderQuote() {

  const list =
    getFilteredQuotes();

  const quote =
    list[state.index];

  const rtl =
    state.language === "fa";


  /*
   * Direction
   */

  $("main").dir =
    rtl ? "rtl" : "ltr";


  /*
   * Quote
   */

  $("quoteCategory")
    .textContent =
    quote.category;

  $("quoteText")
    .textContent =
    quote[state.language];

  $("quoteAuthor")
    .textContent =
    `— ${quote.author}`;


  /*
   * Counter
   */

  $("quoteCounter")
    .textContent =
    `${String(state.index + 1).padStart(2, "0")}
     /
     ${String(list.length).padStart(2, "0")}`;


  /*
   * Hero
   */

  $("eyebrow")
    .textContent =
    rtl
      ? "الهام روزانه"
      : "DAILY INSPIRATION";

  $("heroTitle")
    .textContent =
    rtl
      ? "کلماتی برای حرکت رو به جلو"
      : "Words that move you forward.";

  $("heroDescription")
    .textContent =
    rtl
      ? "هر روز یک فکر تازه، به زبان خودت."
      : "Discover thoughtful words in English and Dari / Farsi.";


  /*
   * Buttons
   */

  $("favoriteText")
    .textContent =
    rtl
      ? "ذخیره"
      : "Save";

  $("copyText")
    .textContent =
    rtl
      ? "کپی"
      : "Copy";

  $("shareText")
    .textContent =
    rtl
      ? "اشتراک"
      : "Share";

  $("previousText")
    .textContent =
    rtl
      ? "قبلی"
      : "Previous";

  $("nextText")
    .textContent =
    rtl
      ? "بعدی"
      : "Next";

  $("newQuoteText")
    .textContent =
    rtl
      ? "نقل‌قول جدید"
      : "New Quote";

  $("keyboardHint")
    .textContent =
    rtl
      ? "برای جابه‌جایی از کلیدهای ← و → استفاده کنید"
      : "Tip: use ← and → to navigate";


  /*
   * RTL arrows
   */

  $("previousArrow")
    .textContent =
    rtl
      ? "→"
      : "←";

  $("nextArrow")
    .textContent =
    rtl
      ? "←"
      : "→";


  /*
   * Favorite
   */

  const favorite =
    state.favorites.includes(
      quote.id
    );

  $("favoriteBtn")
    .classList.toggle(
      "favorite-active",
      favorite
    );

  $("favoriteIcon")
    .textContent =
    favorite
      ? "♥"
      : "♡";


  /*
   * Update language buttons
   */

  $("englishBtn")
    .classList.toggle(
      "active",
      state.language === "en"
    );

  $("persianBtn")
    .classList.toggle(
      "active",
      state.language === "fa"
    );

}


/* =========================================
   NEXT QUOTE
========================================= */

function nextQuote() {

  const list =
    getFilteredQuotes();

  state.index =
    (state.index + 1)
    % list.length;

  renderQuote();

}


/* =========================================
   PREVIOUS QUOTE
========================================= */

function previousQuote() {

  const list =
    getFilteredQuotes();

  state.index =
    (state.index - 1 + list.length)
    % list.length;

  renderQuote();

}


/* =========================================
   LANGUAGE
========================================= */

$("englishBtn")
  .addEventListener(
    "click",
    () => {

      state.language = "en";

      renderQuote();

    }
  );


$("persianBtn")
  .addEventListener(
    "click",
    () => {

      state.language = "fa";

      renderQuote();

    }
  );


/* =========================================
   THEME
========================================= */

$("themeBtn")
  .addEventListener(
    "click",
    () => {

      state.darkMode =
        !state.darkMode;

      $("app")
        .classList.toggle(
          "dark",
          state.darkMode
        );

      $("themeBtn")
        .textContent =
        state.darkMode
          ? "☀"
          : "☾";

    }
  );


/* =========================================
   NAVIGATION
========================================= */

$("nextBtn")
  .addEventListener(
    "click",
    nextQuote
  );


$("newQuoteBtn")
  .addEventListener(
    "click",
    nextQuote
  );


$("previousBtn")
  .addEventListener(
    "click",
    previousQuote
  );


/* =========================================
   FAVORITES
========================================= */

$("favoriteBtn")
  .addEventListener(
    "click",
    () => {

      const quote =
        getFilteredQuotes()[state.index];

      const exists =
        state.favorites.includes(
          quote.id
        );


      if (exists) {

        state.favorites =
          state.favorites.filter(
            id => id !== quote.id
          );

      } else {

        state.favorites.push(
          quote.id
        );

      }


      localStorage.setItem(
        "quoteFavorites",
        JSON.stringify(
          state.favorites
        )
      );


      renderQuote();

    }
  );


/* =========================================
   COPY
========================================= */

$("copyBtn")
  .addEventListener(
    "click",
    async () => {

      const quote =
        getFilteredQuotes()[state.index];

      const text =
        `“${quote[state.language]}” — ${quote.author}`;


      try {

        await navigator.clipboard
          .writeText(text);

        $("copyText")
          .textContent =
          state.language === "fa"
            ? "کپی شد"
            : "Copied";


        setTimeout(
          () => {

            $("copyText")
              .textContent =
              state.language === "fa"
                ? "کپی"
                : "Copy";

          },
          1500
        );

      } catch {

        alert(text);

      }

    }
  );


/* =========================================
   SHARE
========================================= */

$("shareBtn")
  .addEventListener(
    "click",
    async () => {

      const quote =
        getFilteredQuotes()[state.index];

      const text =
        `“${quote[state.language]}” — ${quote.author}`;


      if (navigator.share) {

        await navigator.share({

          title:
            "QuoteFlow",

          text

        });

      } else {

        try {

          await navigator.clipboard
            .writeText(text);

          $("copyText")
            .textContent =
            state.language === "fa"
              ? "کپی شد"
              : "Copied";

        } catch {

          alert(text);

        }

      }

    }
  );


/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

document.addEventListener(
  "keydown",
  event => {

    /*
     * Don't trigger shortcuts
     * while typing into an input.
     */

    if (
      event.target.tagName === "INPUT" ||
      event.target.tagName === "TEXTAREA"
    ) {

      return;

    }


    if (
      event.key === "ArrowRight"
    ) {

      nextQuote();

    }


    if (
      event.key === "ArrowLeft"
    ) {

      previousQuote();

    }


    if (
      event.key.toLowerCase() === "n"
    ) {

      nextQuote();

    }

  }
);


/* =========================================
   INITIALIZE
========================================= */

renderCategories();

renderQuote();