import * as state from "./state.js";
import * as ui from "./ui.js";

document.addEventListener('DOMContentLoaded', async () => {
    const input = document.querySelector("input");
    const addBtn = document.querySelector(".btn-add");
    const list = document.getElementById('taskList');

    const tasks = await state.fetchTasks();
    ui.render(tasks);


    addBtn.addEventListener('click', async () => {
        if (input.value.trim() === '') return;

        await state.addTask(input.value);

        input.value = '';

        ui.render(state.tasks);
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') addBtn.click();
    });

    list.addEventListener('click', async (e) =>{

        const id = parseInt(e.target.closest('li').dataset.id);  

        if(e.target.classList.contains('btn-delete')){
            await state.deleteTask(id);
        }else if(e.target.classList.contains('btn-edit')){
            const task = state.tasks.find(t => t.id === id);
            const newText = prompt("Editar Tarea: ", task.text);
            if(newText) await state.editTask(id, newText);
        } else if(e.target.tagName !== 'BUTTON'){
            await state.toggleTask(id);
        }

        ui.render(state.tasks);
    })

})



