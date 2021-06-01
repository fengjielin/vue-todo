<template>
  <div :class="['todo-item', item.completed ? 'completed' : '']">
    <input type="checkbox" v-model="item.completed" />
    <label>{{ item.content }}</label>
    <button v-on:click="delItem"></button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    item: Object,
  },
  methods: {
    delItem() {
      this.$emit("del", this.item.id);
    },
  },
};
</script>

<style>
.todo-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

label {
  flex: 1;
  transition: color 0.4s;
}

.todo-item > input {
  width: 50px;
  height: 30px;
  text-align: center;
  cursor: pointer;
}

.todo-item > input::after,
.todo-item > input:checked::after {
  content: "";
  display: block;
  width: 30px;
  height: 30px;
}

.todo-item > input::after {
  background: url("@/assets/images/checkbox.png");
  background-size: cover;
}

.todo-item > input:checked::after {
  background: url("@/assets/images/checkbox-active.png");
  background-size: cover;
}

.todo-item > button {
  width: 40px;
  background-color: transparent;
}

.todo-item:hover > button::after {
  content: "X";
  font-size: 24px;
  color: rgb(252, 157, 154);
  cursor: pointer;
}

.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}
</style>