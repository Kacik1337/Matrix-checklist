(() => {
  const DEFAULT_TASKS = [
    { id: crypto.randomUUID(), text: "Przygotować serwer", done: true },
    { id: crypto.randomUUID(), text: "Utworzyć konta", done: false },
    { id: crypto.randomUUID(), text: "Skonfigurować backup", done: false }
  ];

  function parseWidgetParams() {
    // Element commonly passes widget variables in the URL fragment.
    // Accept both "#/?roomId=..." and "#roomId=...".
    const raw = window.location.hash.replace(/^#\/?\??/, "");
    return new URLSearchParams(raw);
  }

  const params = parseWidgetParams();
  const roomId = params.get("roomId") || "standalone";
  const storageKey = `matrix-checklist:${roomId}`;

  const list = document.getElementById("task-list");
  const form = document.getElementById("add-form");
  const input = document.getElementById("new-task");
  const counter = document.getElementById("counter");
  const empty = document.getElementById("empty-state");
  const clearCompleted = document.getElementById("clear-completed");
  const template = document.getElementById("task-template");

  let tasks = loadTasks();

  function loadTasks() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return structuredClone(DEFAULT_TASKS);

      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return structuredClone(DEFAULT_TASKS);

      return parsed.filter(
        item =>
          item &&
          typeof item.id === "string" &&
          typeof item.text === "string" &&
          typeof item.done === "boolean"
      );
    } catch {
      return structuredClone(DEFAULT_TASKS);
    }
  }

  function saveTasks() {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }

  function render() {
    list.replaceChildren();

    for (const task of tasks) {
      const node = template.content.firstElementChild.cloneNode(true);
      const checkbox = node.querySelector(".task-checkbox");
      const text = node.querySelector(".task-text");
      const deleteButton = node.querySelector(".delete-button");

      checkbox.checked = task.done;
      text.textContent = task.text;
      node.classList.toggle("done", task.done);

      checkbox.addEventListener("change", () => {
        task.done = checkbox.checked;
        saveTasks();
        render();
      });

      deleteButton.addEventListener("click", () => {
        tasks = tasks.filter(item => item.id !== task.id);
        saveTasks();
        render();
      });

      list.appendChild(node);
    }

    const doneCount = tasks.filter(task => task.done).length;
    counter.textContent = `${doneCount} / ${tasks.length}`;
    empty.hidden = tasks.length !== 0;
    clearCompleted.disabled = doneCount === 0;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    tasks.push({
      id: crypto.randomUUID(),
      text,
      done: false
    });

    input.value = "";
    saveTasks();
    render();
    input.focus();
  });

  clearCompleted.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.done);
    saveTasks();
    render();
  });

  render();
})();
