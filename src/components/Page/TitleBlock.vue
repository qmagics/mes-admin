<template>
  <div class="title-block">
    <div class="title-block__title">
      <slot name="default">
        {{ title || name }}
      </slot>
    </div>
    <div class="title-block__content" v-if="$slots.content || content">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleBlock",
  props: {
    title: {},
    name: {},
    content: {},
  },
};
</script>

<style lang="scss">
.title-block {
  padding-bottom: 20px;
  margin-bottom: 20px;
  position: relative;

  &:after {
    content: "";
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(226, 234, 237);
  }

  .title-block__title {
    color: rgb(89, 95, 102);
    font-size: 15px;
    font-weight: bold;
  }

  .title-block__content {
    padding-top: 20px;
    font-size: 14px;
  }
}
</style>