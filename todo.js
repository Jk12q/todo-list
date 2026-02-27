window.onload = function() {
    // 1. 获取输入框元素
    const inputEl = document.querySelector(".new-task input");

    // 2. 回车添加新任务
    inputEl.onkeydown = function (event) {
        if (event.keyCode === 13) {
            // 获取并校验输入内容
            const inputContent = inputEl.value.trim();
            if (!inputContent) return;

            // 获取任务模板并克隆
            const modEl = document.querySelector(".task-mod");
            const newModEl = modEl.cloneNode(true);
            const newTaskNode = newModEl.querySelector(".task-item");

            // 修改克隆节点的文本内容
            newTaskNode.querySelector(".task-text").innerText = inputContent;

            // 插入到代办列表最顶部
            const todoList = document.querySelector(".todo-list");
            const firstTask = todoList.querySelector(".task-item");
            todoList.insertBefore(newTaskNode, firstTask);

            // 给新任务绑定点击事件
            bindTaskClickEvent(newTaskNode.querySelector(".task-icon:first-child img"));

            // 清空输入框
            inputEl.value = "";
        }
    };

    // 3. 绑定任务完成事件（通用函数）
    function bindTaskClickEvent(imgEl) {
        imgEl.onclick = function() {
            // 找到当前任务项
            const taskItem = this.closest('.task-item');
            
            // 改为已完成图标
            this.setAttribute("src", "./icon/校验_check-one.png");
            
            // 标记为已完成样式
            taskItem.classList.add('done');
            
            // 移动到已完成列表
            document.querySelector(".done-list").appendChild(taskItem);
            
            // 移除点击事件，防止重复操作
            this.onclick = null;
        };
    }

    // 4. 给页面初始的代办任务绑定点击事件
    document.querySelectorAll(".todo-list .task-item .task-icon:first-child img")
        .forEach(bindTaskClickEvent);
};

