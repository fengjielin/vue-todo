<template>
  <div class="main-todo">
    <input
      type="text"
      class="add-todo"
      placeholder="what to do"
      autofocus
      v-model="inputValue"
      v-on:keyup.enter="addTodoItem"
    />
    <todo-item
      v-for="(item, index) of filterData"
      :key="index"
      :item="item"
      v-on:del="handleDeleteItem"
    ></todo-item>
    <todo-info
      :total="total"
      v-on:toggleState="handleToggleState"
      v-on:clearCompleted="handleClear"
    ></todo-info>
  </div>
</template>

<script>
import TodoItem from "@/components/MainTodo/coms/TodoItem.vue";
import TodoInfo from "@/components/MainTodo/coms/TodoInfo.vue";

export default {
  name: "MainTodo",
  data() {
    return {
      inputValue: "",
      todoList: [],
      id: 0,
      total: 0,
      filter: "all",
    };
  },
  watch: {
    todoList: {
      deep: true,
      handler() {
        this.total = this.todoList.filter(
          (item) => item.completed == false
        ).length;
      },
    },
  },
  components: {
    TodoItem,
    TodoInfo,
  },
  computed: {
    filterData() {
      switch (this.filter) {
        case "all":
          return this.todoList;
          break;
        case "active":
          return this.todoList.filter((item) => item.completed == false);
          break;
        case "completed":
          return this.todoList.filter((item) => item.completed == true);
          break;
      }
    },
  },
  methods: {
    addTodoItem() {
      if (this.inputValue !== "") {
        this.todoList.unshift({
          id: this.id++,
          content: this.inputValue,
          completed: false,
        });
        this.inputValue = "";
      }
    },
    handleDeleteItem(id) {
      this.todoList.splice(
        this.todoList.findIndex((item) => item.id === id),
        1
      );
    },
    handleToggleState(state) {
      this.filter = state;
    },
    handleClear(){
      this.todoList = this.todoList.filter(item => item.completed == false);
    }
  },
};
</script>

<style>
.main-todo {
  width: 600px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 5px #666;
}

.add-todo {
  padding: 16px 16px 16px 36px;
  width: 100%;
  font-size: 24px;
  font-weight: inherit;
  font-family: inherit;
  color: inherit;
  border: none;
  outline: none;
  box-sizing: border-box;
}
</style>