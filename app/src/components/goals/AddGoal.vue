<template>
  <form @submit.prevent="handleSubmit">
    <label>Name:</label>
      <input v-focus v-model="goal.goal_name" required>
    
    <label>Type:</label>
      <input v-focus v-model="goal.type" required>

    <label>Start Date:</label>
      <button>Add</button>
  </form>
</template>

<script>
function initGoal() {
  return {
    name: '',
    type: '',
    startDate: new Date(),
    endDate: null
  };
}

export default {
  props: {
    onAdd: Function
  },
  data() {
    return {
      goal: initGoal()
    };
  },
  methods: {
    handleSubmit() {
      
      this.onAdd(this.goal)
        .then(() => {
          this.goal = initGoal();
        });
    }
  }
};
</script>

<style lang="postcss" scoped>
form {
  border: 1px solid #aaa;
  padding: 10px;
}

input, button {
  margin: 0 5px;
}

input {
  width: 125px;
  font-size: 1.05em;
}
</style>
