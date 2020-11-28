<template>
  <div class="remind">
    <svg-icon iconClass="remind"></svg-icon>
    <sup class="remind-dot"></sup>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.remind {
  position: relative;
  cursor: pointer;

  .remind-dot {
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    border-radius: 50%;
    background: rgb(255, 64, 92);
    border: 2px solid rgb(37, 115, 186);
    position: absolute;
    top: -1px;
    right: -1px;
  }
}
</style>