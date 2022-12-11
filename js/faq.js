(() => {

    function onToggle(event) {
        if (event.target.open) {
          document.querySelectorAll(".faq__accordion > details[open]").forEach((el) => {
            // Виключаємо з перебору елемент що ми щойно відкрили
            if (el === event.target) {
              return;
            }
      
            // Закриваємо всі інші елементи <details>
            el.open = false;
          });
        }
      }
      
      // Вішаємо спостерігач на всі елементи <details> всередині акордеону
      document
        .querySelectorAll(".faq__accordion > details")
        .forEach((el) => el.addEventListener("toggle", onToggle));

})();