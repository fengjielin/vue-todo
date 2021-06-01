<template>
  <div class="todo-info">
    <span class="total">{{ total }} item</span>
    <div class="tabs">
      <a
        :class="[state == item ? 'actived' : '']"
        v-for="(item, index) of states"
        :key="index"
        v-on:click="toggleState(item)"
        >{{ item }}</a
      >
    </div>
    <button class="clear" v-on:click="clearCompleted">Clear Completed</button>
  </div>
</template>

<script>
export default {
  name: "TodoInfo",
  data() {
    return {
      states: ["all", "active", "completed"],
      state: "all",
    };
  },
  props: {
    total: Number,
  },
  methods: {
    toggleState(state) {
      this.state = state;
      this.$emit('toggleState', this.state);
    },
    clearCompleted(){
      this.$emit('clearCompleted');
    }
  },
};
</script>

<style>
.todo-info {
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  padding: 5px 10px;
  line-height: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.todo-info .total {
  color: rgb(254, 67, 101);
}

.todo-info .tabs {
  display: flex;
  justify-content: space-between;
  width: 200px;
}

.todo-info .tabs a,
.todo-info .clear {
  border-radius: 5px;
  padding: 0 10px;
  cursor: pointer;
}

.todo-info .tabs a {
  border: 1px solid rgb(252, 157, 154);
}

.todo-info .tabs a.actived {
  background-color: rgb(252, 157, 154);
  color: #fff;
}

.todo-info .clear {
  background-color: rgb(131, 175, 155);
  color: #fff;
}
</style>