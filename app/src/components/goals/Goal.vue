<template>
    <li>{{goal.goal_name}} <b>Type:</b> {{goal.type}}</li>
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