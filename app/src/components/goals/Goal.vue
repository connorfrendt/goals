<template>
    <li>
      {{goal.goal_name}}
      <br />
      <b>Type:</b> {{goal.type}}
      <br />
      Start Date: {{ new Date(goal.startDate).toLocaleDateString() }}
      <br />
      End Date: {{ new Date(goal.endDate).toLocaleDateString() }}
    </li>
</template>

<script>
export default {
  props: {
    goal: null
  }
};
</script>

<style lang="postcss" scoped>
li {
  padding: 10px 0;
}
</style>