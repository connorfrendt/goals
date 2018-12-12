<template>
    <li>
      {{goal.goal_name}}
      <br />
      <b>Type:</b> {{goal.type}}
      <br />
      Start Date: {{ new Date(goal.startDate).toLocaleDateString() }}
      <br />
      <!-- End Date: {{ new Date(goal.endDate).toLocaleString() }} -->
      <button @click="handleUpdate">Completed</button>
    </li>
</template>

<script>
export default {
  props: {
    goal: null,
    onEdit: Function
  },
  methods: {
    handleUpdate() {
      this.goal.endDate = new Date().toLocaleDateString();
      this.onEdit(this.goal);
    }
  }
};
</script>

<style lang="postcss" scoped>
li {
  display: inline-block;
  padding: 10px 0;
  border: 1px solid black;
  list-style: none;

}
</style>